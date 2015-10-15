import {
  changeNumber, ValidationStates
}
from './actions';

let delay = 100;

function AI(store) {
  let {
    puzzle
  } = store.getState();
  //  console.log('BOOYAH', store, puzzle);

  let unTried = [];
  for (let i = 0; i < puzzle.total / 2; i++) {
    unTried.push(i + 1);
  }
  let tried = [];

  let trying = unTried[0];
  unTried.shift();
  setTimeout(() => pushToGrid(trying), delay);

  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('HEYO', unTried, tried);

    if (puzzle.complete === ValidationStates.EMPTY) {
      if (unTried.length > 0) {
        unTried = [...tried, ...unTried];
        tried = [];
        let trying = unTried[0];
        unTried.shift();
        setTimeout(() => pushToGrid(trying), delay);
      } else {
        setTimeout(() => tried.push(popFromGrid()), delay);
      }
    } else if (puzzle.complete === ValidationStates.INVALID) {
      setTimeout(() => tried.push(popFromGrid()), delay);
    }
  });


  function pushToGrid(newNode) {
    let done = false;
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          console.log('PUSH', newNode);
          store.dispatch(changeNumber(i, j, newNode));
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
    store.dispatch(changeNumber(resultI, resultJ, 0));
    return result;
  }

}

export default AI;