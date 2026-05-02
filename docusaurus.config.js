// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hydrocracking',
  tagline: '个人知识库',
  url: 'https://hydrocracking.github.io',
  baseUrl: '/blob/',
  organizationName: 'Hydrocracking',
  projectName: 'blob',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/docs',
        },
        blog: {
          showReadingTime: true,
          onInlineTags: 'ignore',
          onInlineAuthors: 'ignore',
          onUntruncatedBloggers: 'ignore',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Hydrocracking',
        items: [
          {
            type: 'localeDropdown',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Hydrocracking`,
      },
    }),
};

module.exports = config;