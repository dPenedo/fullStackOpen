import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect } from 'vitest'


let blog
let mockSetBlogs
let mockSetNotification
let mockSetErrorMessage
let mockHandler
let user
beforeEach(async () => {
    blog = {
        title: "unTitulo",
        id: 123,
        author: "unAutor",
        url: "unaURL",
        likes: 12

    }

    mockSetBlogs = vi.fn()
    mockSetNotification = vi.fn()
    mockSetErrorMessage = vi.fn()
    mockHandler = vi.fn()
    user = userEvent.setup()
})
test('Muestra titulo del blog', async () => {
    const { container } = render(
        <Blog
            blog={blog}
            user={user}
            setBlogs={mockSetBlogs}
            setNotification={mockSetNotification}
            setErrorMessage={mockSetErrorMessage}
        />
    )

    const element = screen.getByText("unTitulo")
    expect(element).toBeDefined()
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent("unTitulo")
})
test('Se muestra la url y el numero de likes al pulsar en show', async () => {

    const { container } = render(
        <Blog
            blog={blog}
            user={user}
            setBlogs={mockSetBlogs}
            setNotification={mockSetNotification}
            setErrorMessage={mockSetErrorMessage}
        />
    )
    const button = screen.getByText('show')
    await user.click(button)
    const blogURLElement = screen.getByTestId('blog-url')
    expect(blogURLElement).toHaveTextContent('unaURL')
    const blogLikesElement = screen.getByTestId('blog-likes')
    expect(blogLikesElement).toHaveTextContent('12')
})
test('si se hace clic dos veces en el botón like, se likea 2 veces', async () => {
    const { rerender } = render(
        <Blog
            blog={blog}
            user={user}
            setBlogs={mockSetBlogs}
            setNotification={mockSetNotification}
            setErrorMessage={mockSetErrorMessage}
        />
    )

    const showButton = screen.getByText('show')
    await user.click(showButton)

    const likeButton = screen.getByTestId('button-like')
    await user.click(likeButton)
    await user.click(likeButton)

    const updatedBlog = { ...blog, likes: blog.likes + 2 }

    rerender(
        <Blog
            blog={updatedBlog}
            user={user}
            setBlogs={mockSetBlogs}
            setNotification={mockSetNotification}
            setErrorMessage={mockSetErrorMessage}
        />
    )

    expect(screen.getByText('14')).toBeDefined()
    // TODO: También hay que comprobar que se le llama 2 veces

})
