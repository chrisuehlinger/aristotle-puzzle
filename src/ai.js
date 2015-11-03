import {changeNumber, ValidationStates} from './actions';
import _ from 'lodash';

window.aiDelay = 0;

function AI(store) {
  let {puzzle} = store.getState();
  let stackCount = 0, stackMax = 10;
  let unTried, tried;

  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('State must\'ve changed', unTried.length-1, unTried[unTried.length-1], tried[tried.length-1]);
    decide();
  });
  
  
  let startTime = +new Date();
  init();
  decide();
  
  function init(){
    unTried = [];
    tried = [];
    unTried.push(_.range(1,puzzle.total / 2));
    tried.push([]);
//    unTried[0] = [15,14,9,13,8,6,11,10,4,5,1,18,12,2,7,17,16,19,3];
  }
  
  function pushToGrid(newNode) {
    let done = false;
    
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          console.log('PUSH', newNode);
          if(window.aiDelay === -1 || stackCount < stackMax) {
            stackCount++;
            store.dispatch(changeNumber(i, j, newNode));
          } else {
            stackCount = 0;
            setTimeout(() => store.dispatch(changeNumber(i, j, newNode)), window.aiDelay);
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
    tried[tried.length-1].push(result);
    if(window.aiDelay === -1 || stackCount < stackMax) {
      stackCount++;
      store.dispatch(changeNumber(resultI, resultJ, 0));
    } else {
      stackCount = 0;
      setTimeout(() => store.dispatch(changeNumber(resultI, resultJ, 0)), window.aiDelay);
    }
  }

  function decide(){
    if(puzzle.complete === ValidationStates.VALID || unTried[0].length === 0){
      let endTime = +new Date();
      let totalTime = (endTime - startTime) / 1000;
      console.log('Time: ' + totalTime);
    } else if (puzzle.complete === ValidationStates.EMPTY) {
      if(unTried[unTried.length-1].length > 0){
        let trying = unTried[unTried.length-1].pop();
        unTried.push([...tried[tried.length-1], ...unTried[unTried.length-1]].sort());
        tried.push([]);
        pushToGrid(trying);
      } else {
        unTried.pop();
        tried.pop();
        popFromGrid();
      }
    } else if (puzzle.complete === ValidationStates.INVALID) {
      unTried.pop();
      tried.pop();
      popFromGrid();
    }
  }
}

export default AI;