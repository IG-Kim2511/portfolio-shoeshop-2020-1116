/* eslint-disable */

import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss';
import { remainingContext } from './App.js';

import { CSSTransition } from "react-transition-group";


import { Nav } from 'react-bootstrap';
import { connect } from 'react-redux';

let detailBox = styled.div`
  padding-top : 30px;
`;
let detailTitle = styled.h4`
  font-size : 25px;
  color : ${ props => props.색상}
`;


function Detail(props) {

  let [alert, setAlert] = useState(true);
  let [inputData, inputData변경] = useState('');

  let [clicked, setClicked] = useState(0);
  let [tab, setTab] = useState(false);


  let remaining = useContext(remainingContext);

  useEffect(() => {

    let 타이머 = setTimeout(() => { setAlert(false) }, 2000);
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

      <detailBox>
        <detailTitle className="red">Detail</detailTitle>
      </detailBox>
  
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6 mt-2">
          <h4 className="pt-5">{product.title}</h4>
          <p>{product.content}</p>
          <p>{product.price}$</p>

          <Info remaining={props.remaining}></Info>

          <button className="btn btn-danger" onClick={() => { 

            props.setRemaining([9, 11, 12]);
            props.dispatch({type : '항목추가', data : {id:product.id, name:product.title, quan:1} });
            history.push('/cart');
            
          }}>order</button>
          &nbsp;
          <button className="btn btn-danger" onClick={() => {
            history.push('/')
          }}>back</button>
        </div>
      </div>

      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={()=>{ setTab(false); setClicked(0) }}>CSSTransition</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ setTab(false); setClicked(1) }}>CSSTransition</Nav.Link>
        </Nav.Item>
      </Nav>
        
       <CSSTransition in={tab} classNames="wow" timeout={500}> 
        <TabContent clicked={clicked} setTab={setTab}/>
       </CSSTransition> 
     
    </div>
  )
}

function TabContent(props){

  useEffect(()=>{
    props.setTab(true);
  });

  if (props.clicked === 0) {
   return <div className="p-4 text-left">00000</div>
  } else if (props.clicked === 1){
    return <div className="p-4 text-left">11111</div>
  } else if (props.clicked === 2){
    return <div className="p-4 text-left">22222</div>
  }
}

function Info(props) {
  return (
    <p>remaining : {props.remaining[0]}</p>
  )
}



function mapDispatchToProps (state){
  console.log(state);
  return {
    state : state.reducer,
    alertBox : state.reducer2,
  }
}

export default connect(mapDispatchToProps )(Detail)


