import React from 'react'

function Error(props) {
  let classValue;
  props.hasError ? classValue='' : classValue='hidden'
  if(props.hasLoaded) classValue='hidden'
  return <h1 className={classValue}> Uh oh, something went wrong!</h1>
}

export default Error
