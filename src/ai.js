import {changeNumber, ValidationStates} from './actions';

window.aiDelay = 0;

function AI(store) {
  let {puzzle} = store.getState();
  let unTried, tried;

  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('HEYO', unTried.length-1, unTried[unTried.length-1], tried[tried.length-1]);
    decide();
  });
  
  
  let startTime = +new Date();
  init();
  decide();
  
  function init(){
    unTried = [];
    tried = [];
    unTried.push([]);
    tried.push([]);
    for (let j = 1; j <= puzzle.total / 2 ; j++) {
      unTried[0].push(j);
    }
  }

  function pushToGrid(newNode) {
    let done = false;
    
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          console.log('PUSH', newNode);
          if(window.aiDelay !== -1) {
            setTimeout(() => store.dispatch(changeNumber(i, j, newNode)), window.aiDelay);
          } else {
            store.dispatch(changeNumber(i, j, newNode));
          }
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
//    if(window.aiDelay !== -1) {
//      setTimeout(() => store.dispatch(changeNumber(resultI, resultJ, 0)), window.aiDelay);
//    } else {
      store.dispatch(changeNumber(resultI, resultJ, 0));
//    }
    return result;
  }

  function decide(){
    if(puzzle.complete === ValidationStates.VALID || unTried[0].length === 0){
      let endTime = +new Date();
      let totalTime = (endTime - startTime) / 1000;
      console.log('Time: ' + totalTime);
    } else if (puzzle.complete === ValidationStates.EMPTY) {
      if(unTried[unTried.length-1].length > 0){
        let trying = unTried[unTried.length-1].pop();
        unTried.push([...tried[tried.length-1], ...unTried[unTried.length-1]]);
        tried.push([]);
        pushToGrid(trying);
      } else {
        unTried.pop();
        tried.pop();
        tried[tried.length-1].push(popFromGrid());
      }
    } else if (puzzle.complete === ValidationStates.INVALID) {
      unTried.pop();
      tried.pop();
      tried[tried.length-1].push(popFromGrid());
    }
  }
}

export default AI;