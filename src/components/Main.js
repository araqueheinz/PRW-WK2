import React, { Component } from 'react';
import BookList from './BookList';

class Main extends Component {

////////////////////
//1. Create State //
////////////////////

    state = {
        bookList: [
            {
                bookName: 'Harry Potter',
                bookSummary: 'Wizard kid that goes to school',
                price: '27.67'
            }  
        ]
    }

//////////////////////////////////////////////////////////////////                                                 
//2.  Use componentDidMount to store the array to localStorage. //
//////////////////////////////////////////////////////////////////

  componentDidMount() {
    //check if there are values in local storage
    if(localStorage.getItem('bookList')) {
      //declare a var to read the data as string and then convert to JSON
      let bookList = JSON.parse(localStorage.getItem('bookList'))
      //Updates the state with new var
      this.setState({bookList: bookList})
    }
  }

/*
/////////////////////////////////////////////////////
                                                   //
3. Create a function to store the name of          //
   the book!                                       //
                                                   //
4. Create a function to store the summary of       //
   the book!                                       //
                                                   //
5. Create a function to store the summary of       //
   the book!                                       //
                                                   //
/////////////////////////////////////////////////////                        
*/           

changeBookName = event =>{
    event.preventDefault()
    this.setState({bookName: event.target.value})
}
changeBookSummary = event =>{
    event.preventDefault()
    this.setState({bookSummary: event.target.value})
}
changeBookPrice = event =>{
    event.preventDefault()
    let newPrice = event.target.value
    newPrice = parseFloat(newPrice).toFixed(2)
    this.setState({price: newPrice})
}

/*
/////////////////////////////////////////////////////
6. Create a function to add the books, summary     //
   and price to the array. Add validation,         //
   use localStorage and reset the form.            //                         //
/////////////////////////////////////////////////////   
*/

addBook = event =>{
    event.preventDefault()
    let bookList = this.state.bookList

    if(this.state.bookName === null){
      alert('Please enter a book name')
      return false;
    }
    if(this.state.bookSummary === null){
      alert('Please enter a short summary')
      return false;
    }
    if(this.state.price === null){
        alert('Please enter a price')
        return false;
    }
    if(isNaN(this.state.price)){
      alert('Input must be a number')
      return false;
    }

    this.state.bookList.push({'bookName':this.state.bookName, 'bookSummary': this.state.bookSummary, 'price': this.state.price})
    this.setState({bookList:this.state.bookList})
    localStorage.setItem('bookList', JSON.stringify(bookList))

    event.target.reset();
  }

///////////////////////////////////////////////
//8. Create a function to delete the         //
//   list item and update localStorage.      //
///////////////////////////////////////////////

    removeExpense = key =>{

        let bookList = this.state.bookList
        this.state.bookList.splice(key, 1)
        this.setState({bookList: this.state.bookList})
        localStorage.setItem('bookList', JSON.stringify(bookList))
    }

  render() {

/*--
////////////////////////////////////////////////////
9.  CREATE A VARIABLE TO MAP THROUGH THE ARRAY.   //
    RETURN THE EXPENSE LIST COMPONENT.            //
////////////////////////////////////////////////////
--*/

let myBooks = this.state.bookList.map((element, i) =>{
    return <BookList val={element} key={i} delMe={() =>this.removeExpense(i)} />
  })


    return (
      <div className="Main" style={styles.container}>
       <section>
           <h2>Add Book to the Inventory</h2>
            <form  onSubmit={this.addBook}>
                <p style={styles.formStyle}>
                    <label style={styles.labelStyle}>Book Name </label>
                        <input style={styles.inputStyle} type="text" name="bookName" onChange={this.changeBookName} />

                    <label style={styles.labelStyle}>Summary </label>
                        <input style={styles.inputStyle}  type="text" name="summary" onChange={this.changeBookSummary} />

                    <label style={styles.labelStyle}>Price </label>
                        <input style={styles.inputStyle}  type="text" name="amount" onChange={this.changeBookPrice} />

                    <button style={styles.buttonStyle}  type="submit">Add</button>
                </p>
            </form>   
        </section>
        <section>
            <h2>Book in Inventory</h2>
            <ul style={styles.paddingLeft}>{myBooks}</ul>
        </section>
        
      </div>
    );
  }
}

export default Main;

const styles = {
    container: {
        margin: 0,
        padding: 0,
        width: 800,
    },
    formStyle:{
        display: 'flex',
        flexDirection: 'column',
       
    },
    labelStyle:{
        marginLeft: 15
    },
    inputStyle: {
        marginLeft: 5,
        width: 100,
       
    },
    buttonStyle: {
        width: 50,
        marginLeft: 5,
        marginTop: 10,
    },
    ulStyle:{
        paddingLeft: 0,
    }
  }