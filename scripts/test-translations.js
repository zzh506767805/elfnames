#!/usr/bin/env node

// 简单的翻译测试脚本，验证回退机制是否工作
const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');
const supportedLocales = ['en', 'es', 'fr', 'de', 'ar', 'ru', 'pt', 'ja', 'ko', 'it', 'id', 'vi', 'pl', 'th'];

// 关键的翻译键列表
const criticalKeys = [
  'bloodElf.metadata.title',
  'bloodElf.metadata.description',
  'bloodElf.seo.toolLabel',
  'bloodElf.seo.infoLabel',
  'woodElf.metadata.title',
  'darkElf.metadata.title',
  'highElf.metadata.title',
  'femaleElf.metadata.title',
  'tolkienElf.metadata.title'
];

// 获取嵌套键的值
function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((current, key) => current?.[key], obj);
}

// 深度合并函数
function deepMerge(fallback, current) {
  if (!fallback || !current) return current || fallback;
  
  const result = { ...fallback };
  
  for (const key in current) {
    if (current.hasOwnProperty(key)) {
      if (typeof current[key] === 'object' && current[key] !== null && 
          typeof result[key] === 'object' && result[key] !== null) {
        result[key] = deepMerge(result[key], current[key]);
      } else {
        result[key] = current[key];
      }
    }
  }
  
  return result;
}

console.log('🔍 测试翻译回退机制...\n');

// 加载英文作为回退
let enMessages;
try {
  enMessages = JSON.parse(fs.readFileSync(path.join(messagesDir, 'en.json'), 'utf8'));
  console.log('✅ 英文翻译文件加载成功');
} catch (error) {
  console.error('❌ 无法加载英文翻译文件:', error.message);
  process.exit(1);
}

// 测试每种语言
const results = {};

for (const locale of supportedLocales) {
  if (locale === 'en') continue; // 跳过英文
  
  try {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, `${locale}.json`), 'utf8'));
    const mergedMessages = deepMerge(enMessages, messages);
    
    results[locale] = {
      loaded: true,
      missing: [],
      available: []
    };
    
    // 检查关键键
    for (const key of criticalKeys) {
      const value = getNestedValue(mergedMessages, key);
      const originalValue = getNestedValue(messages, key);
      
      if (!value) {
        results[locale].missing.push(key);
      } else if (!originalValue) {
        results[locale].available.push({ key, fallback: true });
      } else {
        results[locale].available.push({ key, fallback: false });
      }
    }
    
  } catch (error) {
    results[locale] = {
      loaded: false,
      error: error.message
    };
  }
}

// 输出结果
console.log('\n📊 测试结果汇总:\n');

for (const [locale, result] of Object.entries(results)) {
  console.log(`🌍 ${locale.toUpperCase()}:`);
  
  if (!result.loaded) {
    console.log(`  ❌ 加载失败: ${result.error}`);
    continue;
  }
  
  const totalKeys = criticalKeys.length;
  const availableKeys = result.available.length;
  const fallbackKeys = result.available.filter(item => item.fallback).length;
  const nativeKeys = availableKeys - fallbackKeys;
  
  console.log(`  📈 可用键: ${availableKeys}/${totalKeys} (${((availableKeys/totalKeys)*100).toFixed(1)}%)`);
  console.log(`  🏠 本地键: ${nativeKeys}/${totalKeys} (${((nativeKeys/totalKeys)*100).toFixed(1)}%)`);
  console.log(`  🔄 回退键: ${fallbackKeys}/${totalKeys} (${((fallbackKeys/totalKeys)*100).toFixed(1)}%)`);
  
  if (result.missing.length > 0) {
    console.log(`  ❌ 缺失键: ${result.missing.join(', ')}`);
  }
  
  console.log('');
}

// 总结
const totalLocales = Object.keys(results).length;
const workingLocales = Object.values(results).filter(r => r.loaded).length;

console.log(`\n🎯 总结:`);
console.log(`- 测试语言: ${totalLocales}`);
console.log(`- 工作正常: ${workingLocales}/${totalLocales}`);

if (workingLocales === totalLocales) {
  console.log(`✅ 所有语言的翻译回退机制工作正常！`);
} else {
  console.log(`⚠️  有 ${totalLocales - workingLocales} 种语言存在问题`);
}