import {changeNumber, ValidationStates} from './actions';

function AI(store) {
  let {puzzle} = store.getState();
//  console.log('BOOYAH', store, puzzle);
  
  let unTried = [];
  for(let i = 0; i < puzzle.total / 2; i++){
    unTried.push(i+1);
  }
  let tried = [];
  
  let trying = unTried.shift();
  pushToGrid(trying);
  tried.push(trying);
  
  store.subscribe(() => {
    puzzle = store.getState().puzzle;
    console.log('HEYO', puzzle);
    
    if(puzzle.complete === ValidationStates.EMPTY){
      
    }
  });
  

  function pushToGrid(newNode) {
    let done = false;
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] === 0) {
          store.dispatch(changeNumber(i, j, newNode));
          done = true;
          break;
        }
      }
    }
  }

  function popFromGrid() {
    let done = false;
    for (let i = 0; !done && i < puzzle.numbers.length; i++) {
      for (let j = 0; j < puzzle.numbers[i].length; j++) {
        if (puzzle.numbers[i][j] !== 0) {
          store.dispatch(changeNumber(i, j, 0));
          done = true;
          break;
        }
      }
    }
  }
  
}

export default AI;