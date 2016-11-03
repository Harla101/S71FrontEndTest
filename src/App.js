import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TableContainer from './components/TableContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      APIData: [],
      visibleTableData:[],
      favoriteIDs: {}
    }
    this.sortBy = this.sortBy.bind(this);
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
        self.setState({favoriteIDs: json['favorite_ids'][0]})
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  sortBy(e) {
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


  handleSearch(e) {
    let rowsToShow = this.state.APIData.filter(data => data.title.toUpperCase().includes(e.target.value.toUpperCase()));
      this.setState({visibleTableData: rowsToShow});
  }

  handleSubmit(e){
    e.preventDefault();
    return false;
  }


// Would also do a POST to store user favorites to backend DB
  handleFavorite(e){
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
    return (
      <div className="App">
        <Header />
        <SearchBar
          handleSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
          />
        <TableContainer
          visibleTableData={this.state.visibleTableData}
          handleFavorite={this.handleFavorite}
          favoriteIDs={this.state.favoriteIDs}
          sortBy={this.sortBy}
        />
      </div>
    );
  }
}

export default App;
