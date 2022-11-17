import {createElement as vNode} from "../vendor/react.js";
import ReactRouterDom from "../vendor/react-router-dom.js";
import Home from "./views/home/home.js";
import Teach from "./views/teach/teach.js";
import Item, {loader as itemLoader, ItemDetail} from "./views/item/item.js";
import ErrorPage from "./views/error-page/error-page.js";
import { ThemeContext, themes } from "./utils/theme.js";

const router = ReactRouterDom.createHashRouter([
  {
    path: "/",
    element: vNode(Home),
    errorElement: vNode(ErrorPage),
    children: [
      {
        path: "item",
        element: vNode(Item),
      },
      {
        path: "item/:face",
        element: vNode(ItemDetail),
        loader: itemLoader,
      },
      {
        path: "teach",
        element: vNode(Teach),
      },
      // {
      //   path: "assertion",
      //   element: vNode(Assertion),
      // },
    ]
  },
])

export function MyApp() {
  return vNode(ThemeContext.Provider, 
    {value: themes.dark}, 
    vNode(ReactRouterDom.RouterProvider, {router}));
}
