import React from 'react';

function Loading(props) {
  let classValue;
  props.hasLoaded ? classValue="hidden" : classValue=""

  return <h1 className={classValue}>Loading Channels...</h1>
}

export default Loading
