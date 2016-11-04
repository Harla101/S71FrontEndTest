import React from 'react';

class TableRow extends React.Component {

  //prevents unchanged table rows from re-rendering
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.isFavorited !== nextProps.isFavorited){
      return true;
    }
    return false;
  }

  render(){

    //indicates/toggles if current row id is stored as user favorite
    let heartClass;
    (this.props.isFavorited)?
      heartClass = "fa fa-heart fa-2x favorited":
      heartClass = "fa fa-heart fa-2x not-favorited";

    return (
      <tr className='table-row'>
        <td>
          <img
            alt={this.props.title + ' thumbnail'}
            src={this.props.imageSrc}
          />
        </td>
        <td>
          {this.props.title}
        </td>
        <td>
          {this.props.views}
        </td>
        <td>
          {this.props.createdDate}
        </td>
        <td >
          <i
            className={heartClass}
            aria-hidden="true"
            onClick={this.props.handleFavorite.bind(this)}
            id={this.props.id}
          />
        </td>
      </tr>
    )
  }
}

export default TableRow;
