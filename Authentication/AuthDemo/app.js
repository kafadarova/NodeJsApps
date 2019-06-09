const express = requires('express');

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  res.render('home');
})