import React, { Component } from 'react';
import './App.css';
import TableRow from './components/tablerowcomponent';

const moment = require('moment')

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      APIData: [],
      visibleTableData:[],
      favoriteIDs: {}
    }
    this._sortBy = this._sortBy.bind(this);
    this._handleFavorite = this._handleFavorite.bind(this);
    this.sortDirection = null;
    this.currentSort = null;
  }

  componentDidMount() {
    const self = this;
    fetch('data-mock.json')
    .then(function(response) {
       return response.json()
     }).then(function(json) {
       self.setState({APIData: json.channels, visibleTableData: json.channels})
     }).catch(function(ex) {
       console.log('parsing failed', ex)
     })

     fetch('userData.json')
     .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('json', json['favorite_ids'][0])
        self.setState({favoriteIDs: json['favorite_ids'][0]})
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  _sortBy(e) {
    if (e) this.currentSort=e.target.innerHTML
    this.sortDirection === 'ascend'? this.sortDirection='descend': this.sortDirection='ascend'
    switch (this.currentSort) {
      case 'Title':
        this._sortTableDataByTitle()
        break;
      case 'Views':
        this._sortTableData('views')
        break;
      case 'Date Created':
        this._sortTableData('created_on')
        break;
      case 'Favorite':
        this._sortTableData('title')
        break;
      default:
        console.log("nothing valid")
        break;
    }
  }

// Needed to handle Title distinctly for string sorting
  _sortTableDataByTitle(){
    let valuesToSort = this.state.visibleTableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a['title'].toUpperCase() > b['title'].toUpperCase()){
        return this.sortDirection === 'ascend'? 1:-1;
      }
      if(a['title'].toUpperCase() < b['title'].toUpperCase()){
        return this.sortDirection === 'ascend'? -1:1;
      }
        return 0;
    })
    this.setState({visibleTableData: valuesToSort})
  }

  // Sorting handled for non-string columns
  _sortTableData(byColumn){
    let valuesToSort = this.state.visibleTableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a[byColumn]> b[byColumn]){
        return this.sortDirection === 'ascend'? 1:-1;
      }
      if(a[byColumn] < b[byColumn]){
        return this.sortDirection === 'ascend'? -1:1;
      }
        return 0;
    })
    this.setState({visibleTableData: valuesToSort})
  }

  _prettyNumber(num) {
    let value= [];
    const numLength = num.toString().length;
    if (numLength < 4) return num;
    let counter = 0;
    for(let i = numLength - 1; i >= 0; i--){
      if(counter % 3 === 0 && counter !== 0){
        value.unshift(',');
        value.unshift(num.toString().charAt(i))
        counter++;
      } else {
        value.unshift(num.toString().charAt(i))
        counter++;
      }
    }
    return value.join('')
  }

  _handleSearch(e) {
    let rowsToShow = this.state.APIData.filter(data => data.title.toUpperCase().includes(e.target.value.toUpperCase()));
      this.setState({visibleTableData: rowsToShow});
  }

  _handleSubmit(e){
    e.preventDefault();
    return false;
  }


// Would also do a POST to store user favorites to backend DB
  _handleFavorite(e){
    e.persist();
    this.setState(previousState=>{
      if(previousState['favoriteIDs'][e.target.id]){
        delete previousState['favoriteIDs'][e.target.id]
        return previousState
      } else {
        previousState['favoriteIDs'][e.target.id] = true;
      }
    });
  }

  render() {
    let tableRows = [];
    if(this.state.visibleTableData){  tableRows = this.state.visibleTableData.map(row =>
      <TableRow key={row.id} id={row.id} imageSrc={row.thumb_url_default}
                title={row.title} views={this._prettyNumber(row.views)}
                createdDate={moment(row.created_on).format('MMM D, YYYY h:mm A')}
                handleFavorite={this._handleFavorite}
                isFavorited={this['state']['favoriteIDs'][row.id]? true:false}
                >
      </TableRow>)
    }
    return (
      <div className="App">
        <header> Studio71 Channels</header>
        <div className="search-bar-container">
          <form onSubmit={this._handleSubmit.bind(this)}>
            Filter Results:
            <input type="text" name="video-search" onKeyUp={this._handleSearch.bind(this)}></input>
          </form>
        </div>
        <div className='results-container'>
          <table>
            <tbody>
              <tr className='table-headers'>
                <th></th>
                <th onClick={this._sortBy} className='sortable'>Title</th>
                <th onClick={this._sortBy} className='sortable'>Views</th>
                <th onClick={this._sortBy} className='sortable'>Date Created</th>
                <th className='sortable'>Favorite</th>
              </tr>
                {(tableRows.length === 0)? <tr><td>No Results</td></tr>: tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
