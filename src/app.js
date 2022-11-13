import React from "../lib/react.js";
import { Home } from "./views/home.js";
// import { MyButton } from "./components/myButton.js";
import { ThemeContext, themes } from "./utils/theme.js";

export function MyApp() {
  return React.createElement(ThemeContext.Provider, 
    {value: themes.dark}, 
    React.createElement(Home));
}
