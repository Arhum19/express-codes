const posts = [
  { id: "1", title: "First Post" },
  { id: "2", title: "Second Post" },
];
const postrouter = require("express").Router();
postrouter.get("/", (req, res) => {
  res.json(posts);
});
postrouter.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  res.json(post);
});
postrouter.post("/", (req, res) => {
  const newPost = {
    id: (posts.length + 1).toString(),
    title: req.body.title,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});
module.exports = postrouter;
