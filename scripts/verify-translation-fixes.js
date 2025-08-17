#!/usr/bin/env node

// 验证翻译修复的脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 验证翻译修复...\n');

// 检查dnd-elf-names页面是否使用了正确的翻译键
const dndPagePath = path.join(__dirname, '../app/[locale]/dnd-elf-names/page.tsx');
const dndPageContent = fs.readFileSync(dndPagePath, 'utf8');

console.log('📄 检查 dnd-elf-names 页面翻译键:');

// 检查是否使用了 dndElf 而不是 dnd
const usesCorrectKeys = dndPageContent.includes("t('dndElf.metadata.title')") &&
                       dndPageContent.includes("namespace: 'dndElfSeo'");

if (usesCorrectKeys) {
  console.log('  ✅ 页面使用了正确的翻译键 (dndElf)');
} else {
  console.log('  ❌ 页面仍在使用错误的翻译键');
}

// 检查ElfNameSEO组件是否修复了硬编码链接
const seoComponentPath = path.join(__dirname, '../components/ElfNameSEO.tsx');
const seoComponentContent = fs.readFileSync(seoComponentPath, 'utf8');

console.log('\n🔗 检查 ElfNameSEO 组件硬编码链接:');

const usesLocalizedHref = seoComponentContent.includes('useLocale') &&
                         seoComponentContent.includes('buildLocalizedPath') &&
                         seoComponentContent.includes('href={homeHref}');

if (usesLocalizedHref) {
  console.log('  ✅ 组件使用了本地化链接');
} else {
  console.log('  ❌ 组件仍有硬编码链接');
}

// 验证特定语言的翻译文件是否包含所需键
console.log('\n🌍 检查翻译文件中的关键键:');

const criticalTranslationKeys = [
  'dndElf.metadata.title',
  'dndElf.seo.toolLabel',
  'dndElfSeo.introduction.title'
];

const testLocales = ['pt', 'es', 'fr'];

for (const locale of testLocales) {
  const translationPath = path.join(__dirname, `../messages/${locale}.json`);
  
  try {
    const translations = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
    
    const hasAllKeys = criticalTranslationKeys.every(keyPath => {
      const keyParts = keyPath.split('.');
      let current = translations;
      
      for (const part of keyParts) {
        if (!current || typeof current !== 'object' || !current[part]) {
          return false;
        }
        current = current[part];
      }
      
      return typeof current === 'string';
    });
    
    console.log(`  ${locale.toUpperCase()}: ${hasAllKeys ? '✅' : '❌'} ${hasAllKeys ? '所有关键键存在' : '缺少关键键'}`);
  } catch (error) {
    console.log(`  ${locale.toUpperCase()}: ❌ 文件加载失败`);
  }
}

console.log('\n🎯 修复验证总结:');
console.log(`- 翻译键修复: ${usesCorrectKeys ? '✅' : '❌'}`);
console.log(`- 链接本地化: ${usesLocalizedHref ? '✅' : '❌'}`);
console.log(`- 翻译文件完整性: 需要进一步检查`);

if (usesCorrectKeys && usesLocalizedHref) {
  console.log('\n🎉 主要修复已完成！页面现在应该能正确显示翻译内容。');
} else {
  console.log('\n⚠️ 仍有问题需要解决。');
}