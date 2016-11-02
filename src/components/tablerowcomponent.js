import React from 'react';

const TableRow = (props) => {
  return(
    <tr>
      <td><img alt={props.title + ' thumbnail'} src={props.imageSrc}></img></td>
      <td>{props.title}</td>
      <td>{props.views}</td>
      <td> {props.createdDate}</td>
    </tr>
  )
};

export default TableRow;
