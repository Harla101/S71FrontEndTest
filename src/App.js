import React, { Component } from 'react';

import './normalize.css'
import './App.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TableContainer from './components/TableContainer';
import Loading from './components/Loading'
import Error from './components/Error'

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      APIData: [],
      visibleTableData:[],
      favoriteIDs: {},
      hasLoaded: false,
      hasError: false
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
    //loads async without error;
       setTimeout(function(){
         self.setState({
           APIData: json.channels,
           visibleTableData: json.channels,
           hasLoaded:true})},
           2000)
     }).catch(function(ex) {
       console.log('parsing failed', ex)
       self.setState({hasLoaded: false, hasError: true})
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

// calls corresponding sort function based on which header is clicked
  sortBy(e) {
    if (e) this.currentSort=e.target.innerHTML
    this.sortDirection === 'ascend'? this.sortDirection='descend': this.sortDirection='ascend'
    switch (this.currentSort) {
      case 'Channel':
        this.sortTableDataByTitle()
        break;
      case 'Views':
        this.sortTableData('views')
        break;
      case 'Date Created':
        this.sortTableData('created_on')
        break;
      default:
        console.log("nothing valid")
        break;
    }
  }

// Needed to handle Title distinctly for string sorting
  sortTableDataByTitle(){
    let valuesToSort = this.state.visibleTableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a['title'].toUpperCase() > b['title'].toUpperCase()){
        return this.sortDirection === 'ascend' ? 1 : -1;
      }
      if(a['title'].toUpperCase() < b['title'].toUpperCase()){
        return this.sortDirection === 'ascend' ? -1 : 1;
      }
        return 0;
    })
    this.setState({visibleTableData: valuesToSort})
  }

  // Sorting handled for non-string columns
  sortTableData(byColumn){
    let valuesToSort = this.state.visibleTableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a[byColumn]> b[byColumn]){
        return this.sortDirection === 'ascend'? 1 : -1;
      }
      if(a[byColumn] < b[byColumn]){
        return this.sortDirection === 'ascend'? -1 : 1;
      }
        return 0;
    })
    this.setState({visibleTableData: valuesToSort})
  }

// provides live updating search/filter based on API Data
  handleSearch(e) {
    let rowsToShow = this.state.APIData.filter(data =>
      data.title.toUpperCase().includes(e.target.value.toUpperCase()));
    this.setState({visibleTableData: rowsToShow});
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
          hasLoaded={this.state.hasLoaded}
          />
        <TableContainer
          visibleTableData={this.state.visibleTableData}
          handleFavorite={this.handleFavorite}
          hasLoaded={this.state.hasLoaded}
          favoriteIDs={this.state.favoriteIDs}
          sortBy={this.sortBy}
        />
        <Loading
          hasLoaded={this.state.hasLoaded}
          hasError={this.state.hasError}/>
        <Error
          hasError={this.state.hasError}
          hasLoaded={this.state.hasLoaded}/>
      </div>
    );
  }
}

export default App;
