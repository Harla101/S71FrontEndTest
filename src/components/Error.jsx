import React from 'react'

function Error(props) {
  // let classValue;
  // props.hasError ? classValue='' : classValue='hidden'
  // if(props.hasLoaded) classValue='hidden'
  return (
    <div>
      {props.hasError ? <h1> Uh oh, something went wrong!</h1> : null }
    </div>
  )
}

export default Error
