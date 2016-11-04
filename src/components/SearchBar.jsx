import React from 'react';

function SearchBar(props) {

  // prevents input field from handling onSubmit events with enter key press
  function handleSubmit(e){
      e.preventDefault();
      return false;
    }

  let classValue;
  props.hasLoaded ? classValue="search-bar-container" : classValue="hidden"

  return(
    <div className={classValue}>
      <form onSubmit={handleSubmit}>
        <h3>Search for Channel:</h3>
        <input
          type="seach"
          name="video-search"
          onKeyUp={props.handleSearch.bind(this)}>
        </input>
      </form>
    </div>
  )
}

export default SearchBar
