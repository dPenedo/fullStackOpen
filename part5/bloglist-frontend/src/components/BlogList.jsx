import Blog from "./Blog";

const BlogList = ({ user, blogs, setBlogs, setNotification, setErrorMessage }) => {
    return (
        <div>
            <h2>Blog list</h2>
            {blogs.sort((a, b) => b.likes - a.likes).map((blog) => (
                <Blog
                    key={blog.id} blog={blog}
                    user={user}
                    setBlogs={setBlogs}
                    setNotification={setNotification}
                    setErrorMessage={setErrorMessage} />
            ))}
        </div>
    );
};

export default BlogList
