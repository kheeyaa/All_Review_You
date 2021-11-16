const middleware = require('webpack-dev-middleware');
const express = require('express');

const webpack = require('webpack');
const path = require('path');
const compiler = webpack(require('../../webpack.config'));
const Reviews = require('../models/Review');

const app = express();
app.use(middleware(compiler));

const isExistTag = (tags, keyword) => tags.some(tag => tag.match(keyword));

exports.findSearchResult = (req, res) => {
  // https://www.codegrepper.com/code-examples/javascript/axios+query+parameters
  const { keyword } = req.query;

  // res.send(
  //   Reviews.state
  //     .filter(({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword))
  //     .map(({ content, photos }, i, reviews) => ({
  //       ...reviews[i],
  //       content: content.slice(0, 300),
  //       photos: photos.slice(0, 1),
  //     }))
  // );
  res.format({
    // 새로고침에 의한 브라우저 요청에 대해 html을 응답
    'text/html': () => {
      // 웹팩이 처리한 html 경로를 찾는다.
      const filename = path.join(compiler.outputPath, 'search.html');

      // 그 경로에에서 html 파일을 읽는다.
      compiler.outputFileSystem.readFile(filename, (err, result) => {
        if (err) return;
        res.set('content-type', 'text/html').end(result);
      });
    },
    // ajax 요청에 대해 json을 응답
    'application/json': () => {
      res.send(
        Reviews.state
          .filter(
            ({ title, content, tags }) => title.match(keyword) || content.match(keyword) || isExistTag(tags, keyword)
          )
          .map(({ content, photos }, i, reviews) => ({
            ...reviews[i],
            content: content.slice(0, 300),
            photos: photos.slice(0, 1),
          }))
      );
    },

    default: () => {
      // log the request and respond with 406
      res.status(406).send('Not Acceptable');
    },
  });
};
