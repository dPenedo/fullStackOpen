const blogForm = (createBlog, newBlog, handleBlogChange) => {
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

export default blogForm
