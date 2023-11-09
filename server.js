const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Post = require('./models/post');
const puppeteer = require('puppeteer');

const app = express();

app.set("view engine", "ejs");

const PORT = 3000;
const db = "mongodb+srv://pubgya845:Pass321@cluster0.5zkyv6d.mongodb.net/node-blog?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then((res) => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, "ejs-views", `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.static("photos"));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use(express.urlencoded({ extended: false }));

app.use(express.static("styles"));

app.use(methodOverride('_method'));

const { MongoClient } = require("mongodb");

app.get("/", (req, res) => {
  const title = "Home";
  res.render(createPath("index"), { title });
});

app.get("/contacts", (req, res) => {
  const title = "Contacts";
  const contacts = [
    { name: "YouTube", link: "http://youtube.com/YauhenKavalchuk" },
    { name: "Twitter", link: "http://github.com/YauhenKavalchuk" },
    { name: "GitHub", link: "http://twitter.com/YauhenKavalchuk" },
  ];
  res.render(createPath("contacts"), { contacts, title });
});

app.get("/posts/:id", (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.delete('/posts/:id', (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get('/edit/:id', (req, res) => {
  const title = 'Edit Post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.put('/edit/:id', (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then((result) => res.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.get("/posts", (req, res) => {
  const title = "Posts";
  Post
    .find()
    .sort({ createdAt: -1 })
    .then((posts) => res.render(createPath('posts'), { posts, title }))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

app.post("/add-post", (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => res.redirect('/posts'))
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    })
});

app.get("/add-post", (req, res) => {
  const title = "Add Post";
  res.render(createPath("add-post"), { title });
});

app.get("/exterier", (req, res) => {
  const title = "Exterier";
  res.render(createPath("exterier"), { title });
});

app.get("/interier", (req, res) => {
  const title = "Interier";
  res.render(createPath("interier"), { title });
});

app.get("/otherjobs", (req, res) => {
  const title = "Other";
  res.render(createPath("otherjobs"), { title });
});

app.get("/about", (req, res) => {
  const title = "About";
  res.render(createPath("about"), { title });
});

app.get("/intro", (req, res) => {
  const title = "Intro";
  res.render(createPath("index"), { title });
});

app.get("/index", (req, res) => {
  const title = "Index";
  res.render(createPath("intro"), { title });
});

app.get("/skills", (req, res) => {
  const title = "Skills";
  res.render(createPath("skills"), { title });
});

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render(createPath("error"), { title });
});
