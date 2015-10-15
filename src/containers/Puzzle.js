import React, { Component, PropTypes } from 'react';
import { changeNumber, ValidationStates } from '../actions';

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
  },
  validationWrapper: {
    position: 'absolute',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'stretch',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
//    border: '1px solid black',
    pointerEvents: 'none'
  },
  validation: {
    margin: '20px',
    flex: 1,
    boxSizing: 'border-box',
    opacity: '0.25',
    transition: '0.5s all ease-in'
  }
};

styles.rowValidationWrapper = JSON.parse(JSON.stringify(styles.validationWrapper));

styles.leftDiagonalValidationWrapper = JSON.parse(JSON.stringify(styles.validationWrapper));
styles.leftDiagonalValidationWrapper.transform = 'rotate(-60deg)';

styles.rightDiagonalValidationWrapper = JSON.parse(JSON.stringify(styles.validationWrapper));
styles.rightDiagonalValidationWrapper.transform = 'rotate(60deg)';

let validationColors = {
  VALID: 'green',
  INVALID: 'red',
  EMPTY: 'rgba(200, 200, 200, 0.75)'
}

let Validation = (props) => {
  let {puzzleState, direction} = props;
  
  return (
    <div style={styles[direction + 'ValidationWrapper']}>
      { puzzleState.validations[direction + 's'].map((validation, i) => {
          let style = JSON.parse(JSON.stringify(styles.validation));
          style.width = (puzzleState.numbers[i].length * nodeWidth - (nodeWidth-3)) + 'px';
          style.backgroundColor = validationColors[validation];
          return (<div style={style} key={direction + 'Validation' + i}></div>);
        })}
    </div>
  );
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
      <Validation puzzleState={puzzleState} direction="row" />
      <Validation puzzleState={puzzleState} direction="leftDiagonal" />
      <Validation puzzleState={puzzleState} direction="rightDiagonal" />
    </div>
  );
};



export default Puzzle