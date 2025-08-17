#!/bin/bash

# 翻译文件部署脚本
# 生成时间: 2025-08-16T04:57:01.143Z

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

if [ -f "deployment/de.json" ]; then
    cp "deployment/de.json" "messages/de.json"
    echo "   ✅ Deployed de.json"
else
    echo "   ⚠️  Missing de.json"
fi
if [ -f "deployment/es.json" ]; then
    cp "deployment/es.json" "messages/es.json"
    echo "   ✅ Deployed es.json"
else
    echo "   ⚠️  Missing es.json"
fi
if [ -f "deployment/fr.json" ]; then
    cp "deployment/fr.json" "messages/fr.json"
    echo "   ✅ Deployed fr.json"
else
    echo "   ⚠️  Missing fr.json"
fi
if [ -f "deployment/it.json" ]; then
    cp "deployment/it.json" "messages/it.json"
    echo "   ✅ Deployed it.json"
else
    echo "   ⚠️  Missing it.json"
fi
if [ -f "deployment/ja.json" ]; then
    cp "deployment/ja.json" "messages/ja.json"
    echo "   ✅ Deployed ja.json"
else
    echo "   ⚠️  Missing ja.json"
fi
if [ -f "deployment/ko.json" ]; then
    cp "deployment/ko.json" "messages/ko.json"
    echo "   ✅ Deployed ko.json"
else
    echo "   ⚠️  Missing ko.json"
fi
if [ -f "deployment/pt.json" ]; then
    cp "deployment/pt.json" "messages/pt.json"
    echo "   ✅ Deployed pt.json"
else
    echo "   ⚠️  Missing pt.json"
fi
if [ -f "deployment/ru.json" ]; then
    cp "deployment/ru.json" "messages/ru.json"
    echo "   ✅ Deployed ru.json"
else
    echo "   ⚠️  Missing ru.json"
fi
if [ -f "deployment/ar.json" ]; then
    cp "deployment/ar.json" "messages/ar.json"
    echo "   ✅ Deployed ar.json"
else
    echo "   ⚠️  Missing ar.json"
fi
if [ -f "deployment/id.json" ]; then
    cp "deployment/id.json" "messages/id.json"
    echo "   ✅ Deployed id.json"
else
    echo "   ⚠️  Missing id.json"
fi
if [ -f "deployment/pl.json" ]; then
    cp "deployment/pl.json" "messages/pl.json"
    echo "   ✅ Deployed pl.json"
else
    echo "   ⚠️  Missing pl.json"
fi
if [ -f "deployment/th.json" ]; then
    cp "deployment/th.json" "messages/th.json"
    echo "   ✅ Deployed th.json"
else
    echo "   ⚠️  Missing th.json"
fi
if [ -f "deployment/vi.json" ]; then
    cp "deployment/vi.json" "messages/vi.json"
    echo "   ✅ Deployed vi.json"
else
    echo "   ⚠️  Missing vi.json"
fi

# 验证部署
echo "🔍 Validating deployment..."
VALIDATION_PASSED=true


if [ -f "messages/de.json" ]; then
    if python3 -m json.tool "messages/de.json" > /dev/null 2>&1; then
        echo "   ✅ de.json is valid"
    else
        echo "   ❌ de.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  de.json not found"
fi
if [ -f "messages/es.json" ]; then
    if python3 -m json.tool "messages/es.json" > /dev/null 2>&1; then
        echo "   ✅ es.json is valid"
    else
        echo "   ❌ es.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  es.json not found"
fi
if [ -f "messages/fr.json" ]; then
    if python3 -m json.tool "messages/fr.json" > /dev/null 2>&1; then
        echo "   ✅ fr.json is valid"
    else
        echo "   ❌ fr.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  fr.json not found"
fi
if [ -f "messages/it.json" ]; then
    if python3 -m json.tool "messages/it.json" > /dev/null 2>&1; then
        echo "   ✅ it.json is valid"
    else
        echo "   ❌ it.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  it.json not found"
fi
if [ -f "messages/ja.json" ]; then
    if python3 -m json.tool "messages/ja.json" > /dev/null 2>&1; then
        echo "   ✅ ja.json is valid"
    else
        echo "   ❌ ja.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  ja.json not found"
fi
if [ -f "messages/ko.json" ]; then
    if python3 -m json.tool "messages/ko.json" > /dev/null 2>&1; then
        echo "   ✅ ko.json is valid"
    else
        echo "   ❌ ko.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  ko.json not found"
fi
if [ -f "messages/pt.json" ]; then
    if python3 -m json.tool "messages/pt.json" > /dev/null 2>&1; then
        echo "   ✅ pt.json is valid"
    else
        echo "   ❌ pt.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  pt.json not found"
fi
if [ -f "messages/ru.json" ]; then
    if python3 -m json.tool "messages/ru.json" > /dev/null 2>&1; then
        echo "   ✅ ru.json is valid"
    else
        echo "   ❌ ru.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  ru.json not found"
fi
if [ -f "messages/ar.json" ]; then
    if python3 -m json.tool "messages/ar.json" > /dev/null 2>&1; then
        echo "   ✅ ar.json is valid"
    else
        echo "   ❌ ar.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  ar.json not found"
fi
if [ -f "messages/id.json" ]; then
    if python3 -m json.tool "messages/id.json" > /dev/null 2>&1; then
        echo "   ✅ id.json is valid"
    else
        echo "   ❌ id.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  id.json not found"
fi
if [ -f "messages/pl.json" ]; then
    if python3 -m json.tool "messages/pl.json" > /dev/null 2>&1; then
        echo "   ✅ pl.json is valid"
    else
        echo "   ❌ pl.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  pl.json not found"
fi
if [ -f "messages/th.json" ]; then
    if python3 -m json.tool "messages/th.json" > /dev/null 2>&1; then
        echo "   ✅ th.json is valid"
    else
        echo "   ❌ th.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  th.json not found"
fi
if [ -f "messages/vi.json" ]; then
    if python3 -m json.tool "messages/vi.json" > /dev/null 2>&1; then
        echo "   ✅ vi.json is valid"
    else
        echo "   ❌ vi.json is invalid"
        VALIDATION_PASSED=false
    fi
else
    echo "   ⚠️  vi.json not found"
fi

if [ "$VALIDATION_PASSED" = true ]; then
    echo "🎉 Deployment completed successfully!"
    echo "📦 Backup saved in: $BACKUP_DIR"
else
    echo "❌ Deployment validation failed!"
    echo "🔄 Consider rolling back using: cp $BACKUP_DIR/*.json messages/"
    exit 1
fi
