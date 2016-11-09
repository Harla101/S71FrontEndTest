import React from 'react';

function Loading(props) {
  return (
    <div>
      {props.hasLoaded ? null : <h1>Loading Channels...</h1> }
    </div>
  )
}

export default Loading
