const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_demo_app');

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('secret', (req, res) => {
  res.render('secret');
});
app.listen(process.env.PORT, process.env.IP, () => {
  console.log('server started ..');
});