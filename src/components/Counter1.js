import React, { Component } from 'react'
import { bindActionCreators } from '../redux'
import store from '../store'
import counter1Actions from '../store/actions/counter1'

// 绑定了所有actionCreator(函数)组成的对象{fn1, fn2,...}, 并将dispatch传递进去 返回新的对象
let bindActions = bindActionCreators(counter1Actions, store.dispatch)

export default class Counter1 extends Component {
  state = {
    number: 0,
  }
  componentDidMount() {
    // 组件挂载完成后, 获取store中的状态并更新组建的状态 从而重新渲染组件(this.setState)
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().counter1.number })
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
        <button onClick={bindActions.add1}>+</button>
        <button onClick={bindActions.minus1}>-</button>
        <button
          onClick={() =>
            setTimeout(() => {
              bindActions.add1()
            }, 1000)
          }
        >
          延迟1s加1
        </button>

        <section>使用 combineReducer </section>
        <p>{this.state.number}</p>
        <button onClick={() => bindActions.add1(20)}>+</button>
        <button onClick={() => bindActions.minus1(3)}>-</button>
        <button
          onClick={() =>
            setTimeout(() => {
              bindActions.add(999)
            }, 1000)
          }
        >
          延迟1s加1
        </button>
      </div>
    )
  }
}
