import React from 'react';

function SearchBar(props) {

  // prevents input field from handling onSubmit events with enter key press
  function handleSubmit(e){
      e.preventDefault();
      return false;
    }

  return(
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
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
