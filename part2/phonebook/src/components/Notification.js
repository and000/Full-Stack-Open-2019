import React from 'react';
import styled from 'styled-components';

const Notification = ({ message, col }) => {
  if (message === null) {
    return null;
  }

  const Message = styled.div`
    position: absolute; 
    bottom: 2%;
    background: transparent;
    border-radius: 3px;
    border: 2px solid ${col || "palevioletred"};
    color: ${col || "palevioletred"};
    margin: 1rem 1em;
    padding: 0.25em 2em;
  `;

  return <Message className='error'>{message}</Message>;
};

export default Notification;
