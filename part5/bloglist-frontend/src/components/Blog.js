import React, { useState } from 'react'
const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible);
  }

  return (
    <div className="blog" onClick={toggleVisibility}>
      {blog.title} {blog.author}
      {visible && (
        <div>
          {blog.url}<br />
          {blog.likes} likes
          <button type="button">like </button><br />
          added by {blog.user.name}
        </div>
      )}
    </div>
  )
}

export default Blog