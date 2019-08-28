import blogService from '../services/blogs'

export const setToken = token => {
  blogService.setToken(token)

  return async dispatch => {
    dispatch({
      type: 'TOKEN_SET'
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = blog => {
  const changedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  return async dispatch => {
    const response = await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: response
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)

    dispatch({
      type: 'REMOVE_BLOG',
      data: blog.id
    })
  }
}

export const createNewBlog = (title, author, url, user) => {
  const blog = {
    title: title,
    author: author,
    url: url,
    user: user.id
  }
  return async dispatch => {
    const newBlog = await blogService.create(blog)

    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const addComment = (text, blog) => {
  console.log('BLOG', blog)
  return async dispatch => {
    const newBlog = await blogService.addComment(blog.id, text)

    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data

  case 'UPDATE_BLOG': {
    const id = action.data.id

    return state.map(blog => (blog.id !== id ? blog : action.data))
  }
  case 'REMOVE_BLOG': {
    const id = action.data

    return state.filter(blog => blog.id !== id)
  }
  case 'ADD_BLOG': {
    return [...state, action.data]
  }

  default:
    return state
  }
}

export default blogReducer
