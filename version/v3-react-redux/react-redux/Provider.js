import React from 'react'
import ReactReduxContext from './react-redux-context'

class Provider extends React.Component {
  render() {
    // 可以直接传递store, 不用传递对象 {store: this.props.store}, connect函数的context就是store了, context.getState()
    return (
      <ReactReduxContext.Provider value={this.props.store}>
        {this.props.children}
      </ReactReduxContext.Provider>
    )
  }
}

export default Provider
