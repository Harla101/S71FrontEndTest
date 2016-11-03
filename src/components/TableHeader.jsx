import React from 'react';

function TableHeader(props){
  return (
    <th
      onClick={props.sortBy}
      className='sortable'>
      {props.headerName}
    </th>
  )
}

export default TableHeader
