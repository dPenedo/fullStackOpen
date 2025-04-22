import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import blogForm from "./components/BlogForm";
import blogList from "./components/BlogList";
import loginForm from "./components/LoginForm";
import manageSession from "./components/ManageSession";
import { handleLogin, handleLogout } from "./logic/authHandlers";
import { createBlog, handleBlogChange } from "./logic/blogHandlers";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ "title": "", "author": "", "url": "" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLoginWrapper = (event) => {
        handleLogin({ event, username, password, setUser, setUsername, setPassword, setErrorMessage })
    }

    const handleLogoutWrapper = () => {
        handleLogout({ setUser, setUsername, setPassword, setErrorMessage })
    }

    const handleBlogChangeWrapper = (event) => {
        handleBlogChange({ event, setNewBlog, newBlog })
    }

    const createBlogWrapper = (event) => {
        createBlog({ event, newBlog, blogs, setBlogs, setNewBlog, setErrorMessage })

    }

    const NotificationMessage = () => {
        return (
            <div>
                {notification === null ? (
                    <div>
                    </div>
                ) : (
                    <div>
                        {notification}
                    </div>
                )}
            </div>
        )
    }






    return (
        <div>
            <h1>Blogs App</h1>
            <NotificationMessage />

            {user === null ? (
                loginForm(handleLoginWrapper, username, setUsername, password, setPassword)
            ) : (
                <div>
                    {manageSession(user, handleLogoutWrapper)}
                    {blogForm(createBlogWrapper, newBlog, handleBlogChangeWrapper)}
                    {blogList(blogs)}
                </div>
            )}
        </div>
    );
};

export default App;

