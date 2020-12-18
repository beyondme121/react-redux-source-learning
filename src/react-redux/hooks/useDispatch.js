// 从store中获取dispatch方法, 完成派发action的功能
import { useContext } from 'react'
import ReactReduxContext from '../react-redux-context'

function useDispatch() {
  let store = useContext(ReactReduxContext)
  return store.dispatch
}

export default useDispatch
