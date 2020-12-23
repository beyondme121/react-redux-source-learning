// 重新派发调用dispatch, 不需要重新派发可以直接调用next
const promise = api => next => action => {
    if (typeof action.then === 'function') {
        action.then(newAction => {
            api.dispatch(newAction)
        })
    } else {
        next(action)
    }
}
export default promise