const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './src/js/main.js',
    reviewDetail: './src/js/reviewDetail.js',
    mypage: './src/js/mypage.js',
    search: './src/js/search.js',
    editor: './src/js/editor.js',
    authModal: './src/js/authModal.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.html',
      chunks: ['main', 'authModal'],
    }),
    new HtmlWebpackPlugin({
      filename: 'reviewDetail.html',
      template: 'src/template/reviewDetail.html',
      chunks: ['reviewDetail'],
    }),
    new HtmlWebpackPlugin({
      filename: 'mypage.html',
      template: 'src/template/mypage.html',
      chunks: ['mypage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: 'src/template/search.html',
      chunks: ['search'],
    }),
    new HtmlWebpackPlugin({
      filename: 'editor.html',
      template: 'src/template/editor.html',
      chunks: ['editor'],
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/images'),
          to: path.join(__dirname, `public/images`),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src/js')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime',
                {
                  corejs: 3,
                  proposals: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: true,
    port: 'auto',
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        pathRewrite: { '^/': '' },
      },
    },
  },
  devtool: 'source-map',
  mode: 'development',
};
