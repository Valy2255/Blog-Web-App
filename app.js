const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let posts = []; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('layout', {
    title: 'Home',
    body: 'home',
    posts, 
  });
});

app.get('/new', (req, res) => {
  res.render('layout', {
    title: 'New Post',
    body: 'post',
  });
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const id = Date.now().toString(); 
  posts.push({ id, title, content });
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id); 
  if (!post) {
    return res.status(404).send('Post not found'); 
  }
  res.render('layout', {
    title: 'Edit Post',
    body: 'edit',
    post, 
  });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = posts.find(p => p.id === id);
  post.title = title;
  post.content = content;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
