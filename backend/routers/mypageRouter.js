const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const path = require('path');
const compiler = webpack(require('../../webpack.config'));

const app = express();
app.use(middleware(compiler));

const mypageRouter = express.Router();

mypageRouter.get('/', (req, res) => {
  // 웹팩이 처리한 html 경로를 찾는다.
  const filename = path.join(compiler.outputPath, 'index.html');
  // 그 경로에에서 html 파일을 읽는다.
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) return;
    res.set('content-type', 'text/html').end(result);
  });
});

module.exports = mypageRouter;
