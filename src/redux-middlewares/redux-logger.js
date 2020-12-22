function reduxLogger(api) {
  return function (next) {
    return (action) => {
      let { getState } = api
      console.log('prev state: ', getState())
      next(action)
      console.log('after state: ', getState())
    }
  }
}

export default reduxLogger
