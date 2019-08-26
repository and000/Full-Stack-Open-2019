import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])

  //const [showAll, setShowAll] = useState(true);
  //const [errorMessage, setErrorMessage] = useState(null);
  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const username = useField('text')
  const password = useField('password')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    console.log('HELLO LOGIN')

    console.log(username)

    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)

      console.log(user)
      //setUsername('')
      //setPassword('')
      username.onReset()
      password.onReset()
    } catch (exception) {
      setNotification('Wrong credentials')
      setNotificationColor('red')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async blog => {
    //console.log("clicked liker");

    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    console.log(changedBlog)
    try {
      const response = await blogService.update(blog.id, changedBlog)
      //console.log(response);
      setBlogs(blogs.map(blog => (blog.id !== response.id ? blog : response)))
    } catch (error) {
      console.log(error)

      setNotification(error.message)
      setNotificationColor('red')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }
  const handleRemove = async blog => {
    //console.log("clicked liker");

    if (window.confirm(`really delete ${blog.title}??`)) {
      console.log(blog)
      try {
        const response = await blogService.remove(blog.id)
        console.log(response)

        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        console.log(error)

        setNotification(error.message)
        setNotificationColor('red')
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      }
    }
  }

  const newBlogFormRef = React.createRef()

  const handleNewFormSubmit = async (event, title, author, url) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const newBlogResponse = await blogService.create(newBlog)
      //console.log (response);

      // needs to be called before changing state! otherwise ref will be false!
      newBlogFormRef.current.toggleVisibility()

      setBlogs([...blogs, newBlogResponse])

      setNotification(
        `a new blog ${newBlogResponse.title} by ${newBlogResponse.author} added`
      )
      setNotificationColor('green')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      console.log('EXCEPTION', exception)

      setNotification(exception.message)
      setNotificationColor('red')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  // const handleUsernameChange = event => {
  //   console.log(event.target.value)
  //   setUsername(event.target.value)
  // }
  // const handlePasswordChange = event => {
  //   setPassword(event.target.value)
  // }

  blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification message={notification} col={notificationColor} />
        <h2>Log in to application</h2>
        {/* <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
          </div>
          <button type="submit">login</button>
        </form> */}
        {/* <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        /> */}

        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} col={notificationColor} />
      <div>
        <span>{user.name} logged in</span>{' '}
        <button onClick={handleLogout}>logout</button>
      </div>

      <Togglable buttonLabel="create new" ref={newBlogFormRef}>
        <NewBlogForm handleNewFormSubmit={handleNewFormSubmit} />
      </Togglable>

      <hr />
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          currentuser={user}
        />
      ))}
    </div>
  )
}

export default App
