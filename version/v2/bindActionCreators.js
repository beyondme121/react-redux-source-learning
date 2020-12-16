// 绑定单一一个actionCreator, 是个函数, 并返回包含dispatch的creator
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => {
    // 收集actionCreator的参数 比如 add(x)
    return dispatch(actionCreator(...args)) // 展开参数列表
  }
}

// 将dispatch绑定到所有的actionCreator中,返回新的actionCreators对象
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    let temp = bindActionCreator(actionCreators, dispatch)
    console.log('temp:', temp)
    return temp
  }
  let bindActionCreators = {}
  // 如果是多个action函数组成的对象
  // let actions = { add, minus, ...}, 每一个都是个actionCreator函数
  for (let key in actionCreators) {
    let actionCreator = actionCreators[key]
    if (typeof actionCreator === 'funciton') {
      bindActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
  }
  console.log('bindActionCreators: ', bindActionCreators)
  return bindActionCreators
}

export default bindActionCreators
