import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, CHANGE_NUMBER, VisibilityFilters, ValidationStates } from './actions';
import _ from 'lodash';
const { SHOW_ALL } = VisibilityFilters;


function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
      console.log(state, action);
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
  case ADD_TODO:
      console.log(state, action);
    return [...state, {
      text: action.text,
      completed: false
    }];
  case COMPLETE_TODO:
      console.log(state, action);
    return [
      ...state.slice(0, action.index),
      Object.assign({}, state[action.index], {
        completed: true
      }),
      ...state.slice(action.index + 1)
    ];
  default:
    return state;
  }
}

function puzzleStateGenerator(size) {
  console.log('Generating Puzzle. Size: ' + size);
  
  let height = 2*size-1;
  let total = 0;
  let result = {
    size,
    numbers: [],
    changes:0,
    complete: ValidationStates.EMPTY,
    validations: {
      rows: [],
      leftDiagonals: [],
      rightDiagonals: []
    }
  };
  
  for(let i = 0; i < height; i++) {
    let width = height - Math.abs(i - size + 1);
    let row = [];
    
    for(let j = 0; j < width; j++) {
      row.push(0);
      total++;
    }
    
    result.numbers.push(row);
    
    result.validations.rows.push(ValidationStates.EMPTY);
    result.validations.leftDiagonals.push(ValidationStates.EMPTY);
    result.validations.rightDiagonals.push(ValidationStates.EMPTY);
  }
  
  result.total = 2*total;
  
  return result;
}

function validatePuzzle(puzzleState) {
  puzzleState.validations.rows = puzzleState.validations.rows.map(function(rowValidation, i){
    let rowTotal = 0;
    let result;
    
    for(let j = 0; j < puzzleState.numbers[i].length; j++){
      let thisNode = puzzleState.numbers[i][j];
      if(thisNode > 0){
        rowTotal += thisNode;
      } else {
        result = (rowTotal < puzzleState.total) ? ValidationStates.EMPTY : ValidationStates.INVALID;
        break;
      }
    }
    
    if(!result) {
      result = rowTotal === puzzleState.total ? ValidationStates.VALID : ValidationStates.INVALID;
    }
    
    return result;
  });
  
  puzzleState.validations.leftDiagonals = puzzleState.validations.leftDiagonals.map(function(leftValidation, i){
    let leftTotal = 0;
    let result;
    
    for(let j = 0; j < puzzleState.numbers.length; j++){
      let thisNode;
      if(j < puzzleState.size && i < puzzleState.numbers[j].length){
        thisNode = puzzleState.numbers[j][i];
        if(thisNode > 0){
          leftTotal += thisNode;
        } else {
          result = (leftTotal < puzzleState.total) ? ValidationStates.EMPTY : ValidationStates.INVALID;
          break;
        }
      }
      
      if(j >= puzzleState.size && i - (j - puzzleState.size) - 1 >= 0){
        thisNode = puzzleState.numbers[j][i - (j - puzzleState.size) - 1];
        if(thisNode > 0){
          leftTotal += thisNode;
        } else {
          result = (leftTotal < puzzleState.total) ? ValidationStates.EMPTY : ValidationStates.INVALID;
          break;
        }
      }
    }
    
    if(!result) {
      result = leftTotal === puzzleState.total ? ValidationStates.VALID : ValidationStates.INVALID;
    }
    
    return result;
  });
  
  puzzleState.validations.rightDiagonals = puzzleState.validations.rightDiagonals.map(function(leftValidation, i){
    let rightTotal = 0;
    let result;
    for(let j = 0; j < puzzleState.numbers.length; j++){
      let thisNode;
      if(j < puzzleState.size && puzzleState.numbers[j].length - (i+1) >= 0){
        thisNode = puzzleState.numbers[j][puzzleState.numbers[j].length - (i+1)];
        if(thisNode > 0){
          rightTotal += thisNode;
        } else {
          result = (rightTotal < puzzleState.total) ? ValidationStates.EMPTY : ValidationStates.INVALID;
          break;
        }
      }
      
      if(j >= puzzleState.size && (2*puzzleState.size-2) - i < puzzleState.numbers[j].length){
        thisNode = puzzleState.numbers[j][(2*puzzleState.size-2) - i];
        if(thisNode > 0){
          rightTotal += thisNode;
        } else {
          result = (rightTotal < puzzleState.total) ? ValidationStates.EMPTY : ValidationStates.INVALID;
          break;
        }
      }
    }
    
    if(!result) {
      result = rightTotal === puzzleState.total ? ValidationStates.VALID : ValidationStates.INVALID;
    }
    
    return result;
  });
  
  let allValidators = [...puzzleState.validations.rows, ...puzzleState.validations.leftDiagonals, ...puzzleState.validations.rightDiagonals];
  console.log(allValidators);
  puzzleState.complete = allValidators.reduce((acc, status) => {
    if(acc === ValidationStates.INVALID || status === ValidationStates.INVALID){
      return ValidationStates.INVALID;
    } if(acc === ValidationStates.EMPTY || status === ValidationStates.EMPTY){
      return ValidationStates.EMPTY
    } else {
      return ValidationStates.VALID;
    }
  }, ValidationStates.VALID);
  
  return puzzleState;
}

let startTime = +new Date();
function puzzle(state = puzzleStateGenerator(3), action) {
  switch (action.type) {
  case CHANGE_NUMBER:
//    console.log(state, action);
    let newState = JSON.parse(JSON.stringify(state));
    newState.numbers[action.row][action.index] = action.number;
    newState.changes++;
    newState = validatePuzzle(newState);
      
    let now = +new Date();
    let elapsedTime = Math.round((now - startTime) / 10) / 100;
    let rate = Math.round(100 * newState.changes / elapsedTime) /100;
    console.log('Status: ' + newState.complete);
    console.log('Moves: ' + newState.changes);
    console.log('Time Elapsed: ' + elapsedTime);
    console.log('Moves/sec: ' + rate);
    return newState;
  default:
    return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  puzzle
});

export default todoApp;