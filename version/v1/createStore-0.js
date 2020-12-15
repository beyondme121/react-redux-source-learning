function createStore (reducer) {
    // let state
    // let listeners = []
    // function getState () {
    //     return state
    // }
    // function dispatch (action) {
    //     state = reducer(state, action)
    //     listeners.forEach(l => l())
    // }
    // function subscribe (listener) {
    //     listeners.push(listener)
    // }
    // dispatch({type: '@@REDUX/INIT'})
    // return {
    //     getState,
    //     dispatch,
    //     subscribe
    // }
    let state       // 此处不能写成空对象 {}, 因为第一次执行 如果是空对象就会switch default return的就是{}, 如果是undefined, 就会返回reducer的默认参数{ count: 0 }
    let listeners = []
    let store = {
        getState() {
            return state
        },
        dispatch (action) {
            state = reducer(state, action)
            listeners.forEach(l => l())
            return action
        },
        subscribe (listener) {
            listeners.push(listener)
        }
    }
    store.dispatch({type: '@@REDUX/INIT'})
    return store
}

export default createStore