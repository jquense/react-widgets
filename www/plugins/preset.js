module.exports = function preset(context, opts = {}) {
  const { siteConfig = {} } = context
  const { themeConfig } = siteConfig
  const { algolia } = themeConfig
  const isProd = process.env.NODE_ENV === 'production'

  const debug =
    typeof opts.debug !== 'undefined' ? Boolean(opts.debug) : !isProd

  return {
    themes: [
      [require.resolve('@docusaurus/theme-classic'), opts.theme],
      require.resolve('docusaurus-theme-jarle-codeblock'),
      // Don't add this if algolia config is not defined.
      algolia && require.resolve('@docusaurus/theme-search-algolia'),
    ],
    plugins: [
      opts.docs !== false && [
        require.resolve('@docusaurus/plugin-content-docs'),
        {
          ...opts.docs,
          remarkPlugins: [
            require('./parseCodeBlocks'),
            require('./api-docs'),
            ...(opts.docs?.remarkPlugins || []),
          ],
        },
      ],
      opts.pages !== false && [
        require.resolve('@docusaurus/plugin-content-pages'),
        {
          ...opts.pages,
          remarkPlugins: [
            require('./parseCodeBlocks'),
            ...(opts.pages?.remarkPlugins || []),
          ],
        },
      ],
      debug && require.resolve('@docusaurus/plugin-debug'),
      isProd &&
        opts.sitemap !== false && [
          require.resolve('@docusaurus/plugin-sitemap'),
          opts.sitemap,
        ],
      [
        require.resolve('docusaurus-plugin-react-metadata'),
        {
          src: `../packages/react-widgets/src/**/*.{js,tsx,ts}`,
          watchPaths: ['./plugins/examples/*'],
          mdx: {
            remarkPlugins: [require('./parseCodeBlocks')],
          },
          docgen: {
            handlers: [require('./doc-handler')],
          },
        },
      ],
    ],
  }
}
