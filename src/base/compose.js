function add1 (str) {
    return str + '1'
}
function add2 (str) {
    return str + '2'
}
function add3 (str) {
    return str + '3'
}

let result = add1(add2(add3('hello')))
console.log(result)


// function compose(...func) {
//     let result
//     return arg => {
//         result = arg
//         for (let i = func.length - 1; i >= 0 ; i--) {
//             result = func[i](result)
//         }
//         return result
//     }
// }

function compose (...funcs) {
    return funcs.reduce((a, b) => {
        return (...args) => a(b(...args))
    })
}

let composed = compose(add1, add2, add3)
let res = composed('world')
console.log("res: ", res)