// 暴露出store

import { createStore, applyMiddleware } from '../redux'
import reducers from './reducers'
import logger from '../middlewares/logger'
import promise from '../middlewares/promise'
import thunk from '../middlewares/thunk'

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
let store = applyMiddleware(logger, thunk, promise)(createStore)(reducers)

// 最终返回store
// function applyMiddleware(logger) {
//   return function (createStore) {
//     return (reducers) => {
//       let store = createStore(reducers)
//       let oldDispatch = store.dispatch
//       // 传入老的dispatch, 返回一个新的被加工的dispatch函数
//       store.dispatch = logger(store)(oldDispatch)
//       return store
//     }
//   }
// }

// 中间件标准规范
// function logger(store) {
//   return function (next) {
//     // 老的dispatch
//     return function (action) {
//       console.log('preState ', store.getState())
//       next(action)
//       console.log('nextState ', store.getState())
//     }
//   }
// }

// function compose(...funcs) {
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }

// 中间件级联
// function applyMiddleware(...middlewares) {
//   return function (createStore) {
//     return function (reducers) {
//       let store = createStore(reducers)
//       let dispatch
//       // 类似store
//       let middlewareAPI = {
//         getState: store.getState,
//         dispatch: (action) => dispatch(action),
//       }
//       // 先调用中间件, 把外层的壳去掉, 入参就是更新后的store, 去壳的函数数组
//       let chain = middlewares.map((middleware) => middleware(middlewareAPI))
//       dispatch = compose(...chain)(store.dispatch)
//       return {
//         ...store,
//         dispatch,
//       }
//     }
//   }
// }

export default store
