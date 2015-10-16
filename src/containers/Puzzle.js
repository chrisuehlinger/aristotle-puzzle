import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';
import Validator from '../components/Validator';
import Row from '../components/Row';

let styles = {
  input: {
    maxWidth: '60px',
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
        { numbers.map((row, i) => <Row row={row} index={ i } key={ 'row ' + i } />) }
      </div>
      <Validator puzzleState={puzzleState} direction="row" />
      <Validator puzzleState={puzzleState} direction="leftDiagonal" />
      <Validator puzzleState={puzzleState} direction="rightDiagonal" />
    </div>
  );
};



export default Puzzle