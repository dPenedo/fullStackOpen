import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import loginForm from "./components/LoginForm";
import manageSession from "./components/ManageSession";
import { handleLogin, handleLogout } from "./logic/authHandlers";
import { createBlog, handleBlogChange } from "./logic/blogHandlers";
import NotificationMessage from "./components/NotificationMessage";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLoginWrapper = (event) => {
    handleLogin({
      event,
      username,
      password,
      setUser,
      setUsername,
      setPassword,
      setErrorMessage,
    });
  };

  const handleLogoutWrapper = () => {
    handleLogout({ setUser, setUsername, setPassword, setErrorMessage });
  };

  const handleBlogChangeWrapper = (event) => {
    handleBlogChange({ event, setNewBlog, newBlog });
  };

  const createBlogWrapper = () => {
    createBlog({
      newBlog,
      blogs,
      setBlogs,
      setNewBlog,
      setErrorMessage,
      setNotification,
      blogFormRef,
    });
  };

  return (
    <div>
      <h1>Blogs App</h1>
      <NotificationMessage
        notification={notification}
        errorMessage={errorMessage}
      />

      {user === null ? (
        loginForm(
          handleLoginWrapper,
          username,
          setUsername,
          password,
          setPassword,
        )
      ) : (
        <div>
          {manageSession(user, handleLogoutWrapper)}
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlogWrapper}
              newBlog={newBlog}
              handleBlogChange={handleBlogChangeWrapper}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            user={user}
            setBlogs={setBlogs}
            setNotification={setNotification}
            setErrorMessage={setErrorMessage}
          />
        </div>
      )}
    </div>
  );
};

export default App;
