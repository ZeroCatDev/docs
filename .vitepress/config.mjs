import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZeroCat社区",
  description: "社区文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '部署', link: '/deployment/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '介绍', link: '/markdown-examples' },
        ]
      },
      {
        text: '部署指南',
        items: [
          { text: '部署概览', link: '/deployment/' },
          { text: '开始使用', link: '/deployment/getting-started' },
          { text: '基础配置', link: '/deployment/basic-config' },
          {
            text: '部署方式',
            collapsed: false,
            items: [
              { text: 'Docker部署', link: '/deployment/docker-deployment' },
              { text: '手动部署', link: '/deployment/manual-deployment' }
            ]
          },
          {
            text: '进阶配置',
            collapsed: false,
            items: [
              { text: '安全配置', link: '/deployment/security' },
              { text: '扩展部署', link: '/deployment/scaling' },
              { text: '配置参考', link: '/deployment/config-reference' }
            ]
          },
          { text: '故障排查', link: '/deployment/troubleshooting' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },ignoreDeadLinks:true
})
