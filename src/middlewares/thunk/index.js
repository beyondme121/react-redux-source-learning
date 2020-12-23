const thunk = api => next => action => {
    let { getState, dispatch, ...rest } = api
    if (typeof action === 'function') {
        return action(dispatch, getState)  // 应用中基于thunk的action函数, 入参就是dispatch, 比如异步ajax
    }
    return next(action)
}

export default thunk