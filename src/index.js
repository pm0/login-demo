import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";

ReactDOM.render(
  <React.StrictMode>
    <div className="app">
      <AppRouter />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);
