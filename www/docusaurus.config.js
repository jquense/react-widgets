module.exports = {
  title: 'React Widgets',
  tagline: 'A la carte form components',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'jquense', // Usually your GitHub org/user name.
  projectName: 'react-widgets', // Usually your repo name.
  stylesheets: [
    {
      href: 'https://use.fontawesome.com/releases/v5.1.0/css/solid.css',
      type: 'text/css',
      integrity:
        'sha384-TbilV5Lbhlwdyc4RuIV/JhD8NR+BfMrvz4BL5QFa2we1hQu6wvREr3v6XSRfCTRp',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://use.fontawesome.com/releases/v5.1.0/css/brands.css',
      type: 'text/css',
      integrity:
        'sha384-7xAnn7Zm3QC1jFjVc1A6v/toepoG3JXboQYzbM0jrPzou9OFXm/fY6Z/XiIebl/k',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://use.fontawesome.com/releases/v5.1.0/css/fontawesome.css',
      type: 'text/css',
      integrity:
        'sha384-ozJwkrqb90Oa3ZNb+yKFW2lToAWYdTiF1vt8JiH5ptTGHTGcN7qdoR1F95e0kYyG',
      crossOrigin: 'anonymous',
    },
  ],
  themeConfig: {
    // prism: {
    //   theme: require('./src/syntax-theme'),
    // },
    colorMode: {
      disableSwitch: true,
    },
    navbar: {
      title: 'React Widgets',
      logo: {
        alt: 'React Widgets Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/jquense/react-widgets',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Jason Quense. Built with Docusaurus.`,
    },
  },
  plugins: [
    require.resolve('./plugins/webpack'),
    'docusaurus-plugin-astroturf',
  ],
  presets: [
    [
      '@4c/docusaurus-preset',
      {
        theme: [
          '@docusaurus/theme-classic',
          { customCss: require.resolve('./src/css/custom.css') },
        ],
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        reactMetadata: {
          src: '../packages/react-widgets/src/**/*.{js,tsx,ts}',
          watchPaths: ['./plugins/examples/*'],
          docgen: {
            handlers: [require('./plugins/doc-handler')],
          },
        },
      },
    ],
  ],
}
