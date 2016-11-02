import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="search-bar-container">
          <form>
            Filter Results:
            <input type="search" name="video-search"></input>
          </form>
        </div>
        <div className='results-container'>
          <table>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Views</th>
              <th>Date Created</th>
              <th>Favorite</th>
            </tr>
            <td><img alt='felicia Ricci thumnail' src='https://yt3.ggpht.com/-MdLmmFh3qjo/AAAAAAAAAAI/AAAAAAAAAAA/lcGE1l_gam4/s88-c-k-no/photo.jpg'></img></td>
            <td>Felicia Ricci</td>
            <td>3,106,606</td>
            <td> June 6, 2009 6:53AM</td>
            <td> false </td>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
