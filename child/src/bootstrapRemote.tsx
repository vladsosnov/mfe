import { App } from "./App";
import React from "react";
import ReactDOM from "react-dom";

export const mount = (el: HTMLElement) => {
  if (!el) throw new Error("Missing child element.");

  ReactDOM.render(<App />, el);
};
