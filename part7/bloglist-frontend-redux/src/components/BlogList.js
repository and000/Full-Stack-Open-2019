import React from 'react'

import Blog from './Blog'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

import { setNotification } from '../reducers/notificationReducer'

// import styles from '../css/BlogList.module.css'

const BlogList = props => {
  const handleLike = async blog => {
    try {
      props.likeBlog(blog)
      props.setNotification(`you liked ${blog.title}`, 'green')
    } catch (error) {
      console.log(error)
      props.setNotification(error.message, 'red')
    }
  }
  const handleRemove = async blog => {
    if (window.confirm(`really delete ${blog.title}??`)) {
      console.log(blog)
      try {
        await props.removeBlog(blog)
        props.setNotification(`successfully removed ${blog.title}`, 'green')
      } catch (error) {
        console.log(error)
        props.setNotification(error.message, 'red')
      }
    }
  }

  return (
    <>
      {props.blogs.map(blog => (
        <Blog
          key={blog.id}
          id={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          currentuser={props.user}
          // className={styles.blogstyle}
        />
      ))}
    </>
  )
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  setNotification
}

const blogsToShow = ({ blogs }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return blogs
}

const mapStateToProps = state => {
  return {
    blogs: blogsToShow(state),
    notification: state.notification,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
