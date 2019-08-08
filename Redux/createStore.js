/*
 * @Author: leo 
 * @Date: 2019-08-07 20:57:18 
 * @Last Modified by: leo
 * @Last Modified time: 2019-08-08 09:40:55
 * 手动实现createStore
 */

const initState = {
  name: 'dcp'
}

let createStore = function(initState) {
  let state = initState
  let listeners = []
  // subscribe
  function subscribe(listener) {
    listeners.push(listener)
  } 

  // notify
  function changeState(newState = initState) {
    state = newState
    for (let listener of listeners) {
      listener()
    }
  }

  function getState() {
    return state
  }

  return {
    subscribe,
    changeState,
    getState
  }
}

let store = createStore(initState)

store.subscribe(() => {
  console.log('store changed', store.getState())
})


store.changeState({
  ...store.getState(),
  name: 'wyh'
})
