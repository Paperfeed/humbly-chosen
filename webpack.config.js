const path = require('path')
const webpack = require('webpack')
const ZipPlugin = require('zip-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const WextManifestWebpackPlugin = require('wext-manifest-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const viewsPath = path.join(__dirname, 'views')
const sourcePath = path.join(__dirname, 'source')
const destPath = path.join(__dirname, 'extension')
const nodeEnv = process.env.NODE_ENV || 'development'
const targetBrowser = process.env.TARGET_BROWSER

const extensionReloaderPlugin =
  nodeEnv === 'development'
    ? new ExtensionReloader({
        entries: {
          background: 'background',
          contentScript: 'contentScript',
          extensionPage: ['popup', 'options'],
        },
        port: 9090,
        reloadPage: true,
      })
    : () => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.apply = () => {}
      }

const getExtensionFileType = browser => {
  switch (browser) {
    case 'opera':
      return 'crx'
    case 'firefox':
      return 'xpi'
    default:
      return 'zip'
  }
}

module.exports = {
  devtool: false,

  entry: {
    background: path.join(sourcePath, 'Background', 'index.ts'),
    contentScript: path.join(sourcePath, 'ContentScript', 'index.ts'),
    manifest: path.join(sourcePath, 'manifest.json'),
    options: path.join(sourcePath, 'Options', 'index.tsx'),
    popup: path.join(sourcePath, 'Popup', 'index.tsx'),
  },

  mode: nodeEnv,

  module: {
    rules: [
      {
        exclude: /node_modules/,
        // prevent webpack handling json with its own loaders,
        test: /manifest\.json$/,
        type: 'javascript/auto',
        use: {
          loader: 'wext-manifest-loader',
          options: {
            usePackageJSONVersion: true, // set to false to not use package.json version for manifest
          },
        },
      },
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.(js|ts)x?$/,
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        extractComments: false,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new ZipPlugin({
        extension: `${getExtensionFileType(targetBrowser)}`,
        filename: `${targetBrowser}`,
        path: destPath,
      }),
    ],
  },

  output: {
    filename: 'js/[name].bundle.js',
    path: path.join(destPath, targetBrowser),
  },

  plugins: [
    // Plugin to not generate js bundle for manifest entry
    new WextManifestWebpackPlugin(),
    // Generate sourcemaps
    new webpack.SourceMapDevToolPlugin({ filename: false }),
    new ForkTsCheckerWebpackPlugin(),
    // environmental variables
    new webpack.EnvironmentPlugin(['NODE_ENV', 'TARGET_BROWSER']),
    // delete previous build files
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.join(process.cwd(), `extension/${targetBrowser}`),
        path.join(
          process.cwd(),
          `extension/${targetBrowser}.${getExtensionFileType(targetBrowser)}`,
        ),
      ],
      cleanStaleWebpackAssets: false,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      chunks: ['popup'],
      filename: 'popup.html',
      inject: 'body',
      template: path.join(viewsPath, 'popup.html'),
    }),
    new HtmlWebpackPlugin({
      chunks: ['options'],
      filename: 'options.html',
      inject: 'body',
      template: path.join(viewsPath, 'options.html'),
    }),
    // copy static assets
    new CopyWebpackPlugin([{ from: 'source/assets', to: 'assets' }]),
    // plugin to enable browser reloading in development mode
    extensionReloaderPlugin,
  ],

  resolve: {
    alias: {
      'webextension-polyfill-ts': path.resolve(
        path.join(__dirname, 'node_modules', 'webextension-polyfill-ts'),
      ),
    },
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  // https://github.com/webpack/webpack/issues/1194#issuecomment-560382342
  stats: {
    all: false,
    builtAt: true,
    errors: true,
    hash: true,
  },
}
