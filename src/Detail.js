/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { remainingContext } from './App.js';

import { CSSTransition } from "react-transition-group";


import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

let 박스 = styled.div`
  padding-top : 30px;
`;
let 제목 = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상}
`;


function Detail(props) {

  let [alert, alert변경] = useState(true);
  let [inputData, inputData변경] = useState('');

  let [누른탭, 누른탭변경] = useState(0);
  let [스위치, 스위치변경] = useState(false);


  let remaining = useContext(remainingContext);

  useEffect(() => {

    let 타이머 = setTimeout(() => { alert변경(false) }, 2000);
    console.log('안녕');
    return () => { clearTimeout(타이머) }
  }, []);

  let { id } = useParams(); 
  let history = useHistory();
  let product = props.shoes.find(x => x.id == id);
  let [탭, 탭변경] = useState(0);
  let [click, setClick] = useState(false);


  useEffect( ()=>{
    var arr = localStorage.getItem('watched');
    if( arr == null ) { arr = [] } else { arr = JSON.parse(arr) }

    arr.push(id); 
    arr = new Set(arr);
    arr = [...arr];

    localStorage.setItem('watched', JSON.stringify(arr) );

  },[] );


  return (
    <div className="container">


      {/* 리덕스를 이용한 인풋data 전송테스트
      <input onInput={ (e)=>{ props.dispatch( {type : '테스트입력', data : e.target.value } ) } } ></input>
      <div>{ props.state[2] } </div> */}


      <박스>
        <제목 className="red">Detail</제목>
      </박스>
      {/* { inputData }
      <input onChange={(e)=>{ inputData변경(e.target.value) }} /> */}

      {/* {
        alert === true
          ? (<div className="my-alert2">
            <p>remaining가 얼마 남지 않았습니다</p>
          </div>)
          : null
      } */}




      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-2">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}원</p>


          <Info remaining={props.remaining}></Info>


          <button className="btn btn-danger" onClick={() => { 

            props.setRemaining([9, 11, 12]);
            props.dispatch({type : '항목추가', data : {id:product.id, name:product.title, quan:1} });
            history.push('/cart');
            
          }}>주문하기</button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => {
            history.push('/')
          }}>뒤로가기</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0) }}>CSSTransition</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>CSSTransition</Nav.Link>
        </Nav.Item>
      </Nav>
        
       <CSSTransition in={스위치} classNames="wow" timeout={500}> 
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
       </CSSTransition> 
     
    </div>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
   return <div className="p-4 text-left">0번째 내용입니다</div>
  } else if (props.누른탭 === 1){
    return <div className="p-4 text-left">1번째 내용입니다</div>
  } else if (props.누른탭 === 2){
    return <div className="p-4 text-left">2번째 내용입니다</div>
  }
}

function Info(props) {
  return (
    <p>remaining : {props.remaining[0]}</p>
  )
}



function state를props화(state){
  console.log(state);
  return {
    state : state.reducer,
    alertBox : state.reducer2,
  }
}

export default connect(state를props화)(Detail)


