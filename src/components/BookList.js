import React, { Component } from 'react';
import Trash from 'react-icons/lib/fa/trash';
import Button from './Button';

class BookList extends Component {
  render() {
    return (
      <div className="BookList">
       <li style={styles.listStyle} key={this.props.id} className="list">
        <span>Book Name: {this.props.val.bookName} </span>
        <span>Summary: {this.props.val.bookSummary} </span>
        <span>Price: ${this.props.val.price} </span>
        <button style={styles.buttonStyle}className="" onClick={this.props.delMe}><Trash/></button>
      </li>
      </div>
    );
  }
}

export default BookList;

const styles = {
   
    listStyle: {
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
    },
    buttonStyle: {
        width: 50,
        marginTop: 10,
    },

}