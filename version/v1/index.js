import React from "react";
import ReactDOM from "react-dom";
import { createStore } from './redux'

const ADD = 'ADD'
const MINUS = 'MINUS'

function reducer (state = { count: 0 }, action) {
  switch (action.type) {
    case ADD:
      return {
        count: state.count + 1
      }
    case MINUS:
      return {
        count: state.count -1 
      }
    default:
      return state
  }
}

let store = createStore(reducer)

function App (props) {
  let { getState } = store
  let state = getState()
  console.log(state.count)
  return (
    <div>
      <p>{store.getState().count}</p>
      <button onClick={()=> store.dispatch({type: ADD})}>+</button>
      <button onClick={()=> store.dispatch({type: MINUS})}>-</button>
    </div>
  )
}

function render () {
  ReactDOM.render(<App />, document.getElementById("root"));
}
render()

// store订阅渲染函数,当store中的状态发生变化 执行订阅的函数render
store.subscribe(render)


