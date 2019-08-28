import React, { useEffect } from 'react'

import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

import { Link } from 'react-router-dom'

const Users = ({ initializeUsers, users }) => {
  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  return (
    <>
      <h3>Users</h3>

      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

const mapDispatchToProps = {
  initializeUsers
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)
