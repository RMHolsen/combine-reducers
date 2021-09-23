import { combineReducers } from 'redux';
// import the combineReducers function

/* NOTA BENE 

This code along crams everything into one reducer file BUT 
reducer files can easily be one per topic and then cobined in a rootReducer.js
or they can all be imported into the index.js file and then combined as
const rootReducer = combineReducers({ 
  one: reducerOne,
  two: reducerTwo
})

const store = createStore(rootReducer... etc)

*/

const rootReducer = combineReducers({
  // root reducer has two keys for each reducer topic with two values equal to the return value of each function
  // basically the whole thing has been split by topic
  authors: authorsReducer,
  books: booksReducer
})

export default rootReducer; 

function booksReducer(state = [], action) {
  // the booksReducer function, starting with an empty array and action
  let idx;
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.book];
      // adding the book to the state, i.e. the books array

    case "REMOVE_BOOK":
      idx = state.findIndex(book => book.id === action.id)
      // find the book index by searching in the state (remember, state is an array of books) where the individual book id === the action.id
      return [...state.slice(0, idx), ...state.slice(idx + 1)];

    default: 
      return state;
      // and always have a default 
  }
}

function authorsReducer(state = [], action) {
  // notice we're NOT using arrow functions for these. there's probably a reason. 
  let idx;
  switch (action.type) {
    case "ADD_AUTHOR": 
      return [...state, action.author];

    case "REMOVE_AUTHOR":
      idx = state.findIndex(author => author.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)];

    case "ADD_BOOK":
      let author = state.filter(author => author.authorName === action.book.authorName);
      if (author.length > 0) {
        return state;
      } else {
        return [...state, { authorName: action.book.authorName, id: uuid() }];
      }
     // adding in a case to add a book by existing author by checking to see if the author name given matches an existing author
     // uuid is a package to manage ids, pay it no mind 

    default: 
      return state;
  }
}
/* OLD AND BUSTED 
export default function bookApp( state = {
    authors: [],
    books: []
  }, action) {

  let idx;
  switch (action.type) {
    // so, case statements and spread operators all over the place. honestly not the worst thing in the world but could get unwieldy.
    case "ADD_BOOK":
      return {
        ...state,
        authors: [...state.authors],
        books: [...state.books, action.book]
      };
 
    case "REMOVE_BOOK":
      idx = state.books.findIndex(book => book.id === action.id);
      return {
        ...state,
        authors: [...state.authors],
        books: [...state.books.slice(0, idx), ...state.books.slice(idx + 1)]
      };
 
    case "ADD_AUTHOR":
      return {
        ...state,
        books: [...state.books],
        authors: [...state.authors, action.author]
      };
 
    case "REMOVE_AUTHOR":
      idx = state.authors.findIndex(author => author.id === action.id);
      return {
        ...state,
        books: [...state.books],
        authors: [...state.authors.slice(0, idx), ...state.authors.slice(idx + 1)]
      };
 
    default:
      return state;
  }
} */