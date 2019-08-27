
export const setMessage = content => {
  
  return({
    type: 'NEW_MESSAGE',
    data: content
  });
};

export const removeMessage = () => {
  
  return({
    type: 'NEW_MESSAGE',
    data: ''
  });
};

export const setNotification = (content, time) => {
  return async dispatch => {
  
    dispatch(
      {
        type: 'NEW_MESSAGE',
        data: content
      })

    setTimeout(

      () => dispatch(
        {
          type: 'NEW_MESSAGE',
          data: ''
        }), time)
  }
}

const messageAtStartState ='an important message to yall';


const notificationReducer = (state = messageAtStartState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.data;

    default:
      return state;
  }
};

export default notificationReducer;
