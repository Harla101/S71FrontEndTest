import React from 'react';

function SearchBar(props) {
  return(
    <div className="search-bar-container">
      <form onSubmit={props.handleSubmit.bind(this)}>
        Filter Results:
        <input
          type="text"
          name="video-search"
          onKeyUp={props.handleSearch.bind(this)}>
        </input>
      </form>
    </div>
  )
}

export default SearchBar
