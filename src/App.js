import React, { Component } from 'react';
import './App.css';
import TableRow from './components/tablerowcomponent';
import mockData from './mockData/data-mock.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={tableData: []}
  }

  componentDidMount() {
    this.setState({tableData: this._getTableData()})
    console.log(this.state.tableData)
  }

  componentDidUpdate() {
    console.log('updated')
  }

  _getTableData(){
    // would do external fetch here for API, but mocking with local json for now
    return mockData.channels
  }

  render() {
    let tableRows = this.state.tableData.map(row =>
      <TableRow key={row.id} id={row.id} imageSrc={row.thumb_url_default}
                title={row.title} views={row.views}
                createdDate={(row.created_on).toString()}>
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
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Views</th>
                <th>Date Created</th>
                <th>Favorite</th>
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
