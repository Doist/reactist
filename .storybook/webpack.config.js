// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [],
  module: {
    rules: [
      // add your custom rules.
      {
        test: /\.md$/,
        use: "raw-loader"
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.svg$/,
        loaders: [
              { loader: 'babel-loader', query: { presets: ['es2015'] } },
              { loader: 'react-svg-loader', query: { jsx: true } }
          ]
      },
      { test: /\.svg\.icon$/, loader: 'svg-url-loader' }
    ],
  },
};
