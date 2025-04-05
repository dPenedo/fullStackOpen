const Blog = require("../models/blogs");
const User = require("../models/users")

const initialPosts = [
  {
    title: "laguagua es la movida",
    author: "uno",
    url: "http://laweb.com",
    likes: 3,
  },
  {
    title: "otra cosa",
    author: "un Autor",
    url: "http://laweb.com",
    likes: 5,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialPosts,
  blogsInDB,
  usersInDB
};
