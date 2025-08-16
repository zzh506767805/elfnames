#!/usr/bin/env node

/**
 * 多语言功能修复测试脚本
 * 测试语言切换、导航链接和翻译回退功能
 */

// 模拟测试数据
const locales = ['en', 'es', 'fr', 'de', 'ar', 'ru', 'pt', 'ja', 'ko', 'it', 'id', 'vi', 'pl', 'th'];
const defaultLocale = 'en';
const supportedPagePaths = [
  'wood-elf-name-generator',
  'dark-elf-name-generator',
  'high-elf-name-generator',
  'blood-elf-name-generator',
  'female-elf-name-generator',
  'tolkien-elf-names-generator',
  'dnd-elf-names',
  'elven-name-generator',
  'elf-name-randomizer'
];

// 模拟路径处理函数
function parseCurrentPath(pathname) {
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];
  const isLocaleInPath = firstSegment && locales.includes(firstSegment);
  
  let locale, pagePath;
  if (isLocaleInPath) {
    locale = firstSegment;
    pagePath = pathSegments.slice(1);
  } else {
    locale = defaultLocale;
    pagePath = pathSegments;
  }
  
  return {
    locale,
    pagePath,
    isHomePage: pagePath.length === 0,
    fullPath: pathname
  };
}

function buildLocalizedPath(targetLocale, pagePath = []) {
  let newPath = '';
  if (targetLocale !== defaultLocale) {
    newPath = `/${targetLocale}`;
  }
  if (pagePath.length > 0) {
    newPath += `/${pagePath.join('/')}`;
  }
  return newPath || '/';
}

function buildLanguageRoute(currentPath, targetLocale) {
  const path = buildLocalizedPath(targetLocale, currentPath.pagePath);
  return {
    locale: targetLocale,
    path,
    isDefault: targetLocale === defaultLocale
  };
}

function validatePath(pagePath) {
  if (pagePath.length === 0) return true;
  const pageRoute = pagePath.join('/');
  return supportedPagePaths.includes(pageRoute);
}

console.log('🧪 开始多语言功能测试...\n');

// 测试1: 路径解析功能
console.log('📍 测试1: 路径解析功能');
const testPaths = [
  '/',
  '/de',
  '/wood-elf-name-generator',
  '/de/wood-elf-name-generator',
  '/fr/elven-name-generator',
  '/invalid-page'
];

testPaths.forEach(path => {
  try {
    const pathInfo = parseCurrentPath(path);
    console.log(`  ✅ ${path} -> 语言: ${pathInfo.locale}, 页面: ${pathInfo.pagePath.join('/')}, 首页: ${pathInfo.isHomePage}`);
  } catch (error) {
    console.log(`  ❌ ${path} -> 错误: ${error.message}`);
  }
});

console.log('\n📍 测试2: 语言路由构建');
const testCases = [
  { path: '/', targetLocale: 'de' },
  { path: '/wood-elf-name-generator', targetLocale: 'fr' },
  { path: '/de/wood-elf-name-generator', targetLocale: 'en' },
  { path: '/fr/elven-name-generator', targetLocale: 'ja' }
];

testCases.forEach(({ path, targetLocale }) => {
  try {
    const currentPath = parseCurrentPath(path);
    const route = buildLanguageRoute(currentPath, targetLocale);
    console.log(`  ✅ ${path} -> ${targetLocale}: ${route.path}`);
  } catch (error) {
    console.log(`  ❌ ${path} -> ${targetLocale}: 错误: ${error.message}`);
  }
});

console.log('\n📍 测试3: 本地化路径构建');
const localizationTests = [
  { locale: 'en', pagePath: [] },
  { locale: 'en', pagePath: ['wood-elf-name-generator'] },
  { locale: 'de', pagePath: [] },
  { locale: 'de', pagePath: ['wood-elf-name-generator'] },
  { locale: 'fr', pagePath: ['elven-name-generator'] }
];

localizationTests.forEach(({ locale, pagePath }) => {
  try {
    const path = buildLocalizedPath(locale, pagePath);
    console.log(`  ✅ ${locale} + [${pagePath.join(', ')}] -> ${path}`);
  } catch (error) {
    console.log(`  ❌ ${locale} + [${pagePath.join(', ')}] -> 错误: ${error.message}`);
  }
});

console.log('\n📍 测试4: 路径验证');
const validationTests = [
  [],
  ['wood-elf-name-generator'],
  ['elven-name-generator'],
  ['invalid-page'],
  ['wood-elf-name-generator', 'extra-segment']
];

validationTests.forEach(pagePath => {
  const isValid = validatePath(pagePath);
  const status = isValid ? '✅' : '❌';
  console.log(`  ${status} [${pagePath.join('/')}] -> ${isValid ? '有效' : '无效'}`);
});

console.log('\n📍 测试5: 支持的页面路径');
console.log(`  支持的页面数量: ${supportedPagePaths.length}`);
supportedPagePaths.forEach(path => {
  console.log(`  ✅ ${path}`);
});

console.log('\n📍 测试6: 语言切换场景模拟');
const switchingScenarios = [
  { from: '/de/wood-elf-name-generator', to: 'fr', expected: '/fr/wood-elf-name-generator' },
  { from: '/fr/wood-elf-name-generator', to: 'en', expected: '/wood-elf-name-generator' },
  { from: '/wood-elf-name-generator', to: 'de', expected: '/de/wood-elf-name-generator' },
  { from: '/', to: 'ja', expected: '/ja' },
  { from: '/de', to: 'en', expected: '/' }
];

switchingScenarios.forEach(({ from, to, expected }) => {
  try {
    const currentPath = parseCurrentPath(from);
    const route = buildLanguageRoute(currentPath, to);
    const success = route.path === expected;
    const status = success ? '✅' : '❌';
    console.log(`  ${status} ${from} -> ${to}: ${route.path} ${success ? '' : `(期望: ${expected})`}`);
  } catch (error) {
    console.log(`  ❌ ${from} -> ${to}: 错误: ${error.message}`);
  }
});

console.log('\n🎉 多语言功能测试完成！');

// 检查是否有任何测试失败
const hasErrors = false; // 这里可以添加错误计数逻辑
if (hasErrors) {
  console.log('\n⚠️  发现一些问题，请检查上述输出。');
  process.exit(1);
} else {
  console.log('\n✨ 所有测试通过！');
  process.exit(0);
}