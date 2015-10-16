import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';
import Node from '../components/Node';

let styles = {
  row: {
    display: 'flex',
    justifyContent: 'center'
  }
};

let Row = (props) => {
  let {row, index, dispatch} = props;
  return (
    <div style={ styles.row } >
      { row.map((number, i) => {
          return (<Node rowIndex={index} 
                  nodeIndex={i} 
                  key={ 'node' + i } 
                  number={number}
                  dispatch={dispatch} />);
       }) }
    </div>
  );
};

export default Row;