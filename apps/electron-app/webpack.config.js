const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    mode: 'development',
    entry: {
      polyfills: path.resolve(__dirname, './src/polyfills.ts'),
      vendor: path.resolve(__dirname, './src/vendor.ts'),
      app: path.resolve(__dirname, './src/main.ts'),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../../dist/apps/electron-app'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /^(?!.*\.spec\.ts$).*\.ts$/,
          use: [
            { loader: 'ts-loader' },
            {
              loader: 'webpack-preprocessor-loader',
              options: {
                params: {
                  __DEVELOPMENT__: true,
                },
              },
            },
          ],
          include: [
            path.resolve(__dirname, '..', 'ele-sample'),
            path.resolve(__dirname, '..', '..', 'libs', 'shared', 'src'),
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader',
          options: {
            filename: '[name].[hash].[ext]',
            path: 'assets/',
          },
        },
      ],
    },
  });
};
