import React, { useState } from 'react'
const Blog = ({ user, blog, handleLike, handleDelete }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const showDelete = user.name == blog.user.name

  return (
    <div className="blog" onClick={toggleVisibility}>
      {blog.title} {blog.author}
      {visible && (
        <div>
          {blog.url}<br />
          {blog.likes} likes
          <button type="button" onClick={() => handleLike(blog)}>like </button><br />
          added by {blog.user.name}<br />
          {showDelete && (
            <button type="button" onClick={() => handleDelete(blog)}>remove </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog