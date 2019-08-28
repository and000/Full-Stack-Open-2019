import React from 'react'

const User = ({ user }) => {
  if (!user) {
    return null
  }
  return (
    <>
      <h3>{user.name}</h3>
      <ul>
        <h4>added blogs</h4>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
