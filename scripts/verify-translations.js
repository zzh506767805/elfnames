#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 支持的语言
const locales = ['en', 'ja', 'de', 'fr', 'es', 'it', 'pt', 'ru', 'ko', 'pl', 'th', 'vi', 'id', 'ar'];

// 支持的页面路径
const supportedPages = [
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

// 需要检查的关键翻译键
const criticalKeys = [
  'navigation.title',
  'navigation.description',
  'navigation.elfRandomizer.title',
  'navigation.elfRandomizer.description',
  'randomizer.metadata.title',
  'randomizer.seo.toolLabel',
  'randomizer.seo.infoLabel',
  'header.title',
  'header.description'
];

// 可能导致重复显示的值
const duplicateValues = [
  'Elf Name Generator',
  'Generate fantasy elf names for your characters',
  'Ultimate Elf Name Generator'
];

function loadTranslation(locale) {
  try {
    const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Failed to load translation for ${locale}:`, error.message);
    return null;
  }
}

function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

function findDuplicateValues(translations, locale) {
  const issues = [];
  
  function traverse(obj, currentPath = '') {
    for (const [key, value] of Object.entries(obj)) {
      const fullPath = currentPath ? `${currentPath}.${key}` : key;
      
      if (typeof value === 'string') {
        if (duplicateValues.includes(value.trim())) {
          issues.push({
            locale,
            key: fullPath,
            value: value.trim(),
            issue: 'Potential duplicate English fallback'
          });
        }
      } else if (typeof value === 'object' && value !== null) {
        traverse(value, fullPath);
      }
    }
  }
  
  traverse(translations);
  return issues;
}

function verifyTranslations() {
  console.log('🔍 验证翻译文件中的潜在重复问题...\n');
  
  const allIssues = [];
  
  // 加载英语作为参考
  const enTranslations = loadTranslation('en');
  if (!enTranslations) {
    console.error('❌ 无法加载英语翻译文件，无法继续验证');
    return;
  }
  
  for (const locale of locales) {
    console.log(`\n📋 检查 ${locale} 翻译...`);
    
    const translations = loadTranslation(locale);
    if (!translations) {
      allIssues.push({
        locale,
        key: 'FILE_MISSING',
        issue: 'Translation file missing'
      });
      continue;
    }
    
    // 检查关键键是否存在
    for (const key of criticalKeys) {
      const value = getNestedValue(translations, key);
      const enValue = getNestedValue(enTranslations, key);
      
      if (value === undefined) {
        allIssues.push({
          locale,
          key,
          issue: 'Missing translation key'
        });
      } else if (locale !== 'en' && value === enValue && duplicateValues.includes(value)) {
        allIssues.push({
          locale,
          key,
          value,
          issue: 'Same as English, potential duplicate display'
        });
      }
    }
    
    // 查找可能的重复值
    const duplicateIssues = findDuplicateValues(translations, locale);
    allIssues.push(...duplicateIssues);
    
    console.log(`   ✅ ${locale} 检查完成`);
  }
  
  // 报告结果
  console.log('\n📊 验证结果:');
  
  if (allIssues.length === 0) {
    console.log('✅ 没有发现翻译问题！');
    return;
  }
  
  console.log(`❌ 发现 ${allIssues.length} 个问题:\n`);
  
  // 按语言分组显示问题
  const issuesByLocale = allIssues.reduce((acc, issue) => {
    if (!acc[issue.locale]) acc[issue.locale] = [];
    acc[issue.locale].push(issue);
    return acc;
  }, {});
  
  for (const [locale, issues] of Object.entries(issuesByLocale)) {
    console.log(`\n🌐 ${locale.toUpperCase()}:`);
    for (const issue of issues) {
      console.log(`   ❌ ${issue.key}: ${issue.issue}`);
      if (issue.value) {
        console.log(`      值: "${issue.value}"`);
      }
    }
  }
  
  // 特别关注可能导致重复显示的问题
  const duplicateDisplayIssues = allIssues.filter(issue => 
    issue.issue.includes('duplicate') || issue.issue.includes('Same as English')
  );
  
  if (duplicateDisplayIssues.length > 0) {
    console.log('\n⚠️  可能导致重复显示的问题:');
    for (const issue of duplicateDisplayIssues) {
      console.log(`   🔄 ${issue.locale}/${issue.key}: "${issue.value}"`);
    }
    
    console.log('\n💡 建议：');
    console.log('   1. 为这些键提供特定语言的翻译');
    console.log('   2. 或更新回退机制以避免重复显示相同内容');
  }
}

// 运行验证
verifyTranslations();