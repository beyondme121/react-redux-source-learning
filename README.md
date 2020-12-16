## createStore
```js
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
```

## store.subscribe的返回结果是取消订阅的函数
- componentDidMount 订阅可以改变组件状态的函数 store中的状态改变了 调用了setState就会重新刷新组件
- componentWillUnmount: 将监听函数移除 后续代码验证 通过渲染另外的DOM 卸载Counter1 达到目的
```js
import React, { Component } from 'react'
import { createStore } from '../redux'

let initState = { count: 100 }
const counterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                count: state.count + 1
            }
        case 'MINUS':
            return {
                count: state.count - 1
            }
        default:
            return state;
    }
}
let store = createStore(counterReducer, initState)

export default class Counter1 extends Component {
    state = {
        number: 0
    }
    componentDidMount () {
        // 组件挂载完成后, 获取store中的状态并更新组建的状态 从而重新渲染组件(this.setState)
        this.unsubscribe = store.subscribe(() => this.setState({ number: store.getState().count }))
    }
    componentWillUnmount () {
        console.log("componentWillUnmount")
        this.unsubscribe()
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => store.dispatch({type: 'ADD'})}>+</button>
                <button onClick={() => store.dispatch({type: 'MINUS'})}>-</button>
                <button onClick={() => setTimeout(() => {
                    store.dispatch({type: 'ADD'})
                }, 1000)}>延迟1s加1</button>

            </div>
        )
    }
}

```

- 组件卸载
```js
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Counter1 from "./components/Counter1";

function App() {
  let [number, setNumber] = useState(() => Math.random());

  let handleClick = () => {
    setNumber(Math.random());
  };
  let element;
  if (number > 0.5) {
    element = <Counter1 />;
  } else {
    element = <div>DOM Element</div>;
  }
  return (
    <div>
      <button onClick={handleClick}>get Number</button>
      {element}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```


## ActionCreators的由来
组件中修改store中的状态,需要调用store.dispatch方法, 传递一个action对象, {type: 'xxx'}, 不太优雅, 
我希望, 
- 将action对象通过函数的方式进行返回, 然后调用函数的方式获取这个对象
- 将store中的dispatch方法 与 actionCreator的返回结果进行整合, 形成一个函数, 外部进行调用

```js
function bindActionCreator(action, dispatch) {
  //返回值是个派发函数
  return (...args) => {
    if (typeof action === 'function') {
      return dispatch(action(...args))
    } else {
      return dispatch(action)
    }
  }
}

function bindActionCreators(actions, dispatch) {
  if (typeof actions === 'function') {
    return bindActionCreator(actions, dispatch)
  }
  let combineActionCreators = {}
  for (let key in actions) {
    combineActionCreators[key] = bindActionCreator(actions[key], dispatch)
  }
  return combineActionCreators
}

export default bindActionCreators
```


## combineReducer
统一合并reducer, 合并拆分的reducer

