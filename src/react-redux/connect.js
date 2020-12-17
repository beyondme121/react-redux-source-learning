// connect hook版本的实现
// 调用举例: connect(mapStateToProps, mapDispatchToProps)(Counter)

import React, { useMemo, useReducer, useLayoutEffect } from 'react'
import { bindActionCreators } from '../redux'
import ReactReduxContext from './react-redux-context'
/**
 * 
 * @param {*} mapStateToProps 
 * @param {*} mapDispatchToProps 
 */
function connect (mapStateToProps, mapDispatchToProps) {
  return function wrapper (OldComponent) {
    // 返回真正的业务组件 (函数组件)
    return function (props) {
      // 上下文获取store
      let store = React.useContext(ReactReduxContext)
      let { getState, dispatch, subscribe } = store
      let prevState = getState()
      // let stateProps = mapStateToProps(prevState)
      // 1. 改进
      let stateProps = useMemo(() => mapStateToProps(prevState), [prevState])

      // 2. 缓存dispatchProps
      let dispatchProps = useMemo(() => {
        let dispatchProps
        // 映射action: 1. action对象 2.函数 (dispatch, props) => ({action1, action2}) 3. 不传参数 直接把dispatch传递到组件 
        if (typeof mapDispatchToProps === 'object') {
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
        } else if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(dispatch, props)
        } else {
          dispatchProps = { dispatch }
        }
        return dispatchProps
      }, [dispatch, props])

      // 把react的reducer当作被订阅的更新函数
      const [,forceUpdate] = useReducer(x => x + 1, 0)
      useLayoutEffect(() => {
        let unsubscribe = subscribe(forceUpdate)
        return () => {
          unsubscribe()
        };
      }, [subscribe])      
      // let dispatchProps;
      // if (typeof mapDispatchToProps === 'object') {
      //   dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
      // } else if (typeof mapDispatchToProps === 'function') {
      //   dispatchProps = mapDispatchToProps(dispatch, props)
      // } else {
      //   dispatchProps = { dispatch }
      // }

      return <OldComponent {...props} {...stateProps} {...dispatchProps}/>
    }
  }
}

export default connect


/**
 * 自己漏掉的内容
 * 1. 没有使用useMemo对state进行缓存优化
 * 2. 没缓存dispatch-action
 * 3. 传递给OldComponent的props的派发的action被调用后, 更新了store中的状态数据, 组件需要重新渲染才能在组件中看到更新后的结果 
 *    - OldComponent渲染前,DOM挂载前, 使用useLayoutEffect
 * 4. 为什么使用useReducer,使用forceUpdate, 而没有用useState, 使用forceUpdate 减少依赖项目, 减少代码执行
 * 5. redux中的store全局只有一份, subscribe等属性也只有一份
 */