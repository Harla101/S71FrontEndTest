import React from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import {prettyNumber} from '../methods/operations';

const moment = require('moment')

function TableContainer(props) {

// hides table until API Data has been loaded
  let classValue;
  props.hasLoaded ? classValue="table-container" : classValue="hidden"

//generates table rows from API call in App.js
  let tableRows = [];
  if(props.visibleTableData){  tableRows = props.visibleTableData.map(row =>
    <TableRow
      key={row.id}
      id={row.id}
      imageSrc={row.thumb_url_default}
      title={row.title}
      views={prettyNumber(row.views)}
      createdDate={moment(row.created_on).format('MMM D, YYYY h:mm A')}
      handleFavorite={props.handleFavorite}
      isFavorited={props.favoriteIDs[row.id]? true:false}
      >
    </TableRow>
  )
}

return(
  <div className={classValue}>
    <table>
      <thead>
        <tr className='table-headers'>
          <TableHeader
            headerName={''}
          />
          <TableHeader
            sortBy={props.sortBy}
            altClassName='sortable'
            headerName={'Channel'}
          />
          <TableHeader
            sortBy={props.sortBy}
            altClassName='sortable'
            headerName={'Views'}
          />
          <TableHeader
            sortBy={props.sortBy}
            altClassName='sortable'
            headerName={'Date Created'}
          />
          <TableHeader
            headerName={'Favorite'}
          />
        </tr>
      </thead>
        <tbody>
          {/*Toggles to view tablerows only if array is not empty*/}
          {(tableRows.length === 0)? <tr><td className="no-results" colSpan="5">No Results ¯\_(ツ)_/¯ </td></tr> : tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer
