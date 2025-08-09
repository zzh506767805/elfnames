// 根页面由 next-intl 中间件自动处理语言检测和重定向
// 不需要手动重定向

export default function RootPage() {
  return null; // 这个组件实际上不会被渲染，因为中间件会处理重定向
}