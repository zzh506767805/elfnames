#!/usr/bin/env node

/**
 * 功能测试脚本
 * 测试翻译文件的功能性和完整性
 */

const fs = require('fs');
const path = require('path');

const LANGUAGES = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];
const MESSAGES_DIR = 'messages';

// 关键功能区域测试
const CRITICAL_SECTIONS = [
  'common.siteName',
  'common.generateButton',
  'metadata.title',
  'metadata.description',
  'form.elfType',
  'form.gender',
  'elfTypes.woodElf',
  'elfTypes.darkElf',
  'elfTypes.highElf',
  'genders.male',
  'genders.female'
];

// SEO关键字段测试
const SEO_FIELDS = [
  'metadata.keywords',
  'metadata.openGraphTitle',
  'metadata.openGraphDescription',
  'woodElf.metadata.title',
  'woodElf.metadata.description',
  'elven.metadata.title',
  'elven.metadata.description'
];

// 用户界面完整性测试
const UI_COMPLETENESS = [
  'common',
  'form',
  'elfTypes',
  'genders',
  'nameStyles',
  'nameCounts',
  'nameCard',
  'languageSwitcher'
];

class FunctionalTester {
  constructor() {
    this.results = {
      languages: {},
      summary: {
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        criticalIssues: 0
      },
      issues: []
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
      return null;
    }
  }

  /**
   * 获取嵌套值
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * 测试关键功能
   */
  testCriticalSections(language, data) {
    const results = {
      passed: 0,
      failed: 0,
      missing: []
    };

    for (const section of CRITICAL_SECTIONS) {
      const value = this.getNestedValue(data, section);
      
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        results.failed++;
        results.missing.push(section);
        this.results.issues.push({
          language,
          type: 'critical',
          section,
          issue: 'Missing or empty critical section'
        });
      } else {
        results.passed++;
      }
    }

    return results;
  }

  /**
   * 测试SEO字段
   */
  testSeoFields(language, data) {
    const results = {
      passed: 0,
      failed: 0,
      issues: []
    };

    for (const field of SEO_FIELDS) {
      const value = this.getNestedValue(data, field);
      
      if (!value) {
        results.failed++;
        results.issues.push(`Missing SEO field: ${field}`);
      } else if (typeof value === 'string') {
        // 检查SEO字段长度
        if (field.includes('title') && value.length > 60) {
          results.issues.push(`SEO title too long (${value.length} chars): ${field}`);
        }
        if (field.includes('description') && value.length > 160) {
          results.issues.push(`SEO description too long (${value.length} chars): ${field}`);
        }
        if (field.includes('keywords') && value.split(',').length < 3) {
          results.issues.push(`Insufficient keywords in: ${field}`);
        }
        
        results.passed++;
      }
    }

    return results;
  }

  /**
   * 测试UI完整性
   */
  testUiCompleteness(language, data) {
    const results = {
      passed: 0,
      failed: 0,
      completeness: {}
    };

    for (const section of UI_COMPLETENESS) {
      const sectionData = this.getNestedValue(data, section);
      
      if (!sectionData) {
        results.failed++;
        results.completeness[section] = 0;
      } else if (typeof sectionData === 'object') {
        const keys = Object.keys(sectionData);
        const nonEmptyKeys = keys.filter(key => {
          const value = sectionData[key];
          return value && (typeof value !== 'string' || value.trim() !== '');
        });
        
        const completeness = (nonEmptyKeys.length / keys.length) * 100;
        results.completeness[section] = completeness;
        
        if (completeness >= 80) {
          results.passed++;
        } else {
          results.failed++;
        }
      }
    }

    return results;
  }

  /**
   * 测试字符编码
   */
  testCharacterEncoding(language, data) {
    const results = {
      passed: 0,
      failed: 0,
      issues: []
    };

    const jsonString = JSON.stringify(data);
    
    // 检查常见编码问题
    const encodingIssues = [
      { pattern: /�/g, name: 'replacement characters' },
      { pattern: /\uFFFD/g, name: 'Unicode replacement characters' },
      { pattern: /\\u[0-9a-fA-F]{4}/g, name: 'escaped Unicode sequences' }
    ];

    for (const issue of encodingIssues) {
      const matches = jsonString.match(issue.pattern);
      if (matches) {
        results.failed++;
        results.issues.push(`Found ${matches.length} ${issue.name}`);
      } else {
        results.passed++;
      }
    }

    // 特定语言的字符检查
    const languageChecks = {
      'ja': /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/,  // 日语字符
      'ko': /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/, // 韩语字符
      'ar': /[\u0600-\u06FF]/,                            // 阿拉伯语字符
      'th': /[\u0E00-\u0E7F]/,                            // 泰语字符
      'ru': /[\u0400-\u04FF]/                             // 俄语字符
    };

    if (languageChecks[language]) {
      const hasNativeChars = languageChecks[language].test(jsonString);
      if (hasNativeChars) {
        results.passed++;
      } else {
        results.failed++;
        results.issues.push(`No native ${language} characters found - possible encoding issue`);
      }
    }

    return results;
  }

  /**
   * 测试JSON结构完整性
   */
  testJsonStructure(language, data) {
    const results = {
      passed: 0,
      failed: 0,
      issues: []
    };

    try {
      // 测试JSON序列化/反序列化
      const serialized = JSON.stringify(data);
      const deserialized = JSON.parse(serialized);
      
      if (JSON.stringify(deserialized) === serialized) {
        results.passed++;
      } else {
        results.failed++;
        results.issues.push('JSON serialization inconsistency');
      }

      // 检查循环引用
      try {
        JSON.stringify(data);
        results.passed++;
      } catch (error) {
        if (error.message.includes('circular')) {
          results.failed++;
          results.issues.push('Circular reference detected');
        }
      }

      // 检查深度嵌套
      const maxDepth = this.getMaxDepth(data);
      if (maxDepth > 10) {
        results.issues.push(`Very deep nesting detected: ${maxDepth} levels`);
      }

    } catch (error) {
      results.failed++;
      results.issues.push(`JSON structure error: ${error.message}`);
    }

    return results;
  }

  /**
   * 获取对象最大深度
   */
  getMaxDepth(obj, currentDepth = 0) {
    if (typeof obj !== 'object' || obj === null) {
      return currentDepth;
    }

    let maxDepth = currentDepth;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const depth = this.getMaxDepth(obj[key], currentDepth + 1);
        maxDepth = Math.max(maxDepth, depth);
      }
    }

    return maxDepth;
  }

  /**
   * 运行所有测试
   */
  async runAllTests() {
    console.log('🧪 Starting functional tests...\n');

    for (const language of LANGUAGES) {
      const filePath = path.join(MESSAGES_DIR, `${language}.json`);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${language} - file not found`);
        continue;
      }

      console.log(`🔍 Testing ${language}...`);
      
      const data = this.loadJsonFile(filePath);
      if (!data) {
        console.log(`   ❌ Failed to load ${language}`);
        continue;
      }

      // 运行各项测试
      const criticalTest = this.testCriticalSections(language, data);
      const seoTest = this.testSeoFields(language, data);
      const uiTest = this.testUiCompleteness(language, data);
      const encodingTest = this.testCharacterEncoding(language, data);
      const structureTest = this.testJsonStructure(language, data);

      // 汇总结果
      const totalTests = CRITICAL_SECTIONS.length + SEO_FIELDS.length + UI_COMPLETENESS.length + 5;
      const passedTests = criticalTest.passed + seoTest.passed + uiTest.passed + encodingTest.passed + structureTest.passed;
      const failedTests = criticalTest.failed + seoTest.failed + uiTest.failed + encodingTest.failed + structureTest.failed;

      this.results.languages[language] = {
        totalTests,
        passedTests,
        failedTests,
        successRate: ((passedTests / totalTests) * 100).toFixed(2),
        critical: criticalTest,
        seo: seoTest,
        ui: uiTest,
        encoding: encodingTest,
        structure: structureTest,
        grade: this.calculateGrade(passedTests / totalTests * 100)
      };

      // 更新总体统计
      this.results.summary.totalTests += totalTests;
      this.results.summary.passedTests += passedTests;
      this.results.summary.failedTests += failedTests;
      this.results.summary.criticalIssues += criticalTest.failed;

      console.log(`   Success Rate: ${this.results.languages[language].successRate}% (Grade: ${this.results.languages[language].grade})`);
    }

    this.generateReport();
  }

  /**
   * 计算等级
   */
  calculateGrade(percentage) {
    if (percentage >= 95) return 'A+';
    if (percentage >= 90) return 'A';
    if (percentage >= 85) return 'B+';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C+';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  }

  /**
   * 生成测试报告
   */
  generateReport() {
    console.log('\n' + '='.repeat(70));
    console.log('🧪 FUNCTIONAL TEST REPORT');
    console.log('='.repeat(70));

    // 总体统计
    const overallSuccess = (this.results.summary.passedTests / this.results.summary.totalTests * 100).toFixed(2);
    console.log('\n📊 OVERALL STATISTICS:');
    console.log(`Total Tests Run: ${this.results.summary.totalTests}`);
    console.log(`Tests Passed: ${this.results.summary.passedTests}`);
    console.log(`Tests Failed: ${this.results.summary.failedTests}`);
    console.log(`Overall Success Rate: ${overallSuccess}%`);
    console.log(`Critical Issues: ${this.results.summary.criticalIssues}`);

    // 语言详细结果
    console.log('\n📋 LANGUAGE TEST RESULTS:');
    console.log('Lang | Total | Passed | Failed | Success Rate | Grade | Status');
    console.log('-'.repeat(70));

    const sortedLanguages = Object.entries(this.results.languages)
      .sort(([,a], [,b]) => parseFloat(b.successRate) - parseFloat(a.successRate));

    for (const [language, results] of sortedLanguages) {
      const rate = parseFloat(results.successRate);
      const status = rate >= 90 ? '🟢 Excellent' :
                    rate >= 80 ? '🟡 Good' :
                    rate >= 60 ? '🟠 Fair' : '🔴 Poor';

      console.log(`${language.padEnd(4)} | ${results.totalTests.toString().padEnd(5)} | ${results.passedTests.toString().padEnd(6)} | ${results.failedTests.toString().padEnd(6)} | ${results.successRate.padEnd(12)}% | ${results.grade.padEnd(5)} | ${status}`);
    }

    // 关键问题
    if (this.results.summary.criticalIssues > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      const criticalIssues = this.results.issues.filter(issue => issue.type === 'critical');
      
      for (const issue of criticalIssues.slice(0, 10)) {
        console.log(`   • [${issue.language}] ${issue.section}: ${issue.issue}`);
      }
      
      if (criticalIssues.length > 10) {
        console.log(`   ... and ${criticalIssues.length - 10} more critical issues`);
      }
    }

    // 测试类别统计
    console.log('\n📈 TEST CATEGORY BREAKDOWN:');
    const categories = ['critical', 'seo', 'ui', 'encoding', 'structure'];
    
    for (const category of categories) {
      let totalPassed = 0;
      let totalFailed = 0;
      
      for (const [, results] of Object.entries(this.results.languages)) {
        totalPassed += results[category].passed;
        totalFailed += results[category].failed;
      }
      
      const categoryRate = totalPassed + totalFailed > 0 ? 
        ((totalPassed / (totalPassed + totalFailed)) * 100).toFixed(2) : '0.00';
      
      console.log(`${category.padEnd(12)}: ${categoryRate}% success rate`);
    }

    console.log('\n' + '='.repeat(70));
    
    if (this.results.summary.criticalIssues === 0 && parseFloat(overallSuccess) >= 90) {
      console.log('🎉 ALL FUNCTIONAL TESTS PASSED WITH EXCELLENT RESULTS!');
    } else if (this.results.summary.criticalIssues === 0) {
      console.log('✅ All critical tests passed, but some improvements needed');
    } else {
      console.log(`❌ ${this.results.summary.criticalIssues} CRITICAL ISSUES NEED IMMEDIATE ATTENTION`);
    }
    
    console.log('='.repeat(70));

    // 保存报告
    this.saveReport();
  }

  /**
   * 保存报告
   */
  saveReport() {
    const reportPath = 'functional-test-report.json';
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results.summary,
      overallSuccessRate: (this.results.summary.passedTests / this.results.summary.totalTests * 100).toFixed(2),
      languages: this.results.languages,
      issues: this.results.issues
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
    }
  }
}

// 运行测试
if (require.main === module) {
  const tester = new FunctionalTester();
  tester.runAllTests().catch(console.error);
}

module.exports = FunctionalTester;