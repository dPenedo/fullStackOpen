const BlogForm = ({ createBlog, newBlog, handleBlogChange }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("Creating...")
        createBlog(newBlog)
    }
    return (
        <div>
            <h3>Create a new blog</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:
                    <input
                        data-testid="test-input-title"
                        type="text"
                        value={newBlog.title}
                        name="title"
                        onChange={handleBlogChange}
                    />
                </div>
                <div>
                    Author:
                    <input
                        data-testid="test-input-author"
                        type="text"
                        value={newBlog.author}
                        name="author"
                        onChange={handleBlogChange}
                    />
                </div>
                <div>
                    URL:
                    <input
                        data-testid="test-input-url"
                        type="text"
                        value={newBlog.url}
                        name="url"
                        onChange={handleBlogChange}
                    />
                </div>
                <button data-testid="test-create-button" type="submit">Create it</button>
            </form>
        </div>
    );
};

export default BlogForm
