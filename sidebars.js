/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'category',
      label: '技术笔记',
      items: ['tech/notes'],
    },
  ],
};

module.exports = sidebars;