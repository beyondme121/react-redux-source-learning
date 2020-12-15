import React, { useState } from "react";
import ReactDOM from "react-dom";
import Counter1 from "./components/Counter1";

function App() {
  let [number, setNumber] = useState(() => Math.random());

  let handleClick = () => {
    setNumber(Math.random());
  };
  let element;
  if (number > 0.5) {
    element = <Counter1 />;
  } else {
    element = <div>DOM Element</div>;
  }
  return (
    <div>
      <button onClick={handleClick}>get Number</button>
      {element}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
