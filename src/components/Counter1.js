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
