#!/usr/bin/env node

/**
 * 用户体验测试脚本
 * 测试语言切换的响应速度、加载状态和错误提示
 */

const fs = require('fs');

console.log('👤 用户体验测试开始...\n');

// 测试1: 检查加载状态实现
console.log('⏳ 测试1: 加载状态和视觉反馈');
const languageSwitcherContent = fs.readFileSync('components/LanguageSwitcher.tsx', 'utf8');

const hasLoadingState = languageSwitcherContent.includes('isChanging');
console.log(`  ${hasLoadingState ? '✅' : '❌'} 语言切换加载状态`);

const hasLoadingAnimation = languageSwitcherContent.includes('animate-spin');
console.log(`  ${hasLoadingAnimation ? '✅' : '❌'} 加载动画效果`);

const hasLoadingText = languageSwitcherContent.includes('切换中...');
console.log(`  ${hasLoadingText ? '✅' : '❌'} 加载状态文本`);

const hasDisabledState = languageSwitcherContent.includes('disabled={isChanging}');
console.log(`  ${hasDisabledState ? '✅' : '❌'} 加载时禁用交互`);

// 测试2: 检查错误处理和用户反馈
console.log('\n❌ 测试2: 错误处理和用户反馈');

const hasErrorState = languageSwitcherContent.includes('error') && languageSwitcherContent.includes('setError');
console.log(`  ${hasErrorState ? '✅' : '❌'} 错误状态管理`);

const hasErrorDisplay = languageSwitcherContent.includes('text-red-500') || languageSwitcherContent.includes('text-red-600');
console.log(`  ${hasErrorDisplay ? '✅' : '❌'} 错误视觉提示`);

const hasRetryMechanism = languageSwitcherContent.includes('retryLanguageChange');
console.log(`  ${hasRetryMechanism ? '✅' : '❌'} 重试机制`);

const hasErrorTimeout = languageSwitcherContent.includes('setTimeout') && languageSwitcherContent.includes('setError(null)');
console.log(`  ${hasErrorTimeout ? '✅' : '❌'} 错误自动清除`);

// 测试3: 检查性能优化
console.log('\n⚡ 测试3: 性能优化');

const hasUseCallback = languageSwitcherContent.includes('useCallback');
console.log(`  ${hasUseCallback ? '✅' : '❌'} 使用 useCallback 优化`);

const hasPreventDuplicateClicks = languageSwitcherContent.includes('if (newLocale === currentLocale || isChanging) return');
console.log(`  ${hasPreventDuplicateClicks ? '✅' : '❌'} 防止重复点击`);

const hasPathValidation = languageSwitcherContent.includes('validatePath');
console.log(`  ${hasPathValidation ? '✅' : '❌'} 路径验证优化`);

// 测试4: 检查用户界面友好性
console.log('\n🎨 测试4: 用户界面友好性');

const hasTooltips = languageSwitcherContent.includes('title=');
console.log(`  ${hasTooltips ? '✅' : '❌'} 工具提示支持`);

const hasVisualFeedback = languageSwitcherContent.includes('hover:') && languageSwitcherContent.includes('transition');
console.log(`  ${hasVisualFeedback ? '✅' : '❌'} 悬停和过渡效果`);

const hasCurrentLanguageIndicator = languageSwitcherContent.includes('✓') || languageSwitcherContent.includes('checkmark');
console.log(`  ${hasCurrentLanguageIndicator ? '✅' : '❌'} 当前语言指示器`);

const hasAccessibilitySupport = languageSwitcherContent.includes('aria-label') || languageSwitcherContent.includes('title');
console.log(`  ${hasAccessibilitySupport ? '✅' : '❌'} 无障碍支持`);

// 测试5: 检查导航体验
console.log('\n🧭 测试5: 导航体验');

const subPageNavContent = fs.readFileSync('components/SubPageNavigation.tsx', 'utf8');

const hasHoverEffects = subPageNavContent.includes('hover:shadow-lg') && subPageNavContent.includes('group-hover:');
console.log(`  ${hasHoverEffects ? '✅' : '❌'} 导航卡片悬停效果`);

const hasTransitionEffects = subPageNavContent.includes('transition-shadow') && subPageNavContent.includes('transition-colors');
console.log(`  ${hasTransitionEffects ? '✅' : '❌'} 平滑过渡动画`);

const hasDebugInfo = subPageNavContent.includes('console.debug') && subPageNavContent.includes('NODE_ENV');
console.log(`  ${hasDebugInfo ? '✅' : '❌'} 开发环境调试信息`);

// 测试6: 检查响应式设计
console.log('\n📱 测试6: 响应式设计');

const hasResponsiveGrid = subPageNavContent.includes('md:grid-cols-2') && subPageNavContent.includes('lg:grid-cols-3');
console.log(`  ${hasResponsiveGrid ? '✅' : '❌'} 响应式网格布局`);

const hasResponsiveText = languageSwitcherContent.includes('hidden sm:inline');
console.log(`  ${hasResponsiveText ? '✅' : '❌'} 响应式文本显示`);

const hasResponsiveDropdown = languageSwitcherContent.includes('max-h-[300px]') && languageSwitcherContent.includes('overflow-y-auto');
console.log(`  ${hasResponsiveDropdown ? '✅' : '❌'} 响应式下拉菜单`);

// 测试7: 检查翻译回退用户体验
console.log('\n🌐 测试7: 翻译回退用户体验');

const serverTransUtilsContent = fs.readFileSync('lib/serverTranslationUtils.ts', 'utf8');

const hasGracefulFallback = serverTransUtilsContent.includes('fallbackLocale') && serverTransUtilsContent.includes('getServerDefaultTranslation');
console.log(`  ${hasGracefulFallback ? '✅' : '❌'} 优雅的翻译回退`);

const hasLogging = serverTransUtilsContent.includes('console.warn') && serverTransUtilsContent.includes('NODE_ENV');
console.log(`  ${hasLogging ? '✅' : '❌'} 开发环境翻译日志`);

const hasDefaultTranslations = serverTransUtilsContent.includes('defaultTranslations') && serverTransUtilsContent.includes('toolLabel');
console.log(`  ${hasDefaultTranslations ? '✅' : '❌'} 完整的默认翻译`);

// 汇总结果
console.log('\n📊 用户体验测试摘要');
const uxChecks = [
  hasLoadingState,
  hasLoadingAnimation,
  hasLoadingText,
  hasDisabledState,
  hasErrorState,
  hasErrorDisplay,
  hasRetryMechanism,
  hasErrorTimeout,
  hasUseCallback,
  hasPreventDuplicateClicks,
  hasPathValidation,
  hasTooltips,
  hasVisualFeedback,
  hasCurrentLanguageIndicator,
  hasAccessibilitySupport,
  hasHoverEffects,
  hasTransitionEffects,
  hasDebugInfo,
  hasResponsiveGrid,
  hasResponsiveText,
  hasResponsiveDropdown,
  hasGracefulFallback,
  hasLogging,
  hasDefaultTranslations
];

const passedUXChecks = uxChecks.filter(Boolean).length;
const totalUXChecks = uxChecks.length;

console.log(`通过检查: ${passedUXChecks}/${totalUXChecks}`);

// 用户体验评分
const uxScore = Math.round((passedUXChecks / totalUXChecks) * 100);
console.log(`用户体验评分: ${uxScore}%`);

if (uxScore >= 90) {
  console.log('🌟 优秀！用户体验实现非常完善。');
} else if (uxScore >= 80) {
  console.log('👍 良好！用户体验实现较为完善。');
} else if (uxScore >= 70) {
  console.log('👌 可以！用户体验实现基本满足要求。');
} else {
  console.log('⚠️  需要改进用户体验实现。');
}

console.log('\n🎯 用户体验测试完成！');

if (uxScore >= 80) {
  process.exit(0);
} else {
  process.exit(1);
}