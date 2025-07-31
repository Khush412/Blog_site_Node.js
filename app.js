import express from 'express';
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const posts = [];

app.get('/', (req, res) => {
  res.render('index', { activePage: 'home' });
});

app.get('/blog', (req, res) => {
  res.render('blog', { posts, activePage: 'blog' });
});

app.post('/post', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/blog');
});

app.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  const post = posts[id];
  if (post) {
    res.render('edit', { post, id, activePage: 'blog' });
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/edit/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  if (posts[id]) {
    posts[id] = { title, content };
    res.redirect('/blog');
  } else {
    res.status(404).send('Post not found');
  }
});

app.post('/delete/:id', (req, res) => {
  const id = req.params.id;
  if (posts[id]) {
    posts.splice(id, 1);
    res.redirect('/blog');
  } else {
    res.status(404).send('Post not found');
  }
});

app.get('/about', (req, res) => {
  res.render('about', { activePage: 'about' });
});
app.get('/contact', (req, res) => {
  res.render('contact', { activePage: 'contact' });
});

app.get('/login', (req, res) => {
    res.render('login',{ activePage: 'login' })
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
