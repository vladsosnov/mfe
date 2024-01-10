import React from "react";
import ReactDOM from "react-dom";
import { Child } from "./remotes/Child";

const App = () => {
  return (
    <div>
      <h1>Host App</h1>
      <Child />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("host-app"));
