import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === 'alert닫기') {
    state = false;
    return state;
  } else {
    return state
  }

}







let 초기값 = [
  { id: 0, name: '멋진신발', quan: 2 },
  { id: 1, name: '멋진신발2', quan: 1 },
  //'테스트인풋'
];

function reducer(state = 초기값, 액션) {
  if (액션.type === '항목추가') {

    //state안에 id : 액션.데이터 인게 있냐?
    let found = state.findIndex((a)=>{ return a.id === 액션.데이터.id });

    if ( found >= 0 ){

      let copy = [...state];
      copy[found].quan++;
      return copy

    } else {
      let copy = [...state];
      copy.push(액션.데이터);
      return copy
    }

    

  } else if (액션.type === '수량증가') {

    let copy = [...state];
    copy[액션.데이터].quan++;
    return copy


  } else if (액션.type === '수량감소') {
    let copy = [...state];
    copy[액션.데이터].quan--;
    return copy
  } 
  
  //여기부터 테스트
  // else if ( 액션.type === '테스트입력') {
  //   let copy = [...state] ; 
  //   copy[2] = 액션.데이터;
  //   return copy 
  // }
  
  
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



















// import {Provider} from 'react-redux';
// import { createStore } from 'redux';

// let store = createStore(()=>{ return [{ id : 0, name : '이쁜신발', quan : 1}] });

// let store = createStore(combineReducers({reducer,reducer2}))

// function reducer(state = store2, 액션){
//   console.log('이건리듀서안의 코드에염', state, 액션);

//   if (액션.type === '증가') {
//     let 새거 = [...state];
//     새거[0].quan++;
//     return 새거
//   } else {
//     return state
//   }

// }

// function reducer2(state = { name : 'park' }, 액션){
//   console.log('');
//   if (액션.type === '이름Kim') {
//     let 새거 = {...state};
//     새거.name = 'Kim';
//     return 새거
//   } else {
//     return state
//   }
// }


// let found = state.findIndex(a => a.id === 액션.데이터.id );
// if ( found >= 0 ) {
//   let copy = [...state];
//   copy[found].quan++
//   return copy
// } else {