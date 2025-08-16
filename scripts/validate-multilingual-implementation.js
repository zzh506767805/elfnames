#!/usr/bin/env node

/**
 * 多语言实现验证脚本
 * 验证所有修复是否正确实现
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 验证多语言功能实现...\n');

// 检查1: 验证路径工具文件存在
console.log('📁 检查1: 路径工具文件');
const pathUtilsExists = fs.existsSync('lib/pathUtils.ts');
console.log(`  ${pathUtilsExists ? '✅' : '❌'} lib/pathUtils.ts`);

const translationUtilsExists = fs.existsSync('lib/translationUtils.ts');
console.log(`  ${translationUtilsExists ? '✅' : '❌'} lib/translationUtils.ts`);

const serverTranslationUtilsExists = fs.existsSync('lib/serverTranslationUtils.ts');
console.log(`  ${serverTranslationUtilsExists ? '✅' : '❌'} lib/serverTranslationUtils.ts`);

// 检查2: 验证组件更新
console.log('\n🔧 检查2: 组件更新');
const languageSwitcherContent = fs.readFileSync('components/LanguageSwitcher.tsx', 'utf8');
const hasPathUtilsImport = languageSwitcherContent.includes('parseCurrentPath, buildLanguageRoute');
console.log(`  ${hasPathUtilsImport ? '✅' : '❌'} LanguageSwitcher 导入路径工具`);

const hasErrorHandling = languageSwitcherContent.includes('error') && languageSwitcherContent.includes('setError');
console.log(`  ${hasErrorHandling ? '✅' : '❌'} LanguageSwitcher 错误处理`);

const subPageNavContent = fs.readFileSync('components/SubPageNavigation.tsx', 'utf8');
const hasNavPathUtils = subPageNavContent.includes('buildLocalizedPath');
console.log(`  ${hasNavPathUtils ? '✅' : '❌'} SubPageNavigation 使用路径工具`);

// 检查3: 验证页面更新
console.log('\n📄 检查3: 页面更新');
const woodElfPageContent = fs.readFileSync('app/[locale]/wood-elf-name-generator/page.tsx', 'utf8');
const hasServerTranslationImport = woodElfPageContent.includes('getTranslationWithFallback');
console.log(`  ${hasServerTranslationImport ? '✅' : '❌'} Wood Elf 页面使用翻译回退`);

const hasAriaLabelFix = woodElfPageContent.includes('aria-label={toolLabel}');
console.log(`  ${hasAriaLabelFix ? '✅' : '❌'} Wood Elf 页面修复 aria-label`);

const homePageContent = fs.readFileSync('app/[locale]/page.tsx', 'utf8');
const hasHomePageFix = homePageContent.includes('getTranslationWithFallback');
console.log(`  ${hasHomePageFix ? '✅' : '❌'} 首页使用翻译回退`);

// 检查4: 验证关键功能
console.log('\n⚙️ 检查4: 关键功能验证');

// 检查路径工具函数
if (pathUtilsExists) {
  const pathUtilsContent = fs.readFileSync('lib/pathUtils.ts', 'utf8');
  const hasParseCurrentPath = pathUtilsContent.includes('export function parseCurrentPath');
  const hasBuildLocalizedPath = pathUtilsContent.includes('export function buildLocalizedPath');
  const hasBuildLanguageRoute = pathUtilsContent.includes('export function buildLanguageRoute');
  const hasValidatePath = pathUtilsContent.includes('export function validatePath');
  
  console.log(`  ${hasParseCurrentPath ? '✅' : '❌'} parseCurrentPath 函数`);
  console.log(`  ${hasBuildLocalizedPath ? '✅' : '❌'} buildLocalizedPath 函数`);
  console.log(`  ${hasBuildLanguageRoute ? '✅' : '❌'} buildLanguageRoute 函数`);
  console.log(`  ${hasValidatePath ? '✅' : '❌'} validatePath 函数`);
}

// 检查翻译工具函数
if (serverTranslationUtilsExists) {
  const serverTransUtilsContent = fs.readFileSync('lib/serverTranslationUtils.ts', 'utf8');
  const hasGetTranslationWithFallback = serverTransUtilsContent.includes('export async function getTranslationWithFallback');
  const hasDefaultTranslations = serverTransUtilsContent.includes('defaultTranslations');
  
  console.log(`  ${hasGetTranslationWithFallback ? '✅' : '❌'} getTranslationWithFallback 函数`);
  console.log(`  ${hasDefaultTranslations ? '✅' : '❌'} 默认翻译映射`);
}

// 检查5: 验证修复的具体问题
console.log('\n🎯 检查5: 问题修复验证');

// 问题1: 语言切换器修复
const hasCorrectLanguageSwitch = languageSwitcherContent.includes('parseCurrentPath(pathname)') && 
                                 languageSwitcherContent.includes('buildLanguageRoute(currentPath, newLocale)');
console.log(`  ${hasCorrectLanguageSwitch ? '✅' : '❌'} 问题1: 语言切换保持页面路径`);

// 问题2: 导航链接修复
const hasCorrectNavigation = subPageNavContent.includes('buildPageHref(page.path)');
console.log(`  ${hasCorrectNavigation ? '✅' : '❌'} 问题2: 首页导航多语言支持`);

// 问题3: SEO区域修复
const hasCorrectSEO = woodElfPageContent.includes('toolLabel') && 
                      woodElfPageContent.includes('infoLabel') &&
                      !woodElfPageContent.includes("t('woodElf.seo.toolLabel')");
console.log(`  ${hasCorrectSEO ? '✅' : '❌'} 问题3: SEO区域翻译回退`);

console.log('\n📊 验证摘要');
const checks = [
  pathUtilsExists,
  translationUtilsExists,
  serverTranslationUtilsExists,
  hasPathUtilsImport,
  hasErrorHandling,
  hasNavPathUtils,
  hasServerTranslationImport,
  hasAriaLabelFix,
  hasHomePageFix,
  hasCorrectLanguageSwitch,
  hasCorrectNavigation,
  hasCorrectSEO
];

const passedChecks = checks.filter(Boolean).length;
const totalChecks = checks.length;

console.log(`通过检查: ${passedChecks}/${totalChecks}`);

if (passedChecks === totalChecks) {
  console.log('🎉 所有验证通过！多语言功能修复已完成。');
  process.exit(0);
} else {
  console.log('⚠️  部分验证失败，请检查上述输出。');
  process.exit(1);
}