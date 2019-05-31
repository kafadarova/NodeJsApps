const bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  express = require('express'),
  app = express();

// App Config
mongoose.connect('mongodb://localhost/restfull_blog_app', {
  useNewUrlParser: true
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose/model config
const blogScema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});
const Blog = mongoose.model('Blog', blogScema)

// RESTful routes


app.listen(process.env.PORT, process.env.IP, function() {
  console.log('SERVER IS RUNNING!');
})