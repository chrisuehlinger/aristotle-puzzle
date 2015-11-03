import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';
import Validator from '../components/Validator';
import Row from '../components/Row';

let styles = {
  container: {
    display: 'inline-block',
    verticalAlign: 'middle',
    margin: '20px auto 0px'
  },
  puzzle: {
    position: 'relative',
    margin: '20px 10px'
  },
  validationStatus: {
    textAlign: 'center',
    fontFamily: 'Helvetica, sans-serif'
  },
  stats: {
    fontFamily: 'Helvetica, sans-serif'
  }
};

let startTime = +new Date();

let Puzzle = (props) => {
  let { dispatch, puzzleState } = props;
  let { numbers, changes } = puzzleState;
  let now = +new Date();
  let elapsedTime = Math.round((now - startTime) / 10) / 100;
  let rate = Math.round(100 * changes / elapsedTime) /100;
//  return (
//    <div>
//      <div style={ styles.status } >
//        { puzzleState.complete }
//      </div>
//      <div>
//        { '# of moves: ' + changes }
//      </div>
//      <div>
//        Elapsed Time: { elapsedTime }
//      </div>
//      <div>
//        Avg. moves per second: { rate }
//  </div>
//    </div>
//  );
  return (
    <div style={styles.container} >
      <div style={styles.puzzle}>
        <div>
          { numbers.map((row, i) => <Row row={row} index={ i } key={ 'row ' + i } dispatch={dispatch} />) }
        </div>
        <Validator puzzleState={puzzleState} direction="row" />
        <Validator puzzleState={puzzleState} direction="leftDiagonal" />
        <Validator puzzleState={puzzleState} direction="rightDiagonal" />
      </div>
      <div style={ styles.validationStatus } >
        { puzzleState.complete }
      </div>
      <div style={styles.stats}>
        <div>
          { '# of moves: ' + changes }
        </div>
        <div>
          Elapsed Time: { elapsedTime }
        </div>
        <div>
          Avg. moves per second: { rate }
        </div>
      </div>
    </div>
  );
};



export default Puzzle