import React from "../vendor/react.js";
import ReactDOM from "../vendor/react-dom.js";
import { MyApp } from "./app.js";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(MyApp));
