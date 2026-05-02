/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'intro',
    },
    {
      type: 'category',
      label: '学习笔记',
      items: ['tech/notes', 'investment/notes'],
    },
  ],
};

module.exports = sidebars;