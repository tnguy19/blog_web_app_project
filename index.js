import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
  posts = [];
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  if (req.body.postTitle && req.body.subTitle && req.body.postContent){
    posts.push(req.body);
  }
  console.log(posts);
  res.render("index.ejs", {
    posts: posts
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});