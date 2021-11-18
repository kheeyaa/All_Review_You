require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');
const mypageRouter = require('./routers/mypageRouter');
const searchRouter = require('./routers/searchRouter');
const editorRouter = require('./routers/editorRouter');
const reEditorRouter = require('./routers/reEditorRouter');

const { jwtMiddleware } = require('./middleware.js');

app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(jwtMiddleware);

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/mypage', mypageRouter);
app.use('/search', searchRouter);
app.use('/write', editorRouter);
app.use('/edit', reEditorRouter);

const { sendHtml } = require('./controllers/sendHtml');

app.get('/latest', (req, res) => {
  sendHtml('index', res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
