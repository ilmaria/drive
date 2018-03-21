const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const CompressionPlugin = require("compression-webpack-plugin")
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const getClientEnvironment = require('./env')

function insertIf(condition, ...elements) {
  return condition ? elements : []
}

module.exports = (env, options) => {
  const production = options.mode === 'production'
  const publicUrl = ''
  // Get environment variables to inject into our app.
  const dotenv = getClientEnvironment(env, publicUrl)

  return {
    entry: './src/index.bs.js',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js',
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: production,
              },
            },
          ],
        },
        // "file" loader makes sure assets end up in the `build` folder.
        // When you `import` an asset, you get its filename.
        // This loader doesn't use a "test" so it will catch all modules
        // that fall through the other loaders.
        {
          loader: require.resolve('file-loader'),
          // Exclude `js` files to keep "css" loader working as it injects
          // it's runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.(js|re|rei)$/, /\.html$/, /\.css$/, /\.json$/],
          options: {
            name: 'static/[name].[hash:8].[ext]',
          },
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ],
    },
    plugins: [
      // Concatenate all modules into one closure.
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: 'src/index.html',
        minify: production
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
      }),
      new InterpolateHtmlPlugin(env.raw),
      new webpack.DefinePlugin(dotenv.stringified),
    ],
  }
}
