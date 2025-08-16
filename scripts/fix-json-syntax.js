#!/usr/bin/env node

/**
 * JSON语法修复脚本
 * 修复翻译文件中的常见JSON语法错误
 */

const fs = require('fs');
const path = require('path');

function fixJsonSyntax(filePath) {
  console.log(`Fixing JSON syntax in ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 修复常见的JSON语法错误
    
    // 1. 修复缺失的逗号（在字符串后面跟着新行和空格然后是引号的情况）
    content = content.replace(/(".*?")\s*\n\s*(".*?":\s*)/g, '$1,\n      $2');
    
    // 2. 修复在对象属性之间缺失的逗号
    content = content.replace(/(".*?")\s*\n\s*(".*?":\s*{)/g, '$1,\n      $2');
    
    // 3. 修复在数组元素之间缺失的逗号
    content = content.replace(/(".*?")\s*\n\s*(".*?")/g, '$1,\n      $2');
    
    // 4. 修复在对象结束后缺失的逗号
    content = content.replace(/}\s*\n\s*(".*?":\s*)/g, '},\n    $1');
    
    // 5. 移除多余的逗号（在}或]前面的逗号）
    content = content.replace(/,(\s*[}\]])/g, '$1');
    
    // 6. 修复文件末尾的问题
    content = content.replace(/%\s*$/, '');
    
    // 尝试解析修复后的JSON
    try {
      JSON.parse(content);
      console.log(`✅ JSON syntax fixed successfully for ${filePath}`);
      
      // 备份原文件
      fs.writeFileSync(filePath + '.backup', fs.readFileSync(filePath));
      
      // 写入修复后的内容
      fs.writeFileSync(filePath, content);
      
      return true;
    } catch (parseError) {
      console.log(`❌ Still has JSON errors after fix attempt: ${parseError.message}`);
      return false;
    }
    
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    return false;
  }
}

// 修复所有语言文件
const languages = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];

console.log('🔧 Starting JSON syntax fix...\n');

for (const lang of languages) {
  const filePath = path.join('messages', `${lang}.json`);
  
  if (fs.existsSync(filePath)) {
    fixJsonSyntax(filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
}

console.log('\n🔧 JSON syntax fix completed!');