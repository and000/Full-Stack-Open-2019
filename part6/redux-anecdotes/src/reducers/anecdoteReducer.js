import anecdoteService from '../services/anecdotes';

// export const vote = id => {
//   return {
//     type: 'VOTE',
//     data: { id: id }
//   };
// };

export const upvote = content => {
  return async dispatch => {

    const copyCat = {
      id: content.id, 
      content: content.content, 
      votes: content.votes + 1
    }
    
    const changedAnecdote = await anecdoteService.changeSave(copyCat);
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    });
  };
};

export const createNewAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    });
  };
};

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = anecdote => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      // const anecdoteToChange = state.find(a => a.id === id);
      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1
      // };
      // return state.map(anecdote =>
      //   anecdote.id !== id ? anecdote : changedAnecdote
      // );

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      );

    case 'NEW_ANECDOTE':
      // const newAnecdote = {
      //   content: action.data,
      //   id: getId(),
      //   votes: 0
      // };
      // return state.concat(newAnecdote);

      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    case 'SORT':
      return state.sort((a, b) => b.votes - a.votes);

    default:
      return state;
  }
};

export default anecdoteReducer;
