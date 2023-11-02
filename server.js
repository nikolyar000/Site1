const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://N1kolaenko:<N1kolaenko_228>@pasha0.jdmgxdh.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(db,)
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.static('photos'));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('styles'));

const { MongoClient } = require('mongodb');

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'YouTube', link: 'http://youtube.com/YauhenKavalchuk' },
    { name: 'Twitter', link: 'http://github.com/YauhenKavalchuk' },
    { name: 'GitHub', link: 'http://twitter.com/YauhenKavalchuk' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const post = {
    id: '1', 
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '05.05.2021',
    author: 'Yauhen',
  };
  res.render(createPath('post'), { title, post});
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = {
    id: '1', 
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    title: 'Post title',
    date: '05.05.2021',
    author: 'Yauhen',
  };
  res.render(createPath('posts'), { title, posts});
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: (new Date()).toLocaleDateString(),
    title,
    author,
    text,
  };
  res.render(createPath('post'), { post, title });
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});

app.get('/exterier', (req, res) => {
  const title = 'Exterier';
  res.render(createPath('exterier'), { title });
});

app.get('/interier', (req, res) => {
  const title = 'Interier';
  res.render(createPath('interier'), { title });
});

app.get('/otherjobs', (req, res) => {
  const title = 'Other';
  res.render(createPath('otherjobs'), { title });
});

app.get('/about', (req, res) => {
  const title = 'About';
  res.render(createPath('about'), { title });
});

app.get('/intro', (req, res) => {
  const title = 'Intro';
  res.render(createPath('index'), { title });
});

app.get('/index', (req, res) => {
  const title = 'Index';
  res.render(createPath('intro'), { title });
});

app.get('/skills', (req, res) => {
  const title = 'Skills';
  res.render(createPath('skills'), { title });
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
