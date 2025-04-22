import Blog from "./Blog";

const blogList = (blogs) => {
    return (
        <div>
            <h2>Blog list</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default blogList
