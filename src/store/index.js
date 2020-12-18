// 暴露出store

import { createStore } from '../redux'
import reducers from './reducers'

// let store = createStore(reducers)
// window.store = store
// export default store
const store = createStore(reducers, {
  counter1: { number: 10 },
  counter2: { number: 10000 },
})

let dispatch = store.dispatch
store.dispatch = function (action) {
  console.log(store.getState(), '-------------> ???')
  dispatch(action)
  console.log(store.getState(), '<------------- !!!')
  return action
}
export default store
