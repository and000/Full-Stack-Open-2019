import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import style from '../css/Blog.module.scss'

import cx from 'classnames'

const Blog = ({ blog, handleLike, handleRemove, currentuser }) => {
  const [extended, setExtended] = useState(false)

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
          <Link to={`/blogs/${blog.id}`} id={blog.id}>
            {blog.title} {blog.author}
          </Link>
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

  return (
    <div
      className={cx(
        style.blog,
        {
          [style.highlighted]: blog.title.length > 8
        },
        {
          [style.maximized]: extended
        }
      )}
    >
      {extended ? Maximized() : Minimized()}
    </div>
  )
}

export default Blog
