import compose from './compose'
function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducers) {
      let store = createStore(reducers)
      let dispatch
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      }
      // 中间件函数去瓜皮
      let chain = middlewares.map((middleware) => middleware(middlewareAPI))
      // 把原始的dispatch传递进去, 经过中间件链的不断AOP, 返回修改后的dispatch
      dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch,
      }
    }
  }
}

export default applyMiddleware
