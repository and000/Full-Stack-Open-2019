import React, { useEffect } from 'react'

import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import { useField } from './hooks'

import { connect } from 'react-redux'
import { initializeBlogs, setToken } from './reducers/blogReducer'

import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

const App = ({
  initializeBlogs,
  setToken,
  setNotification,
  setUser,
  notification,
  user,
  users,
  blogs
}) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    initializeBlogs()

    document.documentElement.setAttribute('data-theme', '')
    //document.documentElement.setAttribute('data-theme', 'dark')
  }, [initializeBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [setUser, setToken])

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

      setUser(user)
      setToken(user.token)

      console.log(user)

      username.onReset()
      password.onReset()
    } catch (exception) {
      setNotification('Wrong credentials', 'red')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const userById = id => {
    const perfectUser = users.find(user => user.id === id)
    console.log('HULLO', perfectUser)

    return perfectUser
  }

  const blogById = id => blogs.find(blog => blog.id === id)

  if (user === null) {
    return (
      <div>
        {notification.message && <Notification />}
        <h2>Log in to application</h2>

        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        {notification.message && <Notification />}
        <h2>Log in to application</h2>

        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }
  return (
    <>
      <Router>
        <nav>
          <Link to={'/'}>blogs</Link>
          <span> </span>
          <Link to={'/users'}>users</Link>
          <span> </span>
          <span>{user.name} logged in</span>{' '}
          <button onClick={handleLogout}>logout</button>
        </nav>
        <h2>blogs</h2>
        {notification.message && <Notification />}

        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/users" render={() => <Users />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User user={userById(match.params.id)} />}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => <BlogView blog={blogById(match.params.id)} />}
        />
      </Router>
    </>
  )
}

const mapDispatchToProps = {
  initializeBlogs,
  setToken,
  setNotification,
  setUser
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
