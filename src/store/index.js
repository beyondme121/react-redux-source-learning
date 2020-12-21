// 暴露出store

import { createStore } from '../redux'
import reducers from './reducers'

// let store = createStore(reducers)
// window.store = store
// export default store
// const store = createStore(reducers, {
//   counter1: { number: 10 },
//   counter2: { number: 10000 },
// })

// let dispatch = store.dispatch
// store.dispatch = function (action) {
//   console.log(store.getState(), '-------------> ???')
//   dispatch(action)
//   console.log(store.getState(), '<------------- !!!')
//   return action
// }

// 异步action
// store.dispatch = function (action) {
//   setTimeout(() => {
//     dispatch(action)
//   }, 1000)
//   return action
// }

// redux中的应用中间件的函数


// 函数调用
let store = applyMiddleware(logger)(createStore)(reducers)

// 最终返回store
function applyMiddleware (logger) {
  return function (createStore) {
    return reducers => {
      let store = createStore(reducers)
      let oldDispatch = store.dispatch
      // 传入老的dispatch, 返回一个新的被加工的dispatch函数
      store.dispatch = logger(store)(oldDispatch)
      return store
    }
  }
}

// 中间件标准规范
function logger (store) {
  return function (next) {    // 老的dispatch
    return function (action) {
      console.log("preState ", store.getState())
      next(action)
      console.log("nextState ", store.getState())
    }
  }
}

export default store
