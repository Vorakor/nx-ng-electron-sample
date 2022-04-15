const webpack = require('webpack');
const path = require('path');

module.exports = {
  // mode: 'development',
  entry: {
    // vendor: './src/vendor.ts',
    // polyfills: './src/polyfills.ts',
    main: './src/main.ts',
  },
  output: {
    path: path.join(process.cwd(), '../../../dist/apps/electron-app'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [],
};
