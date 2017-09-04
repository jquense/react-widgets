const jsxtremeMarkdown = require('@mapbox/jsxtreme-markdown');

require('./prism');

exports.resolvableExtensions = () => ['.md'];

exports.modifyWebpackConfig = ({ config, stage }, pluginOptions) => {
  function loader(source) {
    return jsxtremeMarkdown.toComponentModule(source, Object.assign(
        {},
        pluginOptions,
        {
        rehypePlugins: [
          ...pluginOptions.rehypePlugins,
          require('@mapbox/rehype-prism'),
        ]
      }
    ));
  }

  config.loader('js', (current) => {
    config.loader('jsxtreme', {
      test: /\.md$/,
      loader: current.loader,
      query: current.query,
    })
    config.loader('jsxtreme-2', {
      test: /\.md$/,
      loader: loader,
    })
    return current;
  })

  return config;
};
