import React, { Component } from 'react';
import './App.css';
import TableRow from './components/tablerowcomponent';
import mockData from './mockData/data-mock.json';

const moment = require('moment')

class App extends Component {
  constructor(props) {
    super(props)
    this.state={
      tableData: []
    }
    this._sortBy = this._sortBy.bind(this)
    this.sortDirection = null;

  }

  componentDidMount() {
    this.setState({tableData: this._getTableData()})
  }

  componentDidUpdate() {
  }

  _getTableData(){
    // would do external fetch here for API, but mocking with local json for now
    return mockData.channels
  }

  _sortBy(e) {
    const sortBy = e.target.innerHTML
    this.sortDirection === 'ascend'? this.sortDirection='descend': this.sortDirection='ascend'
    console.log(this.sortDirection)
    switch (sortBy) {
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
    }
  }

// Needed to handle title distinctly for string sorting
  _sortTableDataByTitle(){
    let valuesToSort = this.state.tableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a['title'].toUpperCase() > b['title'].toUpperCase()){
        return this.sortDirection === 'ascend'? 1:-1;
      }
      if(a['title'].toUpperCase() < b['title'].toUpperCase()){
        return this.sortDirection === 'ascend'? -1:1;
      }
        return 0;
    })
    this.setState({tableData: valuesToSort})
  }

  // Sorting handled for non-string columns

  _sortTableData(byColumn){
    let valuesToSort = this.state.tableData.map(data => data);
    valuesToSort.sort((a,b)=> {
      if(a[byColumn]> b[byColumn]){
        return this.sortDirection === 'ascend'? 1:-1;
      }
      if(a[byColumn] < b[byColumn]){
        return this.sortDirection === 'ascend'? -1:1;
      }
        return 0;
    })
    this.setState({tableData: valuesToSort})
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



  render() {
    let tableRows = this.state.tableData.map(row =>
      <TableRow key={row.id} id={row.id} imageSrc={row.thumb_url_default}
                title={row.title} views={this._prettyNumber(row.views)}
                createdDate={moment(row.created_on).format('MMM D, YYYY h:mm A')}>
      </TableRow>)
    return (
      <div className="App">
        <header> Studio71 Channels</header>
        <div className="search-bar-container">
          <form>
            Filter Results:
            <input type="search" name="video-search"></input>
          </form>
        </div>
        <div className='results-container'>
          <table>
            <tbody>
              <tr>
                <th onClick={this._sortBy}>Thumbnail</th>
                <th onClick={this._sortBy}>Title</th>
                <th onClick={this._sortBy}>Views</th>
                <th onClick={this._sortBy}>Date Created</th>
                <th onClick={this._sortBy}>Favorite</th>
              </tr>
                {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
