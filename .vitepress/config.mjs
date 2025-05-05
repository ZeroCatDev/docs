import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZeroCat社区",
  description: "社区文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [

      {
        text: '部署指南',
        items: [
          { text: '部署概览', link: '/deployment/' },
          { text: '开始使用', link: '/deployment/getting-started' },
          { text: '前端构建', link: '/deployment/frontend-building' },
          { text: '配置参考', link: '/deployment/config-reference' },
          { text: '故障排查', link: '/deployment/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunwuyuan' },
      { icon: 'mail', link: 'mailto:sun@wuyuan.dev' }
    ],

    search: {
      provider: 'local'
    },
    editLink: {
      pattern: 'https://github.com/zerocatdev/docs/edit/main/:path',
      text: '在 GitHub 上编辑此页面'
    },
    lastUpdated: true

  },
  ignoreDeadLinks: true,

})
