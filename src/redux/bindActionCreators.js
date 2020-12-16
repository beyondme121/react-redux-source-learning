function bindActionCreator(action, dispatch) {
  //返回值是个派发函数
  return (...args) => {
    if (typeof action === 'function') {
      return dispatch(action(...args))
    } else {
      return dispatch(action)
    }
  }
}

function bindActionCreators(actions, dispatch) {
  if (typeof actions === 'function') {
    return bindActionCreator(actions, dispatch)
  }
  let combineActionCreators = {}
  for (let key in actions) {
    combineActionCreators[key] = bindActionCreator(actions[key], dispatch)
  }
  return combineActionCreators
}

export default bindActionCreators
