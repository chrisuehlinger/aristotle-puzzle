import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';
import Validator from '../components/Validator'

let nodeWidth = 60;
let styles = {
  input: {
    maxWidth: nodeWidth + 'px',
    height: '50px',
    fontSize: '36px',
    textAlign: 'center',
    boxSizing: 'border-box',
    margin: '-1px'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },
  puzzle: {
    position: 'relative',
    display: 'table',
    margin: '0 auto'
  }
};

let Puzzle = (props) => {
  let { dispatch, puzzleState } = props;
  let { numbers } = puzzleState;
  return (
    <div style={styles.puzzle}>
      <div>
        { numbers.map((row, i) => {
            return (
              <div style={ styles.row } key={ 'row ' + i }>
               { row.map((number, j) => {
                   return (<input type="number" 
                                  style={ styles.input }
                                  key={ 'row' + i + 'index' + j }
                                  value={number}  
                                  onChange={ (event) => dispatch(changeNumber(i, j, +event.target.value)) }/>);
                 }) }
              </div>
            );
          }) }
      </div>
      <Validator puzzleState={puzzleState} direction="row" />
      <Validator puzzleState={puzzleState} direction="leftDiagonal" />
      <Validator puzzleState={puzzleState} direction="rightDiagonal" />
    </div>
  );
};



export default Puzzle