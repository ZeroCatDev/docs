import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZeroCat社区",
  description: "社区文档",
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: 'ZeroCat社区', link: '/zerocat/' },
      { text: 'Classworks作业板', link: '/classworks/' },
    ],
    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      '/zerocat/': [
        {
          text: 'ZeroCat社区',
          items: [
            { text: '简介', link: '/zerocat/' },
            { text: '开始使用', link: '/zerocat/getting-started' },

            { text: '部署概览', link: '/zerocat/deployment/' },
            { text: '前端构建', link: '/zerocat/frontend-building' },
            { text: '配置参考', link: '/zerocat/config-reference' },
            { text: '故障排查', link: '/zerocat/troubleshooting' }
          ]
        }
      ],

      // 当用户位于 `config` 目录时，会显示此侧边栏
      '/classworks/': [
        {
          text: 'Classworks',
          items: [
            { text: '简介', link: '/classworks/' },
            { text: 'KV数据库', link: '/classworks/kv' },
            { text: '部署', link: '/classworks/deploy' }
          ]
        }
      ]
    },

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

  },
  ignoreDeadLinks: true,

})
