/* eslint-disable */

import React, {useState, useEffect, useContext, lazy, Suspense} from 'react';
import { Navbar,Nav,NavDropdown,Button,Jumbotron,Alert } from 'react-bootstrap';
import './App.css';
import Data from './data.js';

let Detail = lazy(()=> import('./Detail.js') );

import axios from 'axios';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import {connect} from 'react-redux';

import Cart from './Cart.js';

export let remainingContext = React.createContext();

function App() {

  let [shoes, setShoes] = useState(Data);
  let [remaining,setRemaining] = useState([10,11,12]);
  let [cart, setCart] = useState([{ id : 0, name : 'newshoe', quan : 1}]);

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
         Skills : react, redux, react-bootstrap, Sass
          </p>    
        </Jumbotron>

        <div className="container">

          <remainingContext.Provider value={remaining}>

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
              setShoes( [...shoes, ...result.data ] );
            })
            .catch(()=>{ 
              console.log('failed')
            })

           }}>more</button>
        </div>
      </Route>

      <Route path="/detail/:id">

        <remainingContext.Provider value={remaining}>
          <Suspense fallback={<div>loading</div>}>
            <Detail shoes={shoes} remaining={remaining} setRemaining={setRemaining}/>
          </Suspense>
         </remainingContext.Provider>

      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>

      <Route path="/:id">
        <div>click Home</div>
      </Route>

    </Switch>
    </div>
  );
}


function Card(props){

  let remaining = useContext(remainingContext);
  let history = useHistory();

  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/' + props.shoes.id) }}>
      
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg' } width="100%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>     
    </div>
  )
}

export default App;




















{/* <remainingContext.Provider value={remaining}>  */}
