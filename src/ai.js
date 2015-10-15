import {changeNumber} from './actions';

function AI(store){
  console.log('BOOYAH', store);
  
  setTimeout(() => store.dispatch(changeNumber(0,2,1)), 1000);
  setTimeout(() => store.dispatch(changeNumber(1,3,20)), 2000);
  setTimeout(() => store.dispatch(changeNumber(2,4,17)), 3000);
  
  setTimeout(() => store.dispatch(changeNumber(0,1,1)), 4000);
  setTimeout(() => store.dispatch(changeNumber(1,2,20)), 5000);
  setTimeout(() => store.dispatch(changeNumber(2,3,16)), 6000);
  setTimeout(() => store.dispatch(changeNumber(3,3,1)), 7000);
}

export default AI;