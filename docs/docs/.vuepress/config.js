const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Silviabot Documentation',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  // Base url
  base: '/silvia/',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Demo',
        link: '/demo/',
      },
      {
        text: 'Setup',
        link: '/setup/',
      },
      {
        text: 'Build',
        link: '/build/'
      },
      {
        text: 'Github',
        link: 'https://github.com/willhunt/silvia'
      }
    ],
    sidebar: {
      '/demo/': [
        {
          title: 'Demo',
          collapsable: false,
          children: [
            '',
            'app-demo',
            'temperature-control'
          ]
        }
      ],
      '/setup/': [
        {
          title: 'Setup',
          collapsable: false,
          children: [
            '',
            'control-setup',
            'raspi-setup',
            'arduino-setup',
            'scale-setup',
            'development-notes'
          ]
        }
      ],
      '/build/': [
        {
          title: 'Build',
          collapsable: false,
          children: [
            '',
            'temperature-control',
            'power-control',
            'brew-control',
            'power-supply',
            'oled-display',
            'wifi-scale'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    ['@vuepress/plugin-medium-zoom',
      {
        selector: '.img'
      }
    ],
    ['@vuepress/search',
      {
        searchMaxSuggestions: 10
      }
    ],
    ['vuepress-plugin-mathjax',
      {
        target: 'svg',
        macros: {
          '*': '\\times',
        },
      },
    ]
  ]
}
