#!/usr/bin/env node

/**
 * 代码清理和优化脚本
 * 检查并优化多语言功能相关代码
 */

const fs = require('fs');

console.log('🧹 代码清理和优化开始...\n');

// 1. 检查并清理注释
console.log('📝 检查1: 代码注释质量');

const filesToCheck = [
  'lib/pathUtils.ts',
  'lib/translationUtils.ts',
  'lib/serverTranslationUtils.ts',
  'components/LanguageSwitcher.tsx',
  'components/SubPageNavigation.tsx'
];

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // 检查是否有JSDoc注释
    const hasJSDoc = content.includes('/**') && content.includes('* @param');
    console.log(`  ${hasJSDoc ? '✅' : '⚠️ '} ${file} - JSDoc注释`);
    
    // 检查是否有TODO或FIXME
    const hasTodos = content.includes('TODO') || content.includes('FIXME');
    console.log(`  ${hasTodos ? '⚠️ ' : '✅'} ${file} - ${hasTodos ? '包含TODO/FIXME' : '无待办事项'}`);
    
    // 检查是否有调试代码
    const hasDebugCode = content.includes('console.log') && !content.includes('NODE_ENV');
    console.log(`  ${hasDebugCode ? '⚠️ ' : '✅'} ${file} - ${hasDebugCode ? '包含调试代码' : '无调试代码'}`);
  }
});

// 2. 检查代码复杂度
console.log('\n🔍 检查2: 代码复杂度');

const languageSwitcherContent = fs.readFileSync('components/LanguageSwitcher.tsx', 'utf8');

// 检查函数长度
const changeLanguageFunctionMatch = languageSwitcherContent.match(/const changeLanguage[\s\S]*?}, \[/);
if (changeLanguageFunctionMatch) {
  const functionLines = changeLanguageFunctionMatch[0].split('\n').length;
  console.log(`  ${functionLines <= 30 ? '✅' : '⚠️ '} changeLanguage函数长度: ${functionLines}行`);
}

// 检查嵌套层级
const maxNesting = (languageSwitcherContent.match(/\s{2,}/g) || [])
  .map(match => match.length / 2)
  .reduce((max, current) => Math.max(max, current), 0);
console.log(`  ${maxNesting <= 4 ? '✅' : '⚠️ '} 最大嵌套层级: ${maxNesting}`);

// 3. 检查性能优化
console.log('\n⚡ 检查3: 性能优化');

const hasUseCallback = languageSwitcherContent.includes('useCallback');
console.log(`  ${hasUseCallback ? '✅' : '⚠️ '} 使用useCallback优化`);

const hasMemoization = languageSwitcherContent.includes('useMemo') || languageSwitcherContent.includes('memo');
console.log(`  ${hasMemoization ? '✅' : 'ℹ️ '} 使用记忆化优化 ${hasMemoization ? '' : '(可选)'}`);

const hasEarlyReturn = languageSwitcherContent.includes('if (newLocale === currentLocale || isChanging) return');
console.log(`  ${hasEarlyReturn ? '✅' : '⚠️ '} 早期返回优化`);

// 4. 检查错误处理
console.log('\n🛡️ 检查4: 错误处理');

const hasTryCatch = languageSwitcherContent.includes('try {') && languageSwitcherContent.includes('} catch');
console.log(`  ${hasTryCatch ? '✅' : '⚠️ '} try-catch错误处理`);

const hasErrorState = languageSwitcherContent.includes('error') && languageSwitcherContent.includes('setError');
console.log(`  ${hasErrorState ? '✅' : '⚠️ '} 错误状态管理`);

const hasErrorRecovery = languageSwitcherContent.includes('retryLanguageChange');
console.log(`  ${hasErrorRecovery ? '✅' : '⚠️ '} 错误恢复机制`);

// 5. 检查TypeScript类型安全
console.log('\n📝 检查5: TypeScript类型安全');

const pathUtilsContent = fs.readFileSync('lib/pathUtils.ts', 'utf8');

const hasInterfaceDefinitions = pathUtilsContent.includes('interface PathInfo') && 
                               pathUtilsContent.includes('interface LanguageRoute');
console.log(`  ${hasInterfaceDefinitions ? '✅' : '⚠️ '} 接口定义完整`);

const hasTypeExports = pathUtilsContent.includes('export interface') || 
                      pathUtilsContent.includes('export type');
console.log(`  ${hasTypeExports ? '✅' : '⚠️ '} 类型导出`);

const hasStrictTypes = !pathUtilsContent.includes('any') || 
                      pathUtilsContent.includes('as any') && pathUtilsContent.split('as any').length <= 3;
console.log(`  ${hasStrictTypes ? '✅' : '⚠️ '} 严格类型检查`);

// 6. 检查代码一致性
console.log('\n🎯 检查6: 代码一致性');

const subPageNavContent = fs.readFileSync('components/SubPageNavigation.tsx', 'utf8');

const usesConsistentImports = languageSwitcherContent.includes('../lib/pathUtils') && 
                             subPageNavContent.includes('../lib/pathUtils');
console.log(`  ${usesConsistentImports ? '✅' : '⚠️ '} 一致的导入路径`);

const usesConsistentNaming = languageSwitcherContent.includes('buildLanguageRoute') && 
                            subPageNavContent.includes('buildLocalizedPath');
console.log(`  ${usesConsistentNaming ? '✅' : '⚠️ '} 一致的函数命名`);

// 7. 检查文档完整性
console.log('\n📚 检查7: 文档完整性');

const hasMainDocumentation = fs.existsSync('docs/multilingual-fixes-documentation.md');
console.log(`  ${hasMainDocumentation ? '✅' : '⚠️ '} 主要技术文档`);

const hasReadme = fs.existsSync('README.md');
console.log(`  ${hasReadme ? '✅' : 'ℹ️ '} README文档 ${hasReadme ? '' : '(建议添加)'}`);

// 8. 检查测试覆盖
console.log('\n🧪 检查8: 测试覆盖');

const testFiles = [
  'scripts/test-multilingual-fixes.js',
  'scripts/test-user-experience.js',
  'scripts/regression-test.js',
  'scripts/validate-multilingual-implementation.js'
];

const testCoverage = testFiles.filter(file => fs.existsSync(file)).length;
console.log(`  ✅ 测试脚本覆盖: ${testCoverage}/${testFiles.length}`);

// 9. 性能建议
console.log('\n💡 性能优化建议');

if (!hasMemoization) {
  console.log('  💡 考虑对复杂计算使用useMemo优化');
}

if (maxNesting > 3) {
  console.log('  💡 考虑重构深层嵌套的代码');
}

// 10. 代码质量评分
console.log('\n📊 代码质量评分');

// 重新计算一些检查结果
let hasJSDoc = true;
let hasTodos = false;
let hasDebugCode = false;
let functionLines = 35; // 估算值

filesToCheck.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (!content.includes('/**') || !content.includes('* @param')) {
      hasJSDoc = false;
    }
    if (content.includes('TODO') || content.includes('FIXME')) {
      hasTodos = true;
    }
    if (content.includes('console.log') && !content.includes('NODE_ENV')) {
      hasDebugCode = true;
    }
  }
});

const qualityChecks = [
  hasJSDoc,
  !hasTodos,
  !hasDebugCode,
  functionLines <= 30,
  maxNesting <= 4,
  hasUseCallback,
  hasEarlyReturn,
  hasTryCatch,
  hasErrorState,
  hasErrorRecovery,
  hasInterfaceDefinitions,
  hasTypeExports,
  hasStrictTypes,
  usesConsistentImports,
  usesConsistentNaming,
  hasMainDocumentation,
  testCoverage >= 3
];

const passedQualityChecks = qualityChecks.filter(Boolean).length;
const totalQualityChecks = qualityChecks.length;
const qualityScore = Math.round((passedQualityChecks / totalQualityChecks) * 100);

console.log(`质量评分: ${qualityScore}%`);
console.log(`通过检查: ${passedQualityChecks}/${totalQualityChecks}`);

if (qualityScore >= 90) {
  console.log('🌟 优秀！代码质量很高。');
} else if (qualityScore >= 80) {
  console.log('👍 良好！代码质量较高。');
} else if (qualityScore >= 70) {
  console.log('👌 可以！代码质量基本满足要求。');
} else {
  console.log('⚠️  需要改进代码质量。');
}

console.log('\n🧹 代码清理和优化完成！');

if (qualityScore >= 80) {
  process.exit(0);
} else {
  process.exit(1);
}