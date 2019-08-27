

export const setFilter = content => {
  
  return({
    type: 'NEW_FILTER',
    data: content
  });
};

export const removeFilter = () => {
  
  return({
    type: 'NEW_FILTER',
    data: ''
  });
};

const initialState ='';


const filterReducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'NEW_FILTER':
      return action.data;

    default:
      return state;
  }
};

export default filterReducer;
