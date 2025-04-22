import blogService from "../services/blogs";

export const handleBlogChange = ({ event, setNewBlog, newBlog }) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
};

export const createBlog = async ({ event, newBlog, blogs, setBlogs, setNewBlog, setErrorMessage }) => {
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
        // TODO: notificacion
        setNewBlog({ title: "", author: "", url: "", })
        setBlogs(blogs.concat(blog))
    } catch (exception) {
        console.error(exception)
        // TODO: notificacion
        setErrorMessage("Error creating the blog");
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    }

}
