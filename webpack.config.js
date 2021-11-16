const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const htmlPageNames = ['index', 'editor', 'mypage', 'reviewDetail', 'search'];

module.exports = {
  entry: {
    app: './src/js/app.js',
    ...htmlPageNames.reduce(
      (entry, name) => ({
        ...entry,
        [`${name === 'index' ? 'main' : name}`]: `./src/js/${name === 'index' ? 'main' : name}.js`,
      }),
      {}
    ),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'js/[name].bundle.js',
  },
  plugins: [
    ...htmlPageNames.map(
      name =>
        new HtmlWebpackPlugin({
          filename: `${name}.html`,
          template: `src/template/${name}.html`,
          chunks: [name === 'index' ? 'main' : name, 'app'],
        })
    ),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, 'src/images'),
          to: path.join(__dirname, 'public/images'),
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
