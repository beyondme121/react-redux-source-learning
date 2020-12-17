// actionCreator
import * as types from '../action-types'

function add2(num) {
  return {
    type: types.ADD2,
    payload: num,
  }
}
function minus2(num) {
  return {
    type: types.MINUS2,
    payload: num,
  }
}
let actions = {
  add2,
  minus2
}
export default actions
