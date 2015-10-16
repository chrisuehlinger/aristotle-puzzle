import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';

let styles = {
  input: {
    maxWidth: '60px',
    height: '50px',
    fontSize: '36px',
    textAlign: 'center',
    boxSizing: 'border-box',
    margin: '-1px'
  }
};

let Node = (props) => {
  let {rowIndex, nodeIndex, number} = props;
  return (
    <input type="number" 
           style={ styles.input }
           value={number}  
           onChange={ (event) => dispatch(changeNumber(rowIndex, nodeIndex, +event.target.value)) } />
  );
};

export default Node;