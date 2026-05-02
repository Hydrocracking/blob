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
      },
      footer: {
        style: 'dark',
        copyright: `© ${new Date().getFullYear()} Hydrocracking`,
      },
    }),
};

module.exports = config;