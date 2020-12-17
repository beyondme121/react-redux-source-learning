// react-redux demo

import React, { Component } from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions/counter2'
import * as actionTypes from '../store/action-types'
class Counter2 extends Component {
  render() {
    console.log("Counter2 number: ", this.props.number)
    return (
      <div>
        Counter2:
        <p>{this.props.number}</p>
        <div>
          <p>通过传递action为对象类型</p>
          <button onClick={() => this.props.add2(100)}>+</button>
        </div>
        <div>
          <p>通过connect第二个参数是函数,传递dispatch和组件接收的参数ownProps进行加法</p>
          <button onClick={() => this.props.add(100)}>+</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    number: state.counter2.number,
  }
}
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     add: counterAction.add1
//   }
// }
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    add(amount) {
      dispatch({type:actionTypes.ADD2, payload: amount + ownProps.paramsAge})
    },
    minus() {
      dispatch({type: actionTypes.MINUS2})
    }
  }
}

// export default connect(mapStateToProps, actions)(Counter2)
export default connect(mapStateToProps, mapDispatchToProps)(Counter2)
