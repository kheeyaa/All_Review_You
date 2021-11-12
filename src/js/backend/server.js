require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');

const searchRouter = require('./routers/searchRouter');
const { checkLoggedIn, jwtMiddleware } = require('./middleware.js');

// 웹팩 옵션을 webpack() 함수 인자로 넘겨 compiler를 얻는다
const compiler = webpack(require('../../../webpack.config'));

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/search', searchRouter);
app.use(middleware(compiler));

// const PORT = process.env.PORT || 3000;
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
