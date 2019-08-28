import React, { useState } from 'react'

import { connect } from 'react-redux'
import { likeBlog, removeBlog, addComment } from '../reducers/blogReducer'

const BlogView = props => {
  const blog = props.blog

  const [commentFormText, setCommentFormText] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    props.addComment(commentFormText, blog).then(setCommentFormText(''))
  }

  if (!blog) {
    return null
  }
  return (
    <>
      <h3>{blog.title}</h3>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes{' '}
        <button onClick={() => props.likeBlog(blog)}>like</button>
      </div>
      <div>{blog.author}</div>
      <div>added by {blog.user.name}</div>

      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={commentFormText}
          onChange={event => setCommentFormText(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>

      {blog.comments &&
        blog.comments.map(comment => {
          return (
            <li key={comment.date}>
              {comment.text}, {comment.date}
            </li>
          )
        })}
    </>
  )
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
  addComment
}
// ! own PROPS workflow --> to be Documented!! -> see app.js for passed parameter!
const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(blog => blog.id === ownProps.blog.id)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)
