function add1(str) {
  return str + '1'
}
function add2(str) {
  return str + '2'
}
function add3(str) {
  return str + '3'
}

let chainFn = composed(add1, add2, add3)
let res = chainFn('hello')
console.log(res)

function composed(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
