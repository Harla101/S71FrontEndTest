import React from 'react';

function TableHeader(props){
  return (
    <th
      onClick={props.sortBy}
      className={props.altClassName}
    >
      {props.headerName}
    </th>
  )
}

export default TableHeader
