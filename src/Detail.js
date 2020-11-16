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
  let 찾은상품 = props.shoes.find(x => x.id == id);
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


// 1. 누가 Detail페이지 들어가면 
// 2. localStorage에 있는 항목을 꺼냄 
// 3. 경우가 두가지가 있겠네 null이 나오거나 [] 가 나오거나 

// 4. []가 나오면 거기에 URL파라미터의 id부분을 push()함 (추가함)
// 5. 중복 처리하기 

// 6. 그러면 [] 를 다시 localStorage에 저장함 (따옴표쳐서)



















  return (
    <div className="container">


      {/* 리덕스를 이용한 인풋데이터 전송테스트
      <input onInput={ (e)=>{ props.dispatch( {type : '테스트입력', 데이터 : e.target.value } ) } } ></input>
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
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>


          <Info remaining={props.remaining}></Info>


          <button className="btn btn-danger" onClick={() => { 

            props.setRemaining([9, 11, 12]);
            props.dispatch({type : '항목추가', 데이터 : {id:찾은상품.id, name:찾은상품.title, quan:1} });
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
          <Nav.Link eventKey="link-0" onClick={()=>{ 스위치변경(false); 누른탭변경(0) }}>상품설명</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={()=>{ 스위치변경(false); 누른탭변경(1) }}>배송정보</Nav.Link>
        </Nav.Item>
      </Nav>
        
      {/* <CSSTransition in={스위치} classNames="wow" timeout={500}> */}
        <TabContent 누른탭={누른탭} 스위치변경={스위치변경}/>
      {/* </CSSTransition> */}
     
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
    alert열렸니 : state.reducer2,
  }
}

export default connect(state를props화)(Detail)










// import styled from 'styled-components';

// let Title = styled.h4`
//     font-size : 20px;
//     text-align : center;
//     margin : 20px;
//     color : ${props => props.primary};
//   `



// class App extends Component {
//   let timer = null;

//   componentDidMount() {
//     timer = setTimeout(() => console.log('Hello, World!'), 3000)
//   }

//   componentWillUnmount() {
//     clearTimeout(timer);
//   }
// }

// function Tab(props) {
  
//   if (props.탭 === 0) {
//     return <p>탭0입니다</p>
//   } else if (props.탭 === 1) {
//     return <p>탭1입니다</p>
//   }else if (props.탭 === 2) {
//     return <p>탭2입니다</p>
//   }
// }
   
{/* <button onClick={() => { 탭변경(0) }}>0번</button>
<button onClick={() => { 탭변경(1) }}>1번</button>
<button onClick={() => { 탭변경(2) }}>2번</button>
<Nav variant="tabs" defaultActiveKey="/home">
  <Nav.Item>
    <Nav.Link eventKey="link-0" onClick={()=>{setClick(false);탭변경(0);}}>Active</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1" onClick={()=>{setClick(false);탭변경(1);}}>Option 2</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2" onClick={()=>{탭변경(2);}}>Option 3</Nav.Link>
  </Nav.Item>

</Nav>
    
<CSSTransition in={click} classNames="roll" timeout={500}>
<Tab 탭={탭} 클릭됨={클릭됨} setClick={setClick}></Tab>
</CSSTransition> */}