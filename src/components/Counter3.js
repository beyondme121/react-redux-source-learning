import React from 'react'
import { useDispatch, useSelector } from '../react-redux'
// import { add1, minus1 } from '../store/actions/counter1'
function Counter3(props) {
  // debugger
  const dispatch = useDispatch()
  const state = useSelector((state) => state.counter2) // 引入那个reducer的状态, 肯定就dispatch对应的action-type
  // console.log('state, ', state)
  return (
    <div>
      <p>counter3状态数据 {state.number}</p>
      <button
        onClick={() => {
          dispatch({ type: 'ADD2', payload: 99 })
          // console.log('hello world')
        }}
      >
        +
      </button>
    </div>
  )
}
export default Counter3
