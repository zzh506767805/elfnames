#!/usr/bin/env node

/**
 * 翻译验证脚本
 * 检查JSON文件的结构完整性、术语一致性和翻译覆盖率
 */

const fs = require('fs');
const path = require('path');

// 支持的语言列表
const LANGUAGES = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];
const BASE_LANGUAGE = 'en';
const MESSAGES_DIR = 'messages';

// 关键术语词典 - 确保一致性
const TERMINOLOGY = {
  'Wood Elf': {
    'de': 'Waldelf',
    'es': 'Elfo del Bosque',
    'fr': 'Elfe des Bois',
    'it': 'Elfo del Bosco',
    'ja': '森エルフ',
    'ko': '우드엘프'
  },
  'Dark Elf': {
    'de': 'Dunkelelf',
    'es': 'Elfo Oscuro',
    'fr': 'Elfe Noir',
    'it': 'Elfo Scuro',
    'ja': 'ダークエルフ',
    'ko': '다크엘프'
  },
  'High Elf': {
    'de': 'Hochelf',
    'es': 'Alto Elfo',
    'fr': 'Haut-Elfe',
    'it': 'Alto Elfo',
    'ja': 'ハイエルフ',
    'ko': '하이엘프'
  }
};

class TranslationValidator {
  constructor() {
    this.baseData = null;
    this.results = {
      structureErrors: [],
      missingKeys: {},
      terminologyErrors: [],
      coverageStats: {},
      totalErrors: 0
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
   * 递归获取所有键路径
   */
  getAllKeys(obj, prefix = '') {
    const keys = [];
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          keys.push(...this.getAllKeys(obj[key], fullKey));
        } else {
          keys.push(fullKey);
        }
      }
    }
    
    return keys;
  }

  /**
   * 获取嵌套对象的值
   */
  getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * 验证JSON结构
   */
  validateJsonStructure(filePath) {
    const data = this.loadJsonFile(filePath);
    if (!data) {
      this.results.structureErrors.push(`Failed to load ${filePath}`);
      return false;
    }

    try {
      JSON.stringify(data);
      return true;
    } catch (error) {
      this.results.structureErrors.push(`Invalid JSON structure in ${filePath}: ${error.message}`);
      return false;
    }
  }

  /**
   * 检查缺失的键
   */
  checkMissingKeys(language, targetData) {
    if (!this.baseData) return;

    const baseKeys = this.getAllKeys(this.baseData);
    const targetKeys = this.getAllKeys(targetData);
    const missingKeys = baseKeys.filter(key => !targetKeys.includes(key));

    if (missingKeys.length > 0) {
      this.results.missingKeys[language] = missingKeys;
    }

    // 计算覆盖率
    const coverage = ((baseKeys.length - missingKeys.length) / baseKeys.length * 100).toFixed(2);
    this.results.coverageStats[language] = {
      total: baseKeys.length,
      translated: baseKeys.length - missingKeys.length,
      missing: missingKeys.length,
      coverage: `${coverage}%`
    };
  }

  /**
   * 检查术语一致性
   */
  checkTerminologyConsistency(language, data) {
    const content = JSON.stringify(data).toLowerCase();
    
    for (const [englishTerm, translations] of Object.entries(TERMINOLOGY)) {
      if (translations[language]) {
        const expectedTerm = translations[language].toLowerCase();
        const englishTermLower = englishTerm.toLowerCase();
        
        // 检查是否使用了英文术语而不是本地化术语
        if (content.includes(englishTermLower) && !content.includes(expectedTerm)) {
          this.results.terminologyErrors.push({
            language,
            issue: `Found English term "${englishTerm}" instead of localized "${translations[language]}"`
          });
        }
      }
    }
  }

  /**
   * 检查特定内容是否存在
   */
  checkRequiredContent(language, data) {
    const requiredSections = [
      'elven.metadata',
      'elven.seo',
      'elvenSeo.introduction',
      'elvenSeo.whatIs',
      'elvenSeo.types',
      'elvenSeo.conclusion',
      'woodElf.seo'
    ];

    for (const section of requiredSections) {
      const value = this.getNestedValue(data, section);
      if (!value) {
        if (!this.results.missingKeys[language]) {
          this.results.missingKeys[language] = [];
        }
        this.results.missingKeys[language].push(section);
      }
    }
  }

  /**
   * 验证所有翻译
   */
  async validateAllTranslations() {
    console.log('🔍 Starting translation validation...\n');

    // 加载基准语言文件
    const basePath = path.join(MESSAGES_DIR, `${BASE_LANGUAGE}.json`);
    this.baseData = this.loadJsonFile(basePath);
    
    if (!this.baseData) {
      console.error(`❌ Failed to load base language file: ${basePath}`);
      return;
    }

    console.log(`✅ Loaded base language (${BASE_LANGUAGE})`);

    // 验证每种语言
    for (const language of LANGUAGES) {
      const filePath = path.join(MESSAGES_DIR, `${language}.json`);
      
      console.log(`\n📋 Validating ${language}...`);

      // 检查文件是否存在
      if (!fs.existsSync(filePath)) {
        this.results.structureErrors.push(`Missing translation file: ${filePath}`);
        continue;
      }

      // 验证JSON结构
      if (!this.validateJsonStructure(filePath)) {
        continue;
      }

      // 加载翻译数据
      const translationData = this.loadJsonFile(filePath);
      if (!translationData) {
        continue;
      }

      // 检查缺失的键
      this.checkMissingKeys(language, translationData);

      // 检查术语一致性
      this.checkTerminologyConsistency(language, translationData);

      // 检查必需内容
      this.checkRequiredContent(language, translationData);

      console.log(`   Coverage: ${this.results.coverageStats[language]?.coverage || '0%'}`);
    }

    this.generateReport();
  }

  /**
   * 生成验证报告
   */
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 TRANSLATION VALIDATION REPORT');
    console.log('='.repeat(60));

    // 结构错误
    if (this.results.structureErrors.length > 0) {
      console.log('\n❌ STRUCTURE ERRORS:');
      this.results.structureErrors.forEach(error => {
        console.log(`   • ${error}`);
      });
      this.results.totalErrors += this.results.structureErrors.length;
    }

    // 覆盖率统计
    console.log('\n📈 COVERAGE STATISTICS:');
    console.log('Language | Total Keys | Translated | Missing | Coverage');
    console.log('-'.repeat(55));
    
    for (const [language, stats] of Object.entries(this.results.coverageStats)) {
      const coverage = parseFloat(stats.coverage);
      const status = coverage >= 95 ? '✅' : coverage >= 80 ? '⚠️' : '❌';
      console.log(`${language.padEnd(8)} | ${stats.total.toString().padEnd(10)} | ${stats.translated.toString().padEnd(10)} | ${stats.missing.toString().padEnd(7)} | ${stats.coverage.padEnd(8)} ${status}`);
    }

    // 缺失键详情
    const languagesWithMissingKeys = Object.keys(this.results.missingKeys);
    if (languagesWithMissingKeys.length > 0) {
      console.log('\n⚠️  MISSING KEYS DETAILS:');
      for (const language of languagesWithMissingKeys) {
        const missingKeys = this.results.missingKeys[language];
        if (missingKeys.length > 0) {
          console.log(`\n   ${language.toUpperCase()}:`);
          missingKeys.slice(0, 10).forEach(key => {
            console.log(`     • ${key}`);
          });
          if (missingKeys.length > 10) {
            console.log(`     ... and ${missingKeys.length - 10} more`);
          }
          this.results.totalErrors += missingKeys.length;
        }
      }
    }

    // 术语错误
    if (this.results.terminologyErrors.length > 0) {
      console.log('\n🔤 TERMINOLOGY ERRORS:');
      this.results.terminologyErrors.forEach(error => {
        console.log(`   • [${error.language}] ${error.issue}`);
      });
      this.results.totalErrors += this.results.terminologyErrors.length;
    }

    // 总结
    console.log('\n' + '='.repeat(60));
    if (this.results.totalErrors === 0) {
      console.log('🎉 ALL TRANSLATIONS VALIDATED SUCCESSFULLY!');
    } else {
      console.log(`❌ VALIDATION COMPLETED WITH ${this.results.totalErrors} ISSUES`);
    }
    console.log('='.repeat(60));

    // 保存详细报告到文件
    this.saveDetailedReport();
  }

  /**
   * 保存详细报告到文件
   */
  saveDetailedReport() {
    const reportPath = 'translation-validation-report.json';
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalLanguages: LANGUAGES.length,
        totalErrors: this.results.totalErrors,
        validationPassed: this.results.totalErrors === 0
      },
      details: this.results
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }
  }
}

// 运行验证
if (require.main === module) {
  const validator = new TranslationValidator();
  validator.validateAllTranslations().catch(console.error);
}

module.exports = TranslationValidator;