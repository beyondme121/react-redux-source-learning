import * as types from '../action-types'

let initState = { number: 1000 }
export default function counter2(state = initState, action) {
  switch (action.type) {
    case types.ADD2:
      return {
        number: state.number + action.payload,
      }
    case types.MINUS2:
      return {
        number: state.number - action.payload,
      }
    default:
      return state
  }
}
