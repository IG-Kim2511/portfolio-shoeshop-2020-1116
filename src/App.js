/* eslint-disable */

import React, {useState, useEffect, useContext, lazy, Suspense} from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron,Alert } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
// import Detail from './Detail.js';
let Detail = lazy(()=> import('./Detail.js') );

import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import {connect} from 'react-redux';

import Cart from './Cart.js';

export let remainingContext = React.createContext();

function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);
  let [cart, cart변경] = useState([{ id : 0, name : '이쁜신발', quan : 1}]);

  return (

    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand Link as={Link} to="/">ShoeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>            
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    <Switch>

      <Route exact path="/">
        <Jumbotron className="background">
          <h1>choose a shoes and order it. </h1>
          <p>
         Skills : react, redux, react-bootstrap
          </p>    
        </Jumbotron>

        <div className="container">

          <remainingContext.Provider value={재고}>

          <div className="row">
            {
              shoes.map((a,i)=>{
                return (<Card shoes={shoes[i]} i={i} key={i} />)
              })
            }
          </div>

          </remainingContext.Provider>

          <button className="btn btn-primary" onClick={()=>{ 

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{ 
              console.log(result.data);
              shoes변경( [...shoes, ...result.data ] );
            })
            .catch(()=>{ 
              console.log('실패했어요')
            })

           }}>더보기</button>
        </div>
      </Route>

      <Route path="/detail/:id">

        <remainingContext.Provider value={재고}>
          <Suspense fallback={<div>로딩중이에요</div>}>
            <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
          </Suspense>
         </remainingContext.Provider>

      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>

      <Route path="/:id">
        <div>아무거나적었을때 이거 보여주셈</div>
      </Route>

    </Switch>

     

    </div>
  );
}










function Card(props){

  let 재고 = useContext(remainingContext);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) }}>
      
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' } width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p> 
      <Test></Test>
      
    </div>
  )
}
function Test(){
  let 재고 = useContext(remainingContext);
  return <p>{재고[0]}</p>
}


export default App;




















{/* <remainingContext.Provider value={재고}>  */}
