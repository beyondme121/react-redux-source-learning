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
统一合并reducer, 合并拆分的reducer, 
- 用法 store/reducers/index.js 或者是store/index.js中combine 推荐第一种
```js
import { combineReducers } from 'redux'
let rootReducers = combineReducers({
  reducer1,
  reducer2,
  //...
})
export default rootReducers
```

- store中引用这个rootReducer
```js
import { createStore } from 'redux'
import rootReducer from './reducer'
let store = createStore(rootReducer)
```  

- 组件使用
```js
// 1. 
store.getState().counter1.number
```

- combineReducer接收对象, 返回一个reducer函数, 供createStore调用传递参数, reducer执行返回状态数据 -> 前置知识点
```js
function combineReducers (reducers) {
  return function combination (state = {}, action) {
    let nextState = {}
    for (let key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState
  }
}
```


## react-redux
为了改善组件中使用store对象, 以及还要进行bindActionCreator, 让组件使用store更加方便
- store中的state映射到组件中的props
- store中的action映射到props

- 通过Provider组件, 上下文对象, 传递store这个仓库对象
- connect函数, 将store中的state和action映射到props


## redux中间件
- 重写dispatch方法，AOP, 前后加逻辑. 加异步方法 promise, ajax请求等
```js
// 实现日志中间件
let store = createStore(reducer, {
  counter1: { number: 0 },
  counter2: { number: 100}
})
// 保存store中的原始dispatch方法 (接收action对象, dispatch函数内部调用reducer, 
// reducer参数为state, 改变完状态, 让所有的监听函数执行)
let dispatch = store.dispatch
store.dispatch = function (action) {
  console.log('----------->')
  // 调用原始的store.dispatch方法, 传入action
  dispatch(action)
  console.log('<-----------')
  return action
}
```

## 实现异步action
```js
// 异步action
store.dispatch = function (action) {
  setTimeout(() => {
    dispatch(action)
  }, 1000)
  return action
}
```

## 单个中间件


## redux中间件原理
> https://www.cnblogs.com/rock-roll/p/10763383.html
> https://www.jianshu.com/p/ae7b5a2f78ae


## redux中间件原理
```js
// 返回store对象
function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer) {
      let store = createStore(reducer)
      let dispatch = middleware(store)
      return {
        ...store,
        dispatch  // 返回修改后的dispatch函数, 经过加工的dispatch函数
      }
    }
  }
}
// redux中间件的写法应用
// 中间件接收的肯定是store, 信息越多越好, 只接收dispatch方法是不全的
function logger (store) {
  let { getState, dispatch } = store
  let newDispatch = (action) => {
    console.log("logger prev", getState())
    dispatch(action)
    console.log("logger after", getState())
  }
  return newDispatch
}

```


## 原生redux中的action只能是对象
由于希望更多的业务逻辑和异步处理, 就有了中间件, dispatch可以是个函数thunk,也可以是个promise,

### redux-thunk
```js
function thunk ({getState, dispatch}) {
  return function (next) {
    return function (action) {
      if (typeof action === 'function') {
        action(getState, dispatch)
      }
      next(action)  // 此处的action就是默认的对象类型 {type: 'xxx',payload: xxx}
    }
  }
}
```

### redux-promise

```js
const promise = api => next => action => {
  if (typeof action.then === 'function') {
    // 重新派发
    action.then(newAction => api.dispatch(newAction))
  }
  next(action)
}

```

### 中间件调用使用

```js
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
                resolve({type: types.ADD1, payload: amount})
            }, 1000);
        })
    }
}

export default actions
```















