import React, { Component, PropTypes } from 'react';
import { changeNumber } from '../actions';

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

styles.leftValidationWrapper = JSON.parse(JSON.stringify(styles.validationWrapper));
styles.leftValidationWrapper.transform = 'rotate(-60deg)';

styles.rightValidationWrapper = JSON.parse(JSON.stringify(styles.validationWrapper));
styles.rightValidationWrapper.transform = 'rotate(60deg)';

let Puzzle = (props) => {
  let { dispatch, puzzleState } = props;
  let { numbers } = puzzleState;
  console.log('Rendering', numbers);
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
      <div style={styles.rowValidationWrapper}>
        { puzzleState.validations.rows.map((validation, i) => {
            let style = JSON.parse(JSON.stringify(styles.validation));
            style.width = (puzzleState.numbers[i].length * nodeWidth - (nodeWidth-3)) + 'px';
            style.backgroundColor = validation ? 'green' : 'red';
            return (<div style={style} key={'rowValidation' + i}></div>);
          })}
      </div>
      <div style={styles.leftValidationWrapper}>
        { puzzleState.validations.leftDiagonals.map((validation, i) => {
            let style = JSON.parse(JSON.stringify(styles.validation));
            style.width = (puzzleState.numbers[i].length * nodeWidth - (nodeWidth-3)) + 'px';
            style.backgroundColor = validation ? 'green' : 'red';
            return (<div style={style} key={'leftValidation' + i}></div>);
          })}
      </div>
      <div style={styles.rightValidationWrapper}>
        { puzzleState.validations.rightDiagonals.map((validation, i) => {
            let style = JSON.parse(JSON.stringify(styles.validation));
            style.width = (puzzleState.numbers[i].length * nodeWidth - (nodeWidth-3)) + 'px';
            style.backgroundColor = validation ? 'green' : 'red';
            return (<div style={style} key={'rightValidation' + i}></div>);
          })}
      </div>
    </div>
  );
};



export default Puzzle