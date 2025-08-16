#!/usr/bin/env node

/**
 * 翻译覆盖率统计工具
 * 生成详细的翻译完成度报告和可视化统计
 */

const fs = require('fs');
const path = require('path');

const LANGUAGES = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];
const BASE_LANGUAGE = 'en';
const MESSAGES_DIR = 'messages';

// 重要内容区域权重
const SECTION_WEIGHTS = {
  'common': 10,
  'metadata': 8,
  'header': 6,
  'generator': 7,
  'form': 9,
  'elfTypes': 8,
  'genders': 5,
  'nameStyles': 5,
  'nameCounts': 3,
  'nameCard': 6,
  'languageSwitcher': 4,
  'woodElf': 9,
  'woodElfSeo': 8,
  'elven': 10,
  'elvenSeo': 10,
  'highElf': 7,
  'highElfSeo': 7
};

class TranslationCoverageAnalyzer {
  constructor() {
    this.baseData = null;
    this.results = {
      languages: {},
      summary: {},
      recommendations: []
    };
  }

  /**
   * 加载JSON文件
   */
  loadJsonFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error.message);
      return null;
    }
  }

  /**
   * 递归分析对象结构
   */
  analyzeStructure(obj, prefix = '', depth = 0) {
    const analysis = {
      keys: [],
      sections: {},
      totalKeys: 0,
      textLength: 0
    };

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (typeof value === 'string') {
          analysis.keys.push(fullKey);
          analysis.totalKeys++;
          analysis.textLength += value.length;
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          const subAnalysis = this.analyzeStructure(value, fullKey, depth + 1);
          analysis.keys.push(...subAnalysis.keys);
          analysis.totalKeys += subAnalysis.totalKeys;
          analysis.textLength += subAnalysis.textLength;
          
          // 记录顶级部分
          if (depth === 0) {
            analysis.sections[key] = {
              keys: subAnalysis.totalKeys,
              textLength: subAnalysis.textLength,
              weight: SECTION_WEIGHTS[key] || 5
            };
          }
        }
      }
    }

    return analysis;
  }

  /**
   * 计算加权覆盖率
   */
  calculateWeightedCoverage(baseSections, targetSections) {
    let totalWeight = 0;
    let coveredWeight = 0;

    for (const [section, baseInfo] of Object.entries(baseSections)) {
      const weight = baseInfo.weight;
      totalWeight += weight;

      if (targetSections[section]) {
        const coverage = targetSections[section].keys / baseInfo.keys;
        coveredWeight += weight * coverage;
      }
    }

    return totalWeight > 0 ? (coveredWeight / totalWeight) * 100 : 0;
  }

  /**
   * 分析单个语言的覆盖率
   */
  analyzeLanguageCoverage(language, data) {
    const baseAnalysis = this.analyzeStructure(this.baseData);
    const targetAnalysis = this.analyzeStructure(data);

    // 基本覆盖率统计
    const basicCoverage = (targetAnalysis.totalKeys / baseAnalysis.totalKeys) * 100;
    const textCoverage = (targetAnalysis.textLength / baseAnalysis.textLength) * 100;
    const weightedCoverage = this.calculateWeightedCoverage(baseAnalysis.sections, targetAnalysis.sections);

    // 缺失的关键部分
    const missingSections = [];
    const incompleteSections = [];

    for (const [section, baseInfo] of Object.entries(baseAnalysis.sections)) {
      if (!targetAnalysis.sections[section]) {
        missingSections.push({
          name: section,
          importance: baseInfo.weight,
          keys: baseInfo.keys
        });
      } else {
        const sectionCoverage = (targetAnalysis.sections[section].keys / baseInfo.keys) * 100;
        if (sectionCoverage < 80) {
          incompleteSections.push({
            name: section,
            coverage: sectionCoverage.toFixed(1),
            importance: baseInfo.weight,
            missing: baseInfo.keys - targetAnalysis.sections[section].keys
          });
        }
      }
    }

    // 优先级建议
    const priorities = this.generatePriorities(missingSections, incompleteSections);

    return {
      basicCoverage: basicCoverage.toFixed(2),
      textCoverage: textCoverage.toFixed(2),
      weightedCoverage: weightedCoverage.toFixed(2),
      totalKeys: baseAnalysis.totalKeys,
      translatedKeys: targetAnalysis.totalKeys,
      missingKeys: baseAnalysis.totalKeys - targetAnalysis.totalKeys,
      sections: {
        total: Object.keys(baseAnalysis.sections).length,
        complete: Object.keys(targetAnalysis.sections).length,
        missing: missingSections,
        incomplete: incompleteSections
      },
      priorities,
      grade: this.calculateGrade(weightedCoverage)
    };
  }

  /**
   * 生成优先级建议
   */
  generatePriorities(missingSections, incompleteSections) {
    const allIssues = [
      ...missingSections.map(s => ({ ...s, type: 'missing', priority: s.importance * 2 })),
      ...incompleteSections.map(s => ({ ...s, type: 'incomplete', priority: s.importance * (100 - parseFloat(s.coverage)) / 100 }))
    ];

    return allIssues
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 5)
      .map(issue => ({
        section: issue.name,
        type: issue.type,
        priority: issue.priority.toFixed(1),
        action: issue.type === 'missing' ? 'Add complete section' : `Complete ${issue.coverage}% → 100%`
      }));
  }

  /**
   * 计算等级
   */
  calculateGrade(coverage) {
    if (coverage >= 95) return 'A+';
    if (coverage >= 90) return 'A';
    if (coverage >= 85) return 'B+';
    if (coverage >= 80) return 'B';
    if (coverage >= 70) return 'C+';
    if (coverage >= 60) return 'C';
    if (coverage >= 50) return 'D';
    return 'F';
  }

  /**
   * 分析所有语言
   */
  async analyzeAllLanguages() {
    console.log('📊 Starting translation coverage analysis...\n');

    // 加载基准语言
    const basePath = path.join(MESSAGES_DIR, `${BASE_LANGUAGE}.json`);
    this.baseData = this.loadJsonFile(basePath);
    
    if (!this.baseData) {
      console.error(`❌ Failed to load base language file: ${basePath}`);
      return;
    }

    console.log(`✅ Loaded base language (${BASE_LANGUAGE})`);

    // 分析每种语言
    for (const language of LANGUAGES) {
      const filePath = path.join(MESSAGES_DIR, `${language}.json`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${language} - file not found`);
        continue;
      }

      console.log(`📋 Analyzing ${language}...`);
      
      const data = this.loadJsonFile(filePath);
      if (data) {
        this.results.languages[language] = this.analyzeLanguageCoverage(language, data);
        console.log(`   Coverage: ${this.results.languages[language].weightedCoverage}% (Grade: ${this.results.languages[language].grade})`);
      }
    }

    this.generateSummary();
    this.generateReport();
  }

  /**
   * 生成总结统计
   */
  generateSummary() {
    const languages = Object.keys(this.results.languages);
    const coverages = languages.map(lang => parseFloat(this.results.languages[lang].weightedCoverage));
    
    this.results.summary = {
      totalLanguages: languages.length,
      averageCoverage: (coverages.reduce((sum, cov) => sum + cov, 0) / coverages.length).toFixed(2),
      highestCoverage: Math.max(...coverages).toFixed(2),
      lowestCoverage: Math.min(...coverages).toFixed(2),
      completeLanguages: languages.filter(lang => parseFloat(this.results.languages[lang].weightedCoverage) >= 95).length,
      needsWorkLanguages: languages.filter(lang => parseFloat(this.results.languages[lang].weightedCoverage) < 80).length
    };

    // 生成全局建议
    this.generateGlobalRecommendations();
  }

  /**
   * 生成全局建议
   */
  generateGlobalRecommendations() {
    const languages = Object.keys(this.results.languages);
    
    // 找出最常缺失的部分
    const sectionMissingCount = {};
    const sectionIncompleteCount = {};

    for (const language of languages) {
      const result = this.results.languages[language];
      
      result.sections.missing.forEach(section => {
        sectionMissingCount[section.name] = (sectionMissingCount[section.name] || 0) + 1;
      });
      
      result.sections.incomplete.forEach(section => {
        sectionIncompleteCount[section.name] = (sectionIncompleteCount[section.name] || 0) + 1;
      });
    }

    // 生成建议
    const recommendations = [];

    // 最需要关注的缺失部分
    const topMissing = Object.entries(sectionMissingCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    if (topMissing.length > 0) {
      recommendations.push({
        type: 'critical',
        title: 'Most Critical Missing Sections',
        items: topMissing.map(([section, count]) => 
          `${section} (missing in ${count}/${languages.length} languages)`
        )
      });
    }

    // 需要完善的部分
    const topIncomplete = Object.entries(sectionIncompleteCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    if (topIncomplete.length > 0) {
      recommendations.push({
        type: 'improvement',
        title: 'Sections Needing Completion',
        items: topIncomplete.map(([section, count]) => 
          `${section} (incomplete in ${count}/${languages.length} languages)`
        )
      });
    }

    // 优先语言建议
    const lowCoverageLanguages = languages
      .filter(lang => parseFloat(this.results.languages[lang].weightedCoverage) < 80)
      .sort((a, b) => parseFloat(this.results.languages[b].weightedCoverage) - parseFloat(this.results.languages[a].weightedCoverage));

    if (lowCoverageLanguages.length > 0) {
      recommendations.push({
        type: 'priority',
        title: 'Priority Languages for Improvement',
        items: lowCoverageLanguages.slice(0, 5).map(lang => 
          `${lang} (${this.results.languages[lang].weightedCoverage}% coverage)`
        )
      });
    }

    this.results.recommendations = recommendations;
  }

  /**
   * 生成详细报告
   */
  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('📊 TRANSLATION COVERAGE ANALYSIS REPORT');
    console.log('='.repeat(70));

    // 总结统计
    console.log('\n📈 SUMMARY STATISTICS:');
    console.log(`Total Languages Analyzed: ${this.results.summary.totalLanguages}`);
    console.log(`Average Coverage: ${this.results.summary.averageCoverage}%`);
    console.log(`Highest Coverage: ${this.results.summary.highestCoverage}%`);
    console.log(`Lowest Coverage: ${this.results.summary.lowestCoverage}%`);
    console.log(`Complete Languages (≥95%): ${this.results.summary.completeLanguages}`);
    console.log(`Languages Needing Work (<80%): ${this.results.summary.needsWorkLanguages}`);

    // 语言详细统计
    console.log('\n📋 DETAILED LANGUAGE STATISTICS:');
    console.log('Lang | Basic | Text  | Weighted | Keys    | Grade | Status');
    console.log('-'.repeat(65));
    
    const sortedLanguages = Object.entries(this.results.languages)
      .sort(([,a], [,b]) => parseFloat(b.weightedCoverage) - parseFloat(a.weightedCoverage));

    for (const [language, stats] of sortedLanguages) {
      const coverage = parseFloat(stats.weightedCoverage);
      const status = coverage >= 95 ? '🟢 Complete' : 
                    coverage >= 80 ? '🟡 Good' : 
                    coverage >= 60 ? '🟠 Needs Work' : '🔴 Critical';
      
      console.log(`${language.padEnd(4)} | ${stats.basicCoverage.padEnd(5)}% | ${stats.textCoverage.padEnd(5)}% | ${stats.weightedCoverage.padEnd(8)}% | ${`${stats.translatedKeys}/${stats.totalKeys}`.padEnd(7)} | ${stats.grade.padEnd(5)} | ${status}`);
    }

    // 全局建议
    if (this.results.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      
      for (const recommendation of this.results.recommendations) {
        const icon = recommendation.type === 'critical' ? '🚨' : 
                    recommendation.type === 'improvement' ? '⚠️' : '📋';
        
        console.log(`\n${icon} ${recommendation.title}:`);
        recommendation.items.forEach(item => {
          console.log(`   • ${item}`);
        });
      }
    }

    // 详细优先级（仅显示前3个语言）
    console.log('\n🎯 TOP PRIORITY TASKS:');
    const topLanguages = Object.entries(this.results.languages)
      .filter(([, stats]) => parseFloat(stats.weightedCoverage) < 95)
      .sort(([,a], [,b]) => parseFloat(b.weightedCoverage) - parseFloat(a.weightedCoverage))
      .slice(0, 3);

    for (const [language, stats] of topLanguages) {
      console.log(`\n   ${language.toUpperCase()} (${stats.weightedCoverage}% coverage):`);
      stats.priorities.slice(0, 3).forEach(priority => {
        console.log(`     • ${priority.section}: ${priority.action} (Priority: ${priority.priority})`);
      });
    }

    console.log('\n' + '='.repeat(70));
    console.log(`📊 Analysis complete! Average coverage: ${this.results.summary.averageCoverage}%`);
    console.log('='.repeat(70));

    // 保存报告
    this.saveReport();
  }

  /**
   * 保存报告到文件
   */
  saveReport() {
    const reportPath = 'translation-coverage-report.json';
    const report = {
      timestamp: new Date().toISOString(),
      baseLanguage: BASE_LANGUAGE,
      analysis: this.results
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }

    // 生成简化的CSV报告
    this.generateCSVReport();
  }

  /**
   * 生成CSV格式报告
   */
  generateCSVReport() {
    const csvPath = 'translation-coverage-summary.csv';
    const headers = ['Language', 'Basic Coverage', 'Text Coverage', 'Weighted Coverage', 'Translated Keys', 'Total Keys', 'Grade', 'Missing Sections', 'Incomplete Sections'];
    
    const rows = [headers.join(',')];
    
    for (const [language, stats] of Object.entries(this.results.languages)) {
      const row = [
        language,
        stats.basicCoverage,
        stats.textCoverage,
        stats.weightedCoverage,
        stats.translatedKeys,
        stats.totalKeys,
        stats.grade,
        stats.sections.missing.length,
        stats.sections.incomplete.length
      ];
      rows.push(row.join(','));
    }

    try {
      fs.writeFileSync(csvPath, rows.join('\n'));
      console.log(`📊 CSV summary saved to: ${csvPath}`);
    } catch (error) {
      console.error(`Failed to save CSV report: ${error.message}`);
    }
  }
}

// 运行分析
if (require.main === module) {
  const analyzer = new TranslationCoverageAnalyzer();
  analyzer.analyzeAllLanguages().catch(console.error);
}

module.exports = TranslationCoverageAnalyzer;