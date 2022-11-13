import React from "../lib/react.js";
import ReactDOM from "../lib/react-dom.js";
import { MyApp } from "./app.js";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(MyApp));
