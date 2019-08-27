import React from 'react';
import { connect } from 'react-redux';
import { createNewAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  
  const createAnecdote = async (event)  => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createNewAnecdote(content);

    props.setNotification(`wow, you created a new anecdote. congrats`, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  createNewAnecdote, setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

