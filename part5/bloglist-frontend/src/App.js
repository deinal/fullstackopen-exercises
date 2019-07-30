import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'

const BlogList = ({ blogs, user }) => {
  return blogs
    .filter(blog => {
      return blog.user.username === user.username || blog.user.id === user.id
    })
    .map(blog => (
      <Blog blog={blog} key={blog.id} />
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notificationMessage} type={notificationType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <p>{user.name} logged in <button onClick={handleLogout}>Log out</button></p>
      <h2>create new</h2>
      <CreateBlog user={user} blogs={blogs} setBlogs={setBlogs} setNotificationMessage={setNotificationMessage} setNotificationType={setNotificationType} />
      <BlogList blogs={blogs} user={user} />
    </div>
  )
}

export default App
