import React from 'react'
import { connect } from '../react-redux'
import actions from '../store/actions/useMiddlewareAction'

function CounterMiddleware(props) {
    let { add1, thunkAdd1, promiseAdd1 } = props
    console.log("add1" , add1, thunkAdd1)
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => thunkAdd1(1000)}>+</button>
            <button onClick={() => promiseAdd1(2000)}>+2000</button>
        </div>
    )
}

const mapStateToProps = state => ({
    number: state.counter1.number
})
export default connect(
    mapStateToProps,
    actions
)(CounterMiddleware)