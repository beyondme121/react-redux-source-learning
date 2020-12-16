import React, { Component } from 'react'
import { createStore, bindActionCreators } from '../redux'

let initState = { count: 100 }
const counterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        count: state.count + 1,
      }
    case 'MINUS':
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}
let store = createStore(counterReducer, initState)

// actionCreators
function add() {
  return {
    type: 'ADD',
  }
}
function minus() {
  return {
    type: 'MINUS',
  }
}
const actions = { add, minus }
// 绑定了所有actionCreator(函数)组成的对象{fn1, fn2,...}, 并将dispatch传递进去 返回新的对象
let bindActions = bindActionCreators(actions, store.dispatch)

export default class Counter1 extends Component {
  state = {
    number: 0,
  }
  componentDidMount() {
    // 组件挂载完成后, 获取store中的状态并更新组建的状态 从而重新渲染组件(this.setState)
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().count })
    )
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
    this.unsubscribe()
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <section>原始版本 store.dispatch 派发action</section>
        <button onClick={() => store.dispatch({ type: 'ADD' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
        <button
          onClick={() =>
            setTimeout(() => {
              store.dispatch({ type: 'ADD' })
            }, 1000)
          }
        >
          延迟1s加1
        </button>
        <section>使用 bindActionCreators 对actionCreator进行包装</section>
        <button onClick={bindActions.add}>+</button>
        <button onClick={bindActions.minus}>-</button>
        <button
          onClick={() =>
            setTimeout(() => {
              bindActions.add()
            }, 1000)
          }
        >
          延迟1s加1
        </button>
      </div>
    )
  }
}
