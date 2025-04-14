const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const blog = new Blog({
    title: body.title,
    author: body.author === undefined ? false : body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;
    if (blog.user.toString() === user.id.toString()) {
      console.log("blog.user.toString()", blog.user.toString());
      console.log("user.id.toString()", user.id.toString());
      await Blog.findByIdAndDelete(request.params.id);
      response.status(202).end();
    } else if (!user) {
      response.status(401).json({ error: "Not logged" });
    } else if (blog.user.toString() !== user.id.toString()) {
      response
        .status(401)
        .json({ error: "Logged user must be the same that blog creator" });
    } else {
      response.status(401).json({ error: "Unknown error" });
    }
  },
);

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  response.status(202).end();
});

module.exports = blogsRouter;
