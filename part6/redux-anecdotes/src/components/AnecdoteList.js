import React from 'react';
import { connect } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import {
  setMessage,
  removeMessage,
  setNotification
} from '../reducers/notificationReducer';

const AnecdoteList = props => {
  const handleVote = anecdote => {
    props.upvote(anecdote);
    // props.setMessage(`wow, you upvoted ${anecdote.content}`);
    // setTimeout(() => {
    //   props.removeMessage();
    // }, 5000);

    props.setNotification(`wow, you upvoted ${anecdote.content}`, 5000);
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  anecdotes.sort((a, b) => b.votes - a.votes);
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};

const mapStateToProps = state => {
  return {
    anecdotes: anecdotesToShow(state)
  };
};

const mapDispatchToProps = {
  upvote,
  setMessage,
  removeMessage,
  setNotification
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
