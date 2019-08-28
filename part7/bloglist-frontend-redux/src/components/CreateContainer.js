import React from 'react'

import Togglable from './Togglable'
import NewBlogForm from './NewBlogForm'
import { connect } from 'react-redux'
import { createNewBlog } from '../reducers/blogReducer'

import { setNotification } from '../reducers/notificationReducer'

const BlogList = props => {
  const newBlogFormRef = React.createRef()

  const handleNewFormSubmit = async (event, title, author, url) => {
    event.preventDefault()

    try {
      props.createNewBlog(title, author, url, props.user)
      props.setNotification(`a new blog ${title} by ${author} added`, 'green')

      newBlogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log('EXCEPTION', error)
      props.setNotification(error.message, 'red')
    }
  }

  return (
    <>
      <Togglable buttonLabel="create new" ref={newBlogFormRef}>
        <NewBlogForm handleNewFormSubmit={handleNewFormSubmit} />
      </Togglable>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  createNewBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
