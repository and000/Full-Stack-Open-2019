export const setUser = data => {
  return async dispatch => {
    dispatch({
      type: 'USER_SET',
      data: data
    })
  }
}

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'USER_SET':
    return action.data

  default:
    return state
  }
}

export default userReducer
