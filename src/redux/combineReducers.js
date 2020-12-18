/**
 * 接收一个由多个reducer组成的对象
 * @param {*} rootReducer
 * 调用: let reducers = combineReducers({x: r1, y: r2, ...})
 * 返回一个reducer, 也就是函数, 这个函数的参数是state, action
 */
function combineReducers(rootReducer) {
  return (state = {}, action) => {
    let nextState = {}
    // console.log('rootReducer:', rootReducer)
    // debugger
    for (let key in rootReducer) {
      // console.log('key, ', key)
      nextState[key] = rootReducer[key](state[key], action)
    }
    return nextState
  }
}

export default combineReducers
