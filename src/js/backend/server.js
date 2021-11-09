require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const comment = require('./models/Comment');
const user = require('./models/User');
const review = require('./models/Review');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// AUTH
app.post('/auth/signin', (req, res) => {});
app.post('/auth/signup', (req, res) => {});
app.get('/auth/logout', (req, res) => {});

// USERS
app.get('/users/:id', (req, res) => {});
app.post('/users', (req, res) => {});

// REVIEWS
app.get('/reviews', (req, res) => {});
app.get('/reviews/:id', (req, res) => {});
// app.get('/reviews?', (req, res) => {});
app.post('/reviews', (req, res) => {});
app.patch('/reviews/:id', (req, res) => {});
app.put('/reviews/:id', (req, res) => {});
app.delete('/reviews/:id', (req, res) => {});

// COMMNETS
app.get('/comments/:id', (req, res) => {});
app.post('/comments/:id', (req, res) => {});
app.put('/comments/:id', (req, res) => {});
app.delete('/comments/:id', (req, res) => {});

// ROUTER
app.get('/mypage', (req, res) => {
  res.sendFile(path.join(__dirname, '/../../template/mypage.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
