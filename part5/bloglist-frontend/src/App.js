import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const BlogList = ({ blogs, user, handleLike, handleDelete }) => {
  return blogs
    // .filter(blog => {
    //   return blog.user.username === user.username || blog.user.id === user.id
    // })
    .sort((a, b) => b.likes - a.likes)
    .map(blog => (
      <Blog blog={blog} key={blog.id} handleLike={handleLike} handleDelete={handleDelete} />
    ))
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationType('error')
      setNotificationMessage(`wrong username or password`)
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('blogUser')
  }

  const handleLike = async blog => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const id = blog.id
    try {
      await blogService.update(updatedBlog, id)
      setBlogs(
        blogs.map(blog => {
          return blog.id !== id ? blog : { ...blog, likes: blog.likes + 1 }
        })
      )
    } catch (error) {
      setNotificationType('error')
      setNotificationMessage(`failed to like blog ${blog.title} by ${blog.author}`)
      setTimeout(() => { setNotificationMessage(null) }, 5000)
    }
  }

  const handleDelete = async blog => {
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      const id = blog.id
      try {
        await blogService.remove(id)
        setBlogs(
          blogs.filter(blog => blog.id !== id)
        )
      } catch (error) {
        setNotificationType('error')
        setNotificationMessage(`failed to remove blog ${blog.title} by ${blog.author}`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
      }
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog">
        <CreateBlog
          user={user}
          logs={blogs}
          setBlogs={setBlogs}
          setNotificationMessage={setNotificationMessage}
          setNotificationType={setNotificationType} />
      </Togglable>
      <BlogList blogs={blogs} user={user} handleLike={handleLike} handleDelete={handleDelete} />
    </div>
  )
}

export default App
