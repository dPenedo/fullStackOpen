import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ "title": "", "author": "", "url": "" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const user = await loginService.login({
                username,
                password,
            });
            window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername("");
            setPassword("");
        } catch (exception) {
            setErrorMessage("Wrong credential");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };
    const handleLogout = async (event) => {
        try {
            window.localStorage.removeItem("loggedBlogAppUser")
            setUser(null)
            setUsername("");
            setPassword("");
            console.log("Logout")
        } catch (exception) {
            setErrorMessage("Error on Logout");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleBlogChange = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })
    };

    const loginForm = () => {
        return (
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        type="text"
                        value={username}
                        name="username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    Password
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        );
    };

    const createBlog = async (event) => {
        event.preventDefault()
        console.log("creating...")
        try {
            const { title, author, url } = newBlog
            const blog = await blogService.create({
                title,
                author,
                url
            })
            console.log("NewBlog => ", blog);
            setNewBlog({ title: "", author: "", url: "", })
            setBlogs(blogs.concat(blog))
        } catch (exception) {
            console.error(exception)
            setErrorMessage("Error creating the blog");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }

    }


    const blogForm = () => {
        return (
            <div>
                <h3>Create a new blog</h3>
                <form onSubmit={createBlog}>
                    <div>
                        Title:
                        <input
                            type="text"
                            value={newBlog.title}
                            name="title"
                            onChange={handleBlogChange}
                        />
                    </div>
                    <div>
                        Author:
                        <input
                            type="text"
                            value={newBlog.author}
                            name="author"
                            onChange={handleBlogChange}
                        />
                    </div>
                    <div>
                        URL:
                        <input
                            type="text"
                            value={newBlog.url}
                            name="url"
                            onChange={handleBlogChange}
                        />
                    </div>
                    <button type="submit">Create it</button>
                </form>
            </div>
        );
    };
    const blogList = () => {
        return (
            <div>
                <h2>Blog list</h2>
                {blogs.map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                ))}
            </div>
        );
    };
    const manageSession = () => {
        return (
            <div>
                <p>
                    Username: <b>{user.username}</b>
                </p>
                <button onClick={handleLogout} type="button">Logout</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Blogs App</h1>

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    {manageSession()}
                    {blogForm()}
                    {blogList()}
                </div>
            )}
        </div>
    );
};

export default App;

