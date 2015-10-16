import React, { Component } from 'react';
import { ValidationStates } from '../actions';

let styles = {
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
    margin: '27px',
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

let Validator = (props) => {
  let {puzzleState, direction} = props;
  
  return (
    <div style={styles[direction + 'ValidationWrapper']}>
      { puzzleState.validations[direction + 's'].map((validation, i) => {
          let style = JSON.parse(JSON.stringify(styles.validation));
          style.width = (puzzleState.numbers[i].length * 80 - (80-3)) + 'px';
          style.backgroundColor = validationColors[validation];
          return (<div style={style} key={direction + 'Validation' + i}></div>);
        })}
    </div>
  );
};

export default Validator;