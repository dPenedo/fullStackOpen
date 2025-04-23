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
        if (!user) {
            return response.status(401).json({ error: "Unauthorized: not logged in" });
        }

        if (!blog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        if (blog.user.toString() !== user.id.toString()) {
            return response.status(403).json({ error: "Forbidden: not the creator" });
        }

        const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
        console.log("deletedBlog => ", deletedBlog);
        response.status(204).json(deletedBlog);
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
    console.log("put")
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
    console.log("updatedBlog => ", updatedBlog);
    response.status(202).json(updatedBlog);
});

module.exports = blogsRouter;
