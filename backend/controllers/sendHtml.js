const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const path = require('path');
const compiler = webpack(require('../../webpack.config'));

const app = express();
app.use(middleware(compiler));

exports.sendHtml = (page, res) => {
  const filename = path.join(compiler.outputPath, `${page}.html`);
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return;
    res.set('content-type', 'text/html').end(result);
  });
};
