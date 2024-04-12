import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  //console.log(req.body)
  res.render("index.ejs", {
    posts: posts
  });
});

app.post("/submit", (req, res) => {
  //console.log(req.body);
  if (req.body.postTitle && req.body.subTitle && req.body.postContent) {
      const newPost = {
          id: Date.now().toString(), 
          postTitle: req.body.postTitle,
          subTitle: req.body.subTitle,
          postContent: req.body.postContent
      };
      posts.push(newPost);
  }
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    res.render("edit.ejs", { post: posts[postIndex] });
  } else {
    res.send("Post not found");
  }
});

app.post("/edit/:id", (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex].postTitle = updatedPost.postTitle;
    posts[postIndex].subTitle = updatedPost.subTitle;
    posts[postIndex].postContent = updatedPost.postContent;
      res.redirect("/");
  } else {
    res.send("Post not found");
  }
});

app.post("/delete/:id", (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
    res.redirect("/");
    res.redirect("/");
  } else {
    res.send("Post not found");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  //console.log(posts);
});