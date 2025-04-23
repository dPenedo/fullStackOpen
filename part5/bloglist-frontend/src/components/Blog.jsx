import { useState } from "react";
import { likeABlog, deleteABlog } from "../logic/blogHandlers";

const Blog = ({ user, blog, setBlogs, setErrorMessage, setNotification }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const deleteButtonStyle = {
        backgroundColor: '#e9999f',
        padding: 4,
        borderRadius: 6

    }
    const [visibility, setVisibility] = useState(false)

    const handleVisibilityClick = () => {
        setVisibility(!visibility)
    }

    const handleLikeClick = async (event) => {
        event.preventDefault()
        await likeABlog({ blog, setBlogs, setErrorMessage, setNotification })
    }
    const handleDeleteButton = async (event) => {
        event.preventDefault()
        if (window.confirm("Do you really want to delete it?")) {
            await deleteABlog({ blog, setBlogs, setErrorMessage, setNotification })
        }
    }


    return (
        <div style={blogStyle}>
            <div><b>Title: </b>{blog.title} <button onClick={handleVisibilityClick}>{visibility ? 'hide' : 'show'}</button>
            </div>
            {visibility &&
                <div>
                    <div><b>Author: </b>
                        {blog.author}
                    </div>
                    <div><b>URL: </b>
                        {blog.url}
                    </div>
                    <div><b>Likes: </b>
                        {blog.likes} <button onClick={handleLikeClick}>Like</button>
                    </div>
                    {user.user && blog.user === user.user ?
                        <button style={deleteButtonStyle} onClick={handleDeleteButton}>Delete</button> : <></>
                    }
                </div>
            }
        </div>
    )
}

export default Blog;

