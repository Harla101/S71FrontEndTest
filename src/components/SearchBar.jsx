import React ,{ PropTypes } from 'react';

function SearchBar({ hasLoaded, handleSearch }) {

  // prevents input field from handling onSubmit events with enter key press
  function handleSubmit(e){
      e.preventDefault();
      return false;
    }

  let classValue;
  hasLoaded ? classValue="search-bar-container" : classValue="hidden"

  return(
    <div className={classValue}>
      <form onSubmit={handleSubmit}>
        <h3>Search for Channel:</h3>
        <input
          type="search"
          name="video-search"
          onKeyUp={handleSearch.bind(this)}>
        </input>
      </form>
    </div>
  )
}

SearchBar.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired
}

export default SearchBar
