function reduxThunk({ getState, dispatch }) {
  return function (next) {
    return (action) => {
      if (typeof action === 'function') {
        action(getState, dispatch)
      }
      next(action)
    }
  }
}

export default reduxThunk
