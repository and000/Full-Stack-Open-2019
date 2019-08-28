import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  // handlePasswordChange,
  // handleUsernameChange
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        {/* <input
          type={username.type}
          value={username.value}
          name="Username"
          onChange={username.onChange}
        /> */}
        <input {...username}/>
      </div>
      <div>
        password
        {/* <input
          type={password.type}
          value={password.value}
          name="Password"
          onChange={password.onChange}
        /> */}
        <input {...password}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // handleUsernameChange: PropTypes.func.isRequired,
  // handlePasswordChange: PropTypes.func.isRequired,
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired
}

export default LoginForm
