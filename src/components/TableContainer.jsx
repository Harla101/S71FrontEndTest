import React from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import {prettyNumber} from '../methods/operations';

const moment = require('moment')

function TableContainer(props) {

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
  <div className='table-container'>
    <table>
      <tbody>
        <tr className='table-headers'>
          <TableHeader
            headerName={'Thumbnail'}
          />
          <TableHeader
            sortBy={props.sortBy}
            className='sortable'
            headerName={'Title'}
          />
          <TableHeader
            sortBy={props.sortBy}
            className='sortable'
            headerName={'Views'}
          />
          <TableHeader
            sortBy={props.sortBy}
            className='sortable'
            headerName={'Date Created'}
          />
          <TableHeader
            className='sortable'
            headerName={'Favorite'}
          />
        </tr>
        {/*Toggles to view tablerows only if array is not empty*/}
        {(tableRows.length === 0)?
          <tr>
            <td>
              No Results
            </td>
          </tr>
          : tableRows}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer
