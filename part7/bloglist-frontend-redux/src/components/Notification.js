import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'

const Notification = (props) => {
  // if (message === null) {
  //   return null
  // }

  const Message = styled.div`
    // position: absolute;
    // bottom: 2%;
    background: transparent;
    border-radius: 3px;
    border: 2px solid ${props.notification.color || 'palevioletred'};
    color: ${props.notification.color  || 'palevioletred'};
    margin: 1rem 1em;
    padding: 0.25em 2em;
  `

  return <Message className="error">{props.notification.message}</Message>
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps,
  null
)(Notification)

