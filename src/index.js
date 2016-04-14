import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';
import AI from './ai';
import {changeNumber} from './actions';
import _ from 'lodash';

let userStore = createStore(todoApp);

// Set up a nice and easy one
userStore.dispatch(changeNumber(0, 0, 1));
userStore.dispatch(changeNumber(0, 1, 18));
userStore.dispatch(changeNumber(0, 2, 19));
userStore.dispatch(changeNumber(1, 0, 2));
userStore.dispatch(changeNumber(2, 0, 3));

let userRootElement = document.getElementById('user');
ReactDOM.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={userStore}>
    <App />
  </Provider>,
  userRootElement
);

let aiStore = createStore(todoApp);
AI(aiStore);

let aiRootElement = document.getElementById('ai');
ReactDOM.render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={aiStore}>
    <App />
  </Provider>,
  aiRootElement
);

window.parallelAIs = _.once(function(){
  let stores = [];
  for(let i = 0; i < 5; i++){
    let store = createStore(todoApp);
    AI(store);
    stores.push(store);
  }

  let rootElement = document.getElementById('many');
  ReactDOM.render(
    // The child must be wrapped in a function
    // to work around an issue in React 0.13.
    <div>
      { stores.map((store, i) => {
          return (
            <Provider store={store} key={'provider' + i}>
              <App />
            </Provider>
          );
        })
      } 
    </div>,
    rootElement
  );

});