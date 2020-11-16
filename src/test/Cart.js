import React from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  return (
    <div>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          {
            props.state.map((a,i)=>{
              return (
                <tr>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.quan}</td>
                  <td><button>증가</button></td>
                </tr>
              )
            })
          }
          
        </tbody>
      </Table>
    </div>
  )
}

// export default Cart;

function state를props로(state){
  return {
    state : state,
    name : state.name,
    age : state.age
  }
}
export default connect(state를props로)(Cart);