import React, { PropTypes } from 'react';

function Loading({ hasLoaded }) {
  return (
    <div>
      {hasLoaded ? null : <h1>Loading Channels...</h1> }
    </div>
  )
}

Loading.propTypes = {
  hasLoaded: PropTypes.bool.isRequired
}

export default Loading
