'use strict';

var _redux = require('redux');

function counter(state = 0, action) {
  // console.log(action)

  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = (0, _redux.createStore)(counter);

store.subscribe(() => console.log(store.getState()));

// dispatch

store.dispatch({
  type: 'INCREMENT'
});


store.dispatch({
  type: 'INCREMENT'
});
