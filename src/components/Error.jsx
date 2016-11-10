import React, { PropTypes } from 'react'

function Error({hasError}) {
  return (
    <div>
      {hasError ? <h1> Uh oh, something went wrong!</h1> : null }
    </div>
  )
}

Error.propTypes = {
  hasError: PropTypes.bool.isRequired
}

export default Error
