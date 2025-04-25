import blogService from "../services/blogs";

export const handleBlogChange = ({ event, setNewBlog, newBlog }) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
};

export const createBlog = async ({ newBlog, blogs, setBlogs, setNewBlog, setErrorMessage, setNotification, blogFormRef }) => {
    console.log("creating...")
    try {
        const { title, author, url } = newBlog
        const blog = await blogService.create({
            title,
            author,
            url
        })
        console.log("NewBlog => ", blog);
        blogFormRef.current.toggleVisibility()
        const notificationText = "A new blog added by: " + blog.author + ": " + blog.title
        setNotification(notificationText)

        setTimeout(() => {
            setNotification(null);
        }, 5000);
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

export const likeABlog = async ({ blog, setBlogs, setErrorMessage, setNotification }) => {
    try {
        console.log("Liked")
        const likes = blog.likes
        const newBlog = { ...blog, likes: likes + 1 }
        const notificationText = blog.title + " liked"
        const returnedBlog = await blogService.update(blog.id, newBlog)
        setBlogs(prevBlogs => prevBlogs.map(b => b.id === blog.id ? returnedBlog : b))
        setNotification(notificationText)

        setTimeout(() => {
            setNotification(null);
        }, 5000);
    } catch (exception) {
        console.error(exception)
        setErrorMessage("Error liking the blog");
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }
}

export const deleteABlog = async ({ blog, setBlogs, setErrorMessage, setNotification }) => {
    try {
        console.log("Delete")
        await blogService.deleteBlog(blog.id)
        const notificationText = blog.title + " deleted"
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id))
        setNotification(notificationText)

        setTimeout(() => {
            setNotification(null);
        }, 5000);

    } catch (exception) {
        console.error(exception)
        setErrorMessage("Error deleting the blog");
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);

    }
}
