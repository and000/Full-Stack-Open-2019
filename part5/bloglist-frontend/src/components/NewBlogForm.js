import React, { useState } from 'react'

const NewBlogForm = ({ handleNewFormSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = event => {
    event.preventDefault()

    handleNewFormSubmit(event, title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => {
            setTitle(target.value)
          }}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => {
            setAuthor(target.value)
          }}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="title"
          onChange={({ target }) => {
            setUrl(target.value)
          }}
        />
      </div>

      <button type="submit">create</button>
    </form>
  )
}

export default NewBlogForm
