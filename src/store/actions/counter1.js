// actionCreator
import * as types from '../action-types'

function add1(num) {
  return {
    type: types.ADD1,
    payload: num,
  }
}
function minus1(num) {
  return {
    type: types.MINUS1,
    payload: num,
  }
}
export default {
  add1,
  minus1,
}
