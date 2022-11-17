import {createElement as vNode} from "../vendor/react.js";
import ReactRouterDom from "../vendor/react-router-dom.js";
import Home from "./views/home/home.js";
import Item from "./views/item/item.js";
import ErrorPage from "./views/error-page/error-page.js";
import { ThemeContext, themes } from "./utils/theme.js";

const router = ReactRouterDom.createBrowserRouter([
  {
    path: "/",
    element: vNode(Home),
    errorElement: vNode(ErrorPage),
  },
  {
    path: "item",
    element: vNode(Item),
  },
])

export function MyApp() {
  return vNode(ThemeContext.Provider, 
    {value: themes.dark}, 
    vNode(ReactRouterDom.RouterProvider, {router}));
}
