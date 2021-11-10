const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    style: './src/js/frontend/style.js',
    main: './src/js/frontend/main.js',
    mypage: './src/js/frontend/mypage.js',
    reviewDetail: './src/js/frontend/reviewDetail.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template/index.html',
      chunks: ['style', 'main'],
    }),
    new HtmlWebpackPlugin({
      filename: 'mypage.html',
      template: 'src/template/mypage.html',
      chunks: ['style', 'mypage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'reviewDetail.html',
      template: 'src/template/reviewDetail.html',
      chunks: ['style', 'reviewDetail'],
    }),
    new HtmlWebpackPlugin({
      filename: 'search.html',
      template: 'src/template/search.html',
      chunks: ['style', 'search'],
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
