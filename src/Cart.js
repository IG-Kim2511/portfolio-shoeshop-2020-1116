import React, { useEffect, memo } from 'react';
import {Table} from 'react-bootstrap';
import { connect } from 'react-redux';
import './Detail.scss';

function Cart(props) {
  return (
    <div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>number</th>
            <th>change</th>
          </tr>
        </thead>
        <tbody>
          {
            props.state.map((a,i)=>{
              return (
                <tr key={i}>
                  <td>{ a.id }</td>
                  <td>{ a.name }</td>
                  <td>{ a.quan }</td>
                  <td>
                    <button onClick={()=>{ props.dispatch({ type : 'add', data : a.id }) }}>+</button>
                    <button onClick={()=>{ props.dispatch({ type : 'subtract', data : a.id }) }}>-</button> 
                  </td>
                </tr>
              )
            })
          }          
        </tbody>
      </Table>

    {/* alert box  */}
      { props.alertBox === true
        ? (<div className="my-alert2">
          <p>alert box 
            <button className="close" onClick={()=>{ props.dispatch({type : 'alert'}) }}>
              <span aria-hidden="true">&times;</span>
            </button> 
          </p>
        </div>)
        : null
      }
     </div>
  )
}


function mapDispatchToProps (state){

  return {
    state : state.reducer,
    alertBox : state.reducer2
  }
}

export default connect(mapDispatchToProps )(Cart)

