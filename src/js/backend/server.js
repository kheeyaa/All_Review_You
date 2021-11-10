require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const reviewRouter = require('./routers/reviewRouter');
const searchRouter = require('./routers/searchRouter');

const app = express();

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter);
app.use('/search', searchRouter);

// ROUTER
app.get('/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../template/mypage.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
