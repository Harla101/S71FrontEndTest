import React, { PropTypes } from 'react';

function TableHeader({sortBy, altClassName, headerName}){
  return (
    <th
      onClick={sortBy}
      className={altClassName}
    >
      {headerName}
    </th>
  )
}

TableHeader.propTypes = {
  headerName: PropTypes.string.isRequired,
  sortBy: PropTypes.func,
  altClassName: PropTypes.string
}

export default TableHeader
