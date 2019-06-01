const bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  express = require('express'),
  app = express();

// App Config
mongoose.connect('mongodb://localhost/restfull_blog_app', {
  useNewUrlParser: true
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

// mongoose/model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {
    type: Date,
    default: Date.now
  }
});
const Blog = mongoose.model('Blog', blogSchema);

// RESTful routes
app.get('/', (req,res) => {
  res.redirect('/blogs');
});

// INDEX Router
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log('Error!');
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// NEW Route
app.get('/blogs/new', function(req,res) {
  res.render('new');
});

const port = process.env.port || 3000;

app.listen(port,() => {
     console.log('SERVER IS RUNNING!');
});