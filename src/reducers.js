import { combineReducers } from 'redux';
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, CHANGE_NUMBER, VisibilityFilters } from './actions';
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
  let result = {
    size,
    numbers: [],
    complete: false,
    validations: {
      rows: [],
      leftDiagonals: [],
      rightDiagonals: []
    }
  };
  
  let height = 2*size-1;
  let total = 0;
  
  for(let i = 0; i < height; i++) {
    let width = height - Math.abs(i - size + 1);
    let row = [];
    
    for(let j = 0; j < width; j++) {
      row.push(0);
      total++;
    }
    
    result.numbers.push(row);
    
    result.validations.rows.push(false);
    result.validations.leftDiagonals.push(false);
    result.validations.rightDiagonals.push(false);
  }
  
  result.total = 2*total;
  
  return result;
}

function validatePuzzle(puzzleState) {
  puzzleState.validations.rows = puzzleState.validations.rows.map(function(rowValidation, i){
    let rowTotal = puzzleState.numbers[i].reduce((n, sum) => sum+n);
    return rowTotal === puzzleState.total;
  });
  
  puzzleState.validations.leftDiagonals = puzzleState.validations.leftDiagonals.map(function(leftValidation, i){
    let leftTotal = 0;
    for(let j = 0; j < puzzleState.numbers.length; j++){
      if(j < puzzleState.size && i < puzzleState.numbers[j].length){
        leftTotal += puzzleState.numbers[j][i];
      }
      
      if(j >= puzzleState.size && i - (j - puzzleState.size) - 1 >= 0){
        leftTotal += puzzleState.numbers[j][i - (j - puzzleState.size) - 1];
      }
    }
    return leftTotal === puzzleState.total;
  });
  
  puzzleState.validations.rightDiagonals = puzzleState.validations.rightDiagonals.map(function(leftValidation, i){
    let rightTotal = 0;
    for(let j = 0; j < puzzleState.numbers.length; j++){
      if(j < puzzleState.size && puzzleState.numbers[j].length - (i+1) >= 0){
        rightTotal += puzzleState.numbers[j][puzzleState.numbers[j].length - (i+1)];
      }
      
      if(j >= puzzleState.size && (2*puzzleState.size-2) - i < puzzleState.numbers[j].length){
        rightTotal += puzzleState.numbers[j][(2*puzzleState.size-2) - i];
      }
    }
    console.log(rightTotal);
    return rightTotal === puzzleState.total;
  });
  
  return puzzleState;
}


function puzzle(state = puzzleStateGenerator(3), action) {
  switch (action.type) {
  case CHANGE_NUMBER:
    console.log(state, action);
    let newState = JSON.parse(JSON.stringify(state));
    newState.numbers[action.row][action.index] = action.number;
    newState = validatePuzzle(newState);
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