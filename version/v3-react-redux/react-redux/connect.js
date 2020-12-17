import React from 'react'
import ReactReduxContext from './react-redux-context'
import { bindActionCreators } from '../redux'
function connect(mapStateToProps, mapDispatchToProps) {
  return function (OldComponent) {
    return class extends React.Component {
      static contextType = ReactReduxContext
      constructor(props, context) {
        super(props)
        this.state = mapStateToProps(context.getState())
      }
      componentDidMount() {
        this.unsubscribe = this.context.subscribe(() => {
          this.setState(mapStateToProps(this.context.getState()))
        })
      }
      componentWillUnmount() {
        this.unsubscribe()
      }
      render() {
        console.log('this.context, ', this.context)
        // 每次渲染把处理后的action 传递给OldComp
        let boundActions = bindActionCreators(
          mapDispatchToProps,
          this.context.dispatch
        )
        // 把自身的props, store中的状态mapStateToProps,action传递给老组件
        return (
          <OldComponent {...this.props} {...this.state} {...boundActions} />
        )
      }
    }
  }
}
export default connect
