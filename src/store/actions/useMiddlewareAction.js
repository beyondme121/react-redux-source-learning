import * as types from '../action-types'

let actions = {
    add1() {
        return {type: types.ADD1}
    },
    thunkAdd1 (payload) {
        return (dispatch, getState) => {
            setTimeout(() => {
                dispatch({type: types.ADD1, payload: payload})
            }, 1000)
        }
    },
    promiseAdd1 (amount) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("setTimeout promiseAdd1")
                resolve({type: types.ADD1, payload: amount})
            }, 1000);
        })
    }
}

export default actions