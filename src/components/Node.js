import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';

let scaleX = 1.75;
let reScale = 0.75;
let styles = {
  container: {
    position: 'relative',
    margin: '4px 9px',
    borderLeft: '1px solid black',
    borderRight: '1px solid black',
    transform: 'scaleX(' + scaleX + ') scale(' + reScale + ')'
  },
  input: {
    width: '60px',
    height: '60px',
    fontSize: '36px',
    textAlign: 'center',
    boxSizing: 'border-box',
    border: '1px solid black',
    backgroundColor: 'white'
  },
  attachment: {
    position: 'absolute',
    border: '1px solid black',
    height: '42px',
    width: '42px',
    left: '50%',
    transform: 'translateX(-50%)rotate(45deg)',
    zIndex: -1
  }
};

styles.topAttachment = JSON.parse(JSON.stringify(styles.attachment));
styles.topAttachment.top = '-22px';

styles.bottomAttachment = JSON.parse(JSON.stringify(styles.attachment));
styles.bottomAttachment.bottom = '-22px';

let Node = (props) => {
  let {rowIndex, nodeIndex, number, dispatch} = props;
  return (
    <div style={styles.container} >
      <input type="number" 
             style={ styles.input }
             value={number || ''}  
             onChange={ (event) => dispatch(changeNumber(rowIndex, nodeIndex, +event.target.value)) } />
      <div style={styles.topAttachment}></div>
      <div style={styles.bottomAttachment}></div>
    </div>
  );
};

export default Node;