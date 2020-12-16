import * as types from '../action-types'

let initState = { number: 10 }
export default function (state = initState, action) {
  switch (action.type) {
    case types.ADD1:
      return {
        number: state.number + action.payload,
      }
    case types.MINUS1:
      return {
        number: state.number - action.payload,
      }
    default:
      return state
  }
}
