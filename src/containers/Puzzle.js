import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';
import Validator from '../components/Validator';
import Row from '../components/Row';

let styles = {
  status: {
    textAlign: 'center',
    fontFamily: 'Helvetica, sans-serif'
  },
  puzzle: {
    position: 'relative',
    display: 'table',
    margin: '20px auto'
  }
};

let startTime = +new Date();

let Puzzle = (props) => {
  let { dispatch, puzzleState } = props;
  let { numbers } = puzzleState;
  let now = +new Date();
  let elapsedTime = Math.round((now - startTime) / 10) / 100;
  return (
    <div>
      <div style={styles.puzzle}>
        <div>
          { numbers.map((row, i) => <Row row={row} index={ i } key={ 'row ' + i } dispatch={dispatch} />) }
        </div>
        <Validator puzzleState={puzzleState} direction="row" />
        <Validator puzzleState={puzzleState} direction="leftDiagonal" />
        <Validator puzzleState={puzzleState} direction="rightDiagonal" />
      </div>
      <div style={ styles.status } >
        { puzzleState.complete }
      </div>
      <div>
        Elapsed Time: { elapsedTime }
      </div>
    </div>
  );
};



export default Puzzle