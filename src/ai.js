import {changeNumber, ValidationStates} from './actions';

let delay = 500;

function AI(store) {
  let {puzzle} = store.getState();
  let unTried, tried;

  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('HEYO', unTried, tried);
    decide();
  });
  
  init();
  decide();
  
  function init(){
    unTried = [];
    tried = [];
    
    for (let i = puzzle.total / 2; i > 0 ; i--) {
      unTried.push(i);
    }
  }

  function pushToGrid(newNode) {
    let done = false;
    
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          console.log('PUSH', newNode);
          setTimeout(() => store.dispatch(changeNumber(i, j, newNode)), delay);
          done = true;
          break;
        }
      }
    }
  }

  function popFromGrid() {
    let done = false;
    let result, resultI, resultJ;
    
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          done = true;
          break;
        } else {
          resultI = i;
          resultJ = j;
          result = puzzle.numbers[i][j];
        }
      }
    }

    console.log('POP', result);
    setTimeout(() => store.dispatch(changeNumber(resultI, resultJ, 0)), delay);
    return result;
  }

  function decide(){
    if (puzzle.complete === ValidationStates.EMPTY) {
      if (unTried.length > 0) {
        unTried = [...tried, ...unTried];
        tried = [];
        let trying = unTried.pop();
        pushToGrid(trying);
      } else {
        tried.push(popFromGrid());
      }
    } else if (puzzle.complete === ValidationStates.INVALID) {
      tried.push(popFromGrid());
    }
  }
}

export default AI;