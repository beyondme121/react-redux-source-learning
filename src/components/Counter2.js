// react-redux demo

import React, { Component } from 'react'
import { connect } from '../react-redux'
import counterAction from '../store/actions/counter1'
class Counter2 extends Component {
  render() {
    return (
      <div>
        Counter2:
        <p>{this.props.number}</p>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    number: state.counter2.number,
  }
}

export default connect(mapStateToProps, counterAction)(Counter2)
