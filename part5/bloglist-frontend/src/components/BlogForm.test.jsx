import { render, screen } from '@testing-library/react'
import BlogForm from "./BlogForm"
import userEvent from '@testing-library/user-event'

test('Al crear un nuevo blog, se llama a las funciones recibidas por los props', async () => {

    const createBlog = vi.fn()
    const newBlog = { title: 'unTituloDeTest', author: 'unAuthorDeTest', url: 'unaURLDeTest' }
    const handleBlogChange = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} newBlog={newBlog} handleBlogChange={handleBlogChange} />)

    const titleInput = screen.getByTestId("test-input-title")
    const authorInput = screen.getByTestId("test-input-author")
    const urlInput = screen.getByTestId("test-input-url")
    const createButton = screen.getByTestId("test-create-button")

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(createButton)
    screen.debug()
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(handleBlogChange.mock.calls).toHaveLength(40)
    expect(createBlog).toHaveBeenCalledWith(newBlog)
})
