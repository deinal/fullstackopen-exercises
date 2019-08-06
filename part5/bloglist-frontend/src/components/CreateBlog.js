import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({ user, blogs, setBlogs, setNotificationMessage, setNotificationType }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
      user: user.id
    }

    const newBlog = await blogService.create(blogObject)
    try {
      setBlogs(blogs.concat(newBlog))
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
      setNotificationType('notification')
      setNotificationMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      setNotificationType('error')
      setNotificationMessage(`failed to add blog ${newBlog.title} by ${newBlog.author}`)
    } finally {
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        author:
          <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        url:
          <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )

}

export default CreateBlog