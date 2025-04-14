const Blog = require("../models/blogs");
const User = require("../models/users");
const bcrypt = require("bcrypt");

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
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};
const createUser = async (username, name, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ username, name, passwordHash });
  return await user.save();
};

module.exports = {
  initialPosts,
  blogsInDB,
  usersInDB,
  createUser,
};
