import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Counter1 from './components/Counter1'
import Counter2 from './components/Counter2'
import { Provider } from './react-redux'
import store from './store'

function App() {
  let [number, setNumber] = useState(() => Math.random())

  let handleClick = () => {
    setNumber(Math.random())
  }
  let element
  if (number > 0.5) {
    element = <Counter1 />
  } else {
    element = <div>DOM Element</div>
  }
  return (
    <div>
      <button onClick={handleClick}>get Number</button>
      {element}
      <p>react-redux</p>
      <Counter2 />
    </div>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
