#!/usr/bin/env node

/**
 * 部署准备脚本
 * 准备翻译文件的生产环境部署
 */

const fs = require('fs');
const path = require('path');

const LANGUAGES = ['de', 'es', 'fr', 'it', 'ja', 'ko', 'pt', 'ru', 'ar', 'id', 'pl', 'th', 'vi'];
const MESSAGES_DIR = 'messages';
const BACKUP_DIR = 'backups';
const DEPLOYMENT_DIR = 'deployment';

class DeploymentPreparation {
  constructor() {
    this.results = {
      backups: [],
      validations: {},
      optimizations: {},
      deploymentReady: false
    };
  }

  /**
   * 创建备份
   */
  createBackups() {
    console.log('📦 Creating backups...');
    
    // 创建备份目录
    if (!fs.existsSync(BACKUP_DIR)) {
      fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `translations-${timestamp}`);
    
    if (!fs.existsSync(backupPath)) {
      fs.mkdirSync(backupPath, { recursive: true });
    }

    for (const language of ['en', ...LANGUAGES]) {
      const sourceFile = path.join(MESSAGES_DIR, `${language}.json`);
      const backupFile = path.join(backupPath, `${language}.json`);
      
      if (fs.existsSync(sourceFile)) {
        fs.copyFileSync(sourceFile, backupFile);
        this.results.backups.push({
          language,
          source: sourceFile,
          backup: backupFile,
          size: fs.statSync(sourceFile).size
        });
        console.log(`   ✅ Backed up ${language}.json`);
      } else {
        console.log(`   ⚠️  Missing ${language}.json`);
      }
    }

    console.log(`📦 Backups created in: ${backupPath}`);
    return backupPath;
  }

  /**
   * 验证翻译文件
   */
  validateTranslations() {
    console.log('\n🔍 Validating translations for deployment...');
    
    for (const language of LANGUAGES) {
      const filePath = path.join(MESSAGES_DIR, `${language}.json`);
      
      if (!fs.existsSync(filePath)) {
        this.results.validations[language] = {
          valid: false,
          error: 'File not found'
        };
        continue;
      }

      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        // 基本验证
        const validation = {
          valid: true,
          fileSize: content.length,
          keyCount: this.countKeys(data),
          hasRequiredSections: this.checkRequiredSections(data),
          encoding: 'UTF-8'
        };

        // 检查文件大小
        if (validation.fileSize < 1000) {
          validation.warnings = validation.warnings || [];
          validation.warnings.push('File size seems too small');
        }

        // 检查关键部分
        if (!validation.hasRequiredSections) {
          validation.warnings = validation.warnings || [];
          validation.warnings.push('Missing some required sections');
        }

        this.results.validations[language] = validation;
        console.log(`   ✅ ${language}: ${validation.keyCount} keys, ${Math.round(validation.fileSize/1024)}KB`);
        
      } catch (error) {
        this.results.validations[language] = {
          valid: false,
          error: error.message
        };
        console.log(`   ❌ ${language}: ${error.message}`);
      }
    }
  }

  /**
   * 递归计算键数量
   */
  countKeys(obj) {
    let count = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          count += this.countKeys(obj[key]);
        } else {
          count++;
        }
      }
    }
    return count;
  }

  /**
   * 检查必需部分
   */
  checkRequiredSections(data) {
    const requiredSections = ['common', 'metadata', 'form', 'elfTypes'];
    return requiredSections.every(section => data[section] && typeof data[section] === 'object');
  }

  /**
   * 优化翻译文件
   */
  optimizeTranslations() {
    console.log('\n⚡ Optimizing translations...');
    
    // 创建部署目录
    if (!fs.existsSync(DEPLOYMENT_DIR)) {
      fs.mkdirSync(DEPLOYMENT_DIR, { recursive: true });
    }

    for (const language of LANGUAGES) {
      const sourceFile = path.join(MESSAGES_DIR, `${language}.json`);
      const deployFile = path.join(DEPLOYMENT_DIR, `${language}.json`);
      
      if (!fs.existsSync(sourceFile)) {
        continue;
      }

      try {
        const content = fs.readFileSync(sourceFile, 'utf8');
        const data = JSON.parse(content);
        
        // 优化数据
        const optimized = this.optimizeData(data);
        
        // 压缩JSON（移除空格）
        const minified = JSON.stringify(optimized);
        
        // 写入部署文件
        fs.writeFileSync(deployFile, minified, 'utf8');
        
        const originalSize = content.length;
        const optimizedSize = minified.length;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        this.results.optimizations[language] = {
          originalSize,
          optimizedSize,
          savings: `${savings}%`,
          compressionRatio: (optimizedSize / originalSize).toFixed(3)
        };
        
        console.log(`   ✅ ${language}: ${Math.round(originalSize/1024)}KB → ${Math.round(optimizedSize/1024)}KB (${savings}% smaller)`);
        
      } catch (error) {
        console.log(`   ❌ ${language}: Optimization failed - ${error.message}`);
      }
    }
  }

  /**
   * 优化数据结构
   */
  optimizeData(data) {
    // 移除空字符串和null值
    const optimized = {};
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        
        if (value === null || value === undefined || value === '') {
          continue; // 跳过空值
        }
        
        if (typeof value === 'object' && !Array.isArray(value)) {
          const optimizedValue = this.optimizeData(value);
          if (Object.keys(optimizedValue).length > 0) {
            optimized[key] = optimizedValue;
          }
        } else if (typeof value === 'string') {
          // 清理字符串
          const cleaned = value.trim();
          if (cleaned.length > 0) {
            optimized[key] = cleaned;
          }
        } else {
          optimized[key] = value;
        }
      }
    }
    
    return optimized;
  }

  /**
   * 生成部署清单
   */
  generateDeploymentManifest() {
    console.log('\n📋 Generating deployment manifest...');
    
    const manifest = {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      languages: LANGUAGES,
      files: {},
      validation: {
        totalFiles: 0,
        validFiles: 0,
        invalidFiles: 0
      },
      optimization: {
        totalOriginalSize: 0,
        totalOptimizedSize: 0,
        totalSavings: 0
      }
    };

    // 收集文件信息
    for (const language of LANGUAGES) {
      const deployFile = path.join(DEPLOYMENT_DIR, `${language}.json`);
      
      if (fs.existsSync(deployFile)) {
        const stats = fs.statSync(deployFile);
        const validation = this.results.validations[language];
        const optimization = this.results.optimizations[language];
        
        manifest.files[language] = {
          path: deployFile,
          size: stats.size,
          lastModified: stats.mtime.toISOString(),
          valid: validation?.valid || false,
          keyCount: validation?.keyCount || 0,
          optimization: optimization || null
        };

        manifest.validation.totalFiles++;
        if (validation?.valid) {
          manifest.validation.validFiles++;
        } else {
          manifest.validation.invalidFiles++;
        }

        if (optimization) {
          manifest.optimization.totalOriginalSize += optimization.originalSize;
          manifest.optimization.totalOptimizedSize += optimization.optimizedSize;
        }
      }
    }

    // 计算总体节省
    if (manifest.optimization.totalOriginalSize > 0) {
      manifest.optimization.totalSavings = 
        ((manifest.optimization.totalOriginalSize - manifest.optimization.totalOptimizedSize) / 
         manifest.optimization.totalOriginalSize * 100).toFixed(2) + '%';
    }

    // 保存清单
    const manifestPath = path.join(DEPLOYMENT_DIR, 'manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`📋 Deployment manifest saved to: ${manifestPath}`);
    return manifest;
  }

  /**
   * 生成部署脚本
   */
  generateDeploymentScript() {
    console.log('\n📜 Generating deployment script...');
    
    const script = `#!/bin/bash

# 翻译文件部署脚本
# 生成时间: ${new Date().toISOString()}

set -e

echo "🚀 Starting translation deployment..."

# 检查目标目录
if [ ! -d "messages" ]; then
    echo "❌ Target messages directory not found"
    exit 1
fi

# 备份现有文件
echo "📦 Creating backup..."
BACKUP_DIR="messages_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp messages/*.json "$BACKUP_DIR/" 2>/dev/null || echo "No existing files to backup"

# 部署新文件
echo "📁 Deploying translation files..."
${LANGUAGES.map(lang => `
if [ -f "deployment/${lang}.json" ]; then
    cp "deployment/${lang}.json" "messages/${lang}.json"
    echo "   ✅ Deployed ${lang}.json"
else
    echo "   ⚠️  Missing ${lang}.json"
fi`).join('')}

# 验证部署
echo "🔍 Validating deployment..."
VALIDATION_PASSED=true

${LANGUAGES.map(lang => `
if [ -f "messages/${lang}.json" ]; then
    if python3 -m json.tool "messages/${lang}.json" > /dev/null 2>&1; then
        echo "   ✅ ${lang}.json is valid"
    else
        echo "   ❌ ${lang}.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  ${lang}.json not found"
fi`).join('')}

if [ "$VALIDATION_PASSED" = true ]; then
    echo "🎉 Deployment completed successfully!"
    echo "📦 Backup saved in: $BACKUP_DIR"
else
    echo "❌ Deployment validation failed!"
    echo "🔄 Consider rolling back using: cp $BACKUP_DIR/*.json messages/"
    exit 1
fi
`;

    const scriptPath = path.join(DEPLOYMENT_DIR, 'deploy.sh');
    fs.writeFileSync(scriptPath, script);
    
    // 使脚本可执行
    try {
      fs.chmodSync(scriptPath, '755');
    } catch (error) {
      console.log('   ⚠️  Could not make script executable (Windows?)');
    }
    
    console.log(`📜 Deployment script saved to: ${scriptPath}`);
  }

  /**
   * 运行完整的部署准备
   */
  async prepare() {
    console.log('🚀 Starting deployment preparation...\n');
    
    try {
      // 1. 创建备份
      const backupPath = this.createBackups();
      
      // 2. 验证翻译
      this.validateTranslations();
      
      // 3. 优化文件
      this.optimizeTranslations();
      
      // 4. 生成清单
      const manifest = this.generateDeploymentManifest();
      
      // 5. 生成部署脚本
      this.generateDeploymentScript();
      
      // 6. 最终检查
      const readyForDeployment = this.checkDeploymentReadiness();
      
      this.generateSummaryReport(backupPath, manifest, readyForDeployment);
      
    } catch (error) {
      console.error(`❌ Deployment preparation failed: ${error.message}`);
      process.exit(1);
    }
  }

  /**
   * 检查部署就绪状态
   */
  checkDeploymentReadiness() {
    const validLanguages = Object.values(this.results.validations)
      .filter(v => v.valid).length;
    
    const totalLanguages = LANGUAGES.length;
    const readinessPercentage = (validLanguages / totalLanguages * 100).toFixed(2);
    
    const isReady = validLanguages >= totalLanguages * 0.8; // 至少80%的语言有效
    
    return {
      ready: isReady,
      validLanguages,
      totalLanguages,
      readinessPercentage
    };
  }

  /**
   * 生成总结报告
   */
  generateSummaryReport(backupPath, manifest, readiness) {
    console.log('\n' + '='.repeat(70));
    console.log('📊 DEPLOYMENT PREPARATION SUMMARY');
    console.log('='.repeat(70));
    
    console.log('\n📦 BACKUP INFORMATION:');
    console.log(`Backup Location: ${backupPath}`);
    console.log(`Files Backed Up: ${this.results.backups.length}`);
    
    console.log('\n🔍 VALIDATION RESULTS:');
    console.log(`Valid Files: ${manifest.validation.validFiles}/${manifest.validation.totalFiles}`);
    console.log(`Invalid Files: ${manifest.validation.invalidFiles}`);
    
    console.log('\n⚡ OPTIMIZATION RESULTS:');
    console.log(`Total Size Reduction: ${manifest.optimization.totalSavings}`);
    console.log(`Original Size: ${Math.round(manifest.optimization.totalOriginalSize/1024)}KB`);
    console.log(`Optimized Size: ${Math.round(manifest.optimization.totalOptimizedSize/1024)}KB`);
    
    console.log('\n🚀 DEPLOYMENT READINESS:');
    console.log(`Ready for Deployment: ${readiness.ready ? '✅ YES' : '❌ NO'}`);
    console.log(`Valid Languages: ${readiness.validLanguages}/${readiness.totalLanguages} (${readiness.readinessPercentage}%)`);
    
    if (readiness.ready) {
      console.log('\n🎉 DEPLOYMENT PREPARATION COMPLETED SUCCESSFULLY!');
      console.log('\nNext steps:');
      console.log('1. Review the deployment manifest in deployment/manifest.json');
      console.log('2. Run the deployment script: ./deployment/deploy.sh');
      console.log('3. Monitor the deployment for any issues');
    } else {
      console.log('\n⚠️  DEPLOYMENT NOT READY');
      console.log('Please fix validation issues before deploying.');
    }
    
    console.log('='.repeat(70));
  }
}

// 运行部署准备
if (require.main === module) {
  const preparation = new DeploymentPreparation();
  preparation.prepare().catch(console.error);
}

module.exports = DeploymentPreparation;