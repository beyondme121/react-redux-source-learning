// // 获取store中的状态
// import React, { useReducer, useLayoutEffect } from 'react'
// import ReactReduxContext from '../react-redux-context'

// function useSelector(selector) {
//   let store = React.useContext(ReactReduxContext)
//   let { getState } = store
//   let prevState = getState()
//   let newState = selector(prevState)
//   // 定义更新react状态的函数, 用于store中状态更新后, "触发" 订阅组件刷新(发布订阅模式)
//   let [, forceUpdate] = useReducer((x) => x + 1, 0)
//   useLayoutEffect(() => {
//     return store.subscribe(forceUpdate)
//   }, [store])
//   return newState
// }

// export default useSelector
import { useContext, useLayoutEffect, useReducer } from 'react'
import ReactReduxContext from '../react-redux-context'
function useSelectorWithStore(selector, store) {
  let [, forceRender] = useReducer((x) => x + 1, 0) //useState
  let storeState = store.getState() //获取总状态
  let selectedState = selector(storeState)
  useLayoutEffect(() => {
    return store.subscribe(forceRender)
  }, [store])
  return selectedState
}
function useSelector(selector) {
  const store = useContext(ReactReduxContext)
  const selectedState = useSelectorWithStore(
    //选择器 比较两个值是否相等
    selector,
    store
  )
  return selectedState
}

export default useSelector
