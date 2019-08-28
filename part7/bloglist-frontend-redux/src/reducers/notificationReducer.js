export const setNotification = (data, color) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION_SET',
      data: data,
      color: color
    })

    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION_SET',
        data: '',
        color: 'blue'
      })
    }, 3000)
  }
}

const notificationReducer = (state = {}, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'NOTIFICATION_SET':
    return { ...state, message: action.data, color: action.color }

  default:
    return state
  }
}

export default notificationReducer
