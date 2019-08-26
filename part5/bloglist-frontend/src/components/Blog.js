import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, currentuser }) => {
  const [extended, setExtended] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const Minimized = () => {
    return (
      <div onClick={() => setExtended(!extended)}>
        {blog.title} {blog.author}
      </div>
    )
  }
  const Maximized = () => {
    console.log(currentuser)
    console.log(blog)
    return (
      <>
        <div onClick={() => setExtended(!extended)}>
          {blog.title} {blog.author}
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes{' '}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>

        {currentuser.username === blog.user.username ? (
          <div>
            <button onClick={() => handleRemove(blog)}>REMOVE</button>
          </div>
        ) : (
          ''
        )}
      </>
    )
  }

  return <div style={blogStyle}>{extended ? Maximized() : Minimized()}</div>
}

export default Blog
