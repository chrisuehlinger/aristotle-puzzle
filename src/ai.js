import {changeNumber, ValidationStates} from './actions';

let delay = 500;

function AI(store) {
  let {puzzle} = store.getState();
  let unTried, tried;

  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('HEYO', unTried.length-1, unTried[unTried.length-1]);
    decide();
  });
  
  init();
  decide();
  
  function init(){
    unTried = [];
    tried = [];
    unTried.push([]);
    tried.push([]);
    for (let j = puzzle.total / 2; j > 0 ; j--) {
      unTried[0].push(j);
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
      if(unTried[unTried.length-1].length > 0){
        let trying = unTried[unTried.length-1].pop();
        pushToGrid(trying);

        unTried.push([...tried[tried.length-1], ...unTried[unTried.length-1]]);
        tried.push([]);
      } else {
        tried[tried.length-1].push(popFromGrid());
        unTried.pop();
        tried.pop();
      }
    } else if (puzzle.complete === ValidationStates.INVALID) {
      unTried.pop();
      tried.pop();
      tried[tried.length-1].push(popFromGrid());
    }
  }
}

export default AI;