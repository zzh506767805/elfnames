#!/usr/bin/env node

/**
 * 术语一致性检查脚本
 * 检查翻译文件中关键术语的一致性使用
 */

const fs = require('fs');
const path = require('path');

// 扩展的术语词典
const TERMINOLOGY_DICTIONARY = {
  // 基本精灵类型
  'Elf': {
    'de': 'Elf',
    'es': 'Elfo',
    'fr': 'Elfe',
    'it': 'Elfo',
    'ja': 'エルフ',
    'ko': '엘프',
    'pt': 'Elfo',
    'ru': 'Эльф',
    'ar': 'جني',
    'id': 'Elf',
    'pl': 'Elf',
    'th': 'เอลฟ์',
    'vi': 'Elf'
  },
  'Wood Elf': {
    'de': 'Waldelf',
    'es': 'Elfo del Bosque',
    'fr': 'Elfe des Bois',
    'it': 'Elfo del Bosco',
    'ja': '森エルフ',
    'ko': '우드엘프',
    'pt': 'Elfo da Floresta',
    'ru': 'Лесной эльф',
    'ar': 'جني الغابة',
    'id': 'Elf Hutan',
    'pl': 'Elf Leśny',
    'th': 'เอลฟ์ป่า',
    'vi': 'Elf Rừng'
  },
  'Dark Elf': {
    'de': 'Dunkelelf',
    'es': 'Elfo Oscuro',
    'fr': 'Elfe Noir',
    'it': 'Elfo Scuro',
    'ja': 'ダークエルフ',
    'ko': '다크엘프',
    'pt': 'Elfo Negro',
    'ru': 'Темный эльф',
    'ar': 'الجني المظلم',
    'id': 'Elf Gelap',
    'pl': 'Mroczny Elf',
    'th': 'เอลฟ์มืด',
    'vi': 'Elf Tối'
  },
  'High Elf': {
    'de': 'Hochelf',
    'es': 'Alto Elfo',
    'fr': 'Haut-Elfe',
    'it': 'Alto Elfo',
    'ja': 'ハイエルフ',
    'ko': '하이엘프',
    'pt': 'Alto Elfo',
    'ru': 'Высший эльф',
    'ar': 'الجني العالي',
    'id': 'Elf Tinggi',
    'pl': 'Wysoki Elf',
    'th': 'เอลฟ์สูง',
    'vi': 'Elf Cao'
  },
  'Half-Elf': {
    'de': 'Halbelf',
    'es': 'Semielfo',
    'fr': 'Demi-Elfe',
    'it': 'Mezzelfo',
    'ja': 'ハーフエルフ',
    'ko': '하프엘프',
    'pt': 'Meio-Elfo',
    'ru': 'Полуэльф',
    'ar': 'نصف جني',
    'id': 'Setengah Elf',
    'pl': 'Półelf',
    'th': 'ครึ่งเอลฟ์',
    'vi': 'Nửa Elf'
  },
  // 游戏术语
  'D&D': {
    'de': 'D&D',
    'es': 'D&D',
    'fr': 'D&D',
    'it': 'D&D',
    'ja': 'D&D',
    'ko': 'D&D',
    'pt': 'D&D',
    'ru': 'D&D',
    'ar': 'D&D',
    'id': 'D&D',
    'pl': 'D&D',
    'th': 'D&D',
    'vi': 'D&D'
  },
  'RPG': {
    'de': 'RPG',
    'es': 'RPG',
    'fr': 'JDR',
    'it': 'GDR',
    'ja': 'RPG',
    'ko': 'RPG',
    'pt': 'RPG',
    'ru': 'РПГ',
    'ar': 'آر بي جي',
    'id': 'RPG',
    'pl': 'RPG',
    'th': 'อาร์พีจี',
    'vi': 'RPG'
  },
  // 魔法术语
  'Magic': {
    'de': 'Magie',
    'es': 'Magia',
    'fr': 'Magie',
    'it': 'Magia',
    'ja': '魔法',
    'ko': '마법',
    'pt': 'Magia',
    'ru': 'Магия',
    'ar': 'سحر',
    'id': 'Sihir',
    'pl': 'Magia',
    'th': 'เวทมนตร์',
    'vi': 'Phép thuật'
  },
  'Fantasy': {
    'de': 'Fantasy',
    'es': 'Fantasía',
    'fr': 'Fantasy',
    'it': 'Fantasy',
    'ja': 'ファンタジー',
    'ko': '판타지',
    'pt': 'Fantasia',
    'ru': 'Фэнтези',
    'ar': 'خيال',
    'id': 'Fantasi',
    'pl': 'Fantasy',
    'th': 'แฟนตาซี',
    'vi': 'Giả tưởng'
  }
};

// 常见的不一致模式
const INCONSISTENCY_PATTERNS = {
  // 检查是否混用了英文术语
  mixedLanguage: /\b(elf|elves|wood elf|dark elf|high elf|half-elf|magic|fantasy|rpg)\b/gi,
  // 检查术语的大小写一致性
  caseInconsistency: /\b(Elf|ELF|elf)\b/g
};

class TerminologyChecker {
  constructor() {
    this.results = {
      inconsistencies: {},
      suggestions: {},
      statistics: {}
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
   * 递归提取所有文本值
   */
  extractAllText(obj, keyPath = '') {
    const texts = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const currentPath = keyPath ? `${keyPath}.${key}` : key;
        const value = obj[key];
        
        if (typeof value === 'string') {
          texts.push({ path: currentPath, text: value });
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          texts.push(...this.extractAllText(value, currentPath));
        }
      }
    }
    
    return texts;
  }

  /**
   * 检查术语一致性
   */
  checkTerminologyConsistency(language, data) {
    const texts = this.extractAllText(data);
    const inconsistencies = [];
    const suggestions = [];

    for (const { path, text } of texts) {
      // 检查是否使用了英文术语
      for (const [englishTerm, translations] of Object.entries(TERMINOLOGY_DICTIONARY)) {
        if (translations[language]) {
          const expectedTerm = translations[language];
          const englishRegex = new RegExp(`\\b${englishTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          
          if (englishRegex.test(text) && !text.toLowerCase().includes(expectedTerm.toLowerCase())) {
            inconsistencies.push({
              path,
              issue: `Found English term "${englishTerm}" instead of "${expectedTerm}"`,
              text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
              suggestion: text.replace(englishRegex, expectedTerm)
            });
          }
        }
      }

      // 检查混合语言使用
      const mixedMatches = text.match(INCONSISTENCY_PATTERNS.mixedLanguage);
      if (mixedMatches && language !== 'en') {
        inconsistencies.push({
          path,
          issue: `Mixed language detected: ${mixedMatches.join(', ')}`,
          text: text.substring(0, 100) + (text.length > 100 ? '...' : '')
        });
      }
    }

    if (inconsistencies.length > 0) {
      this.results.inconsistencies[language] = inconsistencies;
    }

    // 生成改进建议
    this.generateSuggestions(language, texts);
    
    // 统计信息
    this.results.statistics[language] = {
      totalTexts: texts.length,
      inconsistencies: inconsistencies.length,
      consistencyRate: ((texts.length - inconsistencies.length) / texts.length * 100).toFixed(2) + '%'
    };
  }

  /**
   * 生成改进建议
   */
  generateSuggestions(language, texts) {
    const suggestions = [];
    
    // 检查术语使用频率
    const termUsage = {};
    
    for (const { text } of texts) {
      for (const [englishTerm, translations] of Object.entries(TERMINOLOGY_DICTIONARY)) {
        if (translations[language]) {
          const expectedTerm = translations[language];
          const regex = new RegExp(`\\b${expectedTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
          const matches = text.match(regex);
          
          if (matches) {
            termUsage[expectedTerm] = (termUsage[expectedTerm] || 0) + matches.length;
          }
        }
      }
    }

    // 建议最常用的术语
    const sortedTerms = Object.entries(termUsage)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    if (sortedTerms.length > 0) {
      suggestions.push({
        type: 'terminology_usage',
        message: `Most used terms in ${language}:`,
        terms: sortedTerms.map(([term, count]) => `${term} (${count} times)`)
      });
    }

    if (suggestions.length > 0) {
      this.results.suggestions[language] = suggestions;
    }
  }

  /**
   * 检查所有语言的术语一致性
   */
  async checkAllLanguages() {
    console.log('🔤 Starting terminology consistency check...\n');

    const languages = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];
    
    for (const language of languages) {
      const filePath = path.join('messages', `${language}.json`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${language} - file not found`);
        continue;
      }

      console.log(`📋 Checking ${language}...`);
      
      const data = this.loadJsonFile(filePath);
      if (data) {
        this.checkTerminologyConsistency(language, data);
        console.log(`   Consistency: ${this.results.statistics[language]?.consistencyRate || '0%'}`);
      }
    }

    this.generateReport();
  }

  /**
   * 生成报告
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🔤 TERMINOLOGY CONSISTENCY REPORT');
    console.log('='.repeat(60));

    // 统计概览
    console.log('\n📊 CONSISTENCY STATISTICS:');
    console.log('Language | Total Texts | Issues | Consistency Rate');
    console.log('-'.repeat(50));
    
    for (const [language, stats] of Object.entries(this.results.statistics)) {
      const rate = parseFloat(stats.consistencyRate);
      const status = rate >= 95 ? '✅' : rate >= 80 ? '⚠️' : '❌';
      console.log(`${language.padEnd(8)} | ${stats.totalTexts.toString().padEnd(11)} | ${stats.inconsistencies.toString().padEnd(6)} | ${stats.consistencyRate.padEnd(15)} ${status}`);
    }

    // 不一致详情
    const languagesWithIssues = Object.keys(this.results.inconsistencies);
    if (languagesWithIssues.length > 0) {
      console.log('\n❌ TERMINOLOGY INCONSISTENCIES:');
      
      for (const language of languagesWithIssues) {
        const issues = this.results.inconsistencies[language];
        console.log(`\n   ${language.toUpperCase()}:`);
        
        issues.slice(0, 5).forEach(issue => {
          console.log(`     • ${issue.path}: ${issue.issue}`);
          if (issue.suggestion) {
            console.log(`       Suggestion: ${issue.suggestion.substring(0, 80)}...`);
          }
        });
        
        if (issues.length > 5) {
          console.log(`     ... and ${issues.length - 5} more issues`);
        }
      }
    }

    // 改进建议
    const languagesWithSuggestions = Object.keys(this.results.suggestions);
    if (languagesWithSuggestions.length > 0) {
      console.log('\n💡 IMPROVEMENT SUGGESTIONS:');
      
      for (const language of languagesWithSuggestions) {
        const suggestions = this.results.suggestions[language];
        console.log(`\n   ${language.toUpperCase()}:`);
        
        suggestions.forEach(suggestion => {
          console.log(`     • ${suggestion.message}`);
          if (suggestion.terms) {
            suggestion.terms.forEach(term => {
              console.log(`       - ${term}`);
            });
          }
        });
      }
    }

    // 术语词典参考
    console.log('\n📚 TERMINOLOGY REFERENCE:');
    console.log('Use these standardized terms for consistency:');
    
    const sampleTerms = ['Elf', 'Wood Elf', 'Dark Elf', 'High Elf', 'Magic'];
    for (const term of sampleTerms) {
      console.log(`\n   ${term}:`);
      const translations = TERMINOLOGY_DICTIONARY[term];
      if (translations) {
        Object.entries(translations).slice(0, 6).forEach(([lang, translation]) => {
          console.log(`     ${lang}: ${translation}`);
        });
      }
    }

    console.log('\n' + '='.repeat(60));
    
    const totalIssues = Object.values(this.results.inconsistencies).reduce((sum, issues) => sum + issues.length, 0);
    if (totalIssues === 0) {
      console.log('🎉 ALL TERMINOLOGY IS CONSISTENT!');
    } else {
      console.log(`⚠️  FOUND ${totalIssues} TERMINOLOGY ISSUES ACROSS ALL LANGUAGES`);
    }
    console.log('='.repeat(60));

    // 保存报告
    this.saveReport();
  }

  /**
   * 保存报告到文件
   */
  saveReport() {
    const reportPath = 'terminology-consistency-report.json';
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLanguages: Object.keys(this.results.statistics).length,
        totalIssues: Object.values(this.results.inconsistencies).reduce((sum, issues) => sum + issues.length, 0),
        averageConsistency: Object.values(this.results.statistics).reduce((sum, stats) => sum + parseFloat(stats.consistencyRate), 0) / Object.keys(this.results.statistics).length
      },
      terminology: TERMINOLOGY_DICTIONARY,
      results: this.results
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }
  }
}

// 运行检查
if (require.main === module) {
  const checker = new TerminologyChecker();
  checker.checkAllLanguages().catch(console.error);
}

module.exports = TerminologyChecker;