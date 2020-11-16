import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';


// 👉Detail.js
let initialAlert = true;

function reducer2(state = initialAlert, action) {
  if (action.type === 'alert') {
    state = false;
    return state;
  } else {
    return state
  }
}


// 👉Detail.js
let initialState = [
  { id: 0, name: 'shoes', quan: 2 },
  { id: 1, name: 'shoes2', quan: 1 },

];

function reducer(state = initialState, action) {
  if (action.type === 'addshoes') {

    let found = state.findIndex((a)=>{ return a.id === action.data.id });

    if ( found >= 0 ){

      let copy = [...state];
      copy[found].quan++;
      return copy

    } else {
      let copy = [...state];
      copy.push(action.data);
      return copy
    }

  } else if (action.type === 'add') {

    let copy = [...state];
    copy[action.data].quan++;
    return copy


  } else if (action.type === 'subtract') {
    let copy = [...state];
    copy[action.data].quan--;
    return copy
  } 
  
  else {
    return state
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();




