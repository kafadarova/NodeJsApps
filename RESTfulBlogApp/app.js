const bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  express = require('express'),
  app = express();

// App Config
mongoose.connect('mongodb://localhost/restfull_blog_app', {
  useNewUrlParser: true,
  useFindAndModify: false
});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

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

// CREATE Route
app.post('/blogs', function(req,res) {
  // create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if (err) {
      res.render('new');
    } else {
      // then redirect to the index
      res.redirect('/blogs');
    }
  })
});

// SHOW Route
app.get('/blogs/:id', function(req,res){
  Blog.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  }) 
});

// EDIT Route
app.get('/blogs/:id/edit', (req,res) => {
  Blog.findById(req.params.id, (err,foundBlog) => {
    if (err) {
      res.redirect('/blog');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  })
});

// UPDATE Route
app.put('/blogs/:id', (req,res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if (err) {
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});


const port = process.env.port || 3000;

app.listen(port,() => {
     console.log('SERVER IS RUNNING!');
});