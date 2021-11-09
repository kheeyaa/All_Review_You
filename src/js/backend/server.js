require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');
const commentRouter = require('./routers/commentRouter');

const app = express();

app.use(express.static('src'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/comments', commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
