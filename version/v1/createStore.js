import ActionTypes from './utils/action-types'
function createStore (reducer, preloadState) {
    let currentState = preloadState
    let listeners = []
    function getState () {
        return currentState
    }
    function dispatch (action) {
        currentState = reducer(currentState, action)
        listeners.forEach(l => l())
        return action
    }
    function subscribe (listener) {
        listeners.push(listener)
        return function () {
            listeners = listeners.filter(l => l != listener)
            return listeners
        }
    }
    console.log(ActionTypes.INIT)
    dispatch({type: ActionTypes.INIT})
    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore