import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';
import AI from './ai';

let stores = [];
for(let i = 0; i < 1; i++){
  let store = createStore(todoApp);
  AI(store);
  stores.push(store);
}

let rootElement = document.getElementById('root');
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