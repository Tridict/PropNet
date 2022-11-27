import {createElement as vNode} from "../vendor/react.js";
import ReactRouterDom from "../vendor/react-router-dom.js";
import Home from "./views/home/home.js";
import Teach from "./views/teach/teach.js";
import User from "./views/user/user.js";
import King from "./views/king/king.js";
import Dev from "./views/dev/dev.js";
import Doc from "./views/doc/doc.js";
import Ground from "./views/ground/ground.js";
import Login from "./views/user/login.js";
import Item, {loader as itemLoader, ItemDetail} from "./views/item/item.js";
import ItemCreatePage from "./views/item/itemCreate.js";
import ErrorPage from "./views/error-page/error-page.js";
import { ThemeContext, themes } from "./utils/theme.js";

const router = ReactRouterDom.createHashRouter([
  {
    path: "/",
    element: vNode(Home),
    errorElement: vNode(ErrorPage),
    children: [
      {
        // 条目检索页，查询结果页为?kw=key_word
        path: "items",
        element: vNode(Item),
      },
      {
        // 条目详情页
        path: "items/:face",
        element: vNode(ItemDetail),
        loader: itemLoader,
      },
      {
        // 条目创建页
        path: "item-create",
        element: vNode(ItemCreatePage),
      },
      // 条目创建页 additem/
      {
        // 答题入口 & 断言评估题页 & 断言填空题页
        path: "teach",
        element: vNode(Teach),
      },
      {
        // User
        path: "user",
        element: vNode(User),
      },
      {
        path: "login",
        element: vNode(Login),
      },
      {
        path: "king",
        element: vNode(King),
      },
      // {
      //   // 断言检索页
      //   path: "assertion",
      //   element: vNode(Assertion),
      // },
      {
        // 开发页
        path: "dev",
        element: vNode(Dev),
      },
      {
        // 文档页
        path: "doc",
        element: vNode(Doc),
      },
      {
        // 广场页
        path: "ground",
        element: vNode(Ground),
      },
    ]
  },
]);

// console.log('router\n', router);

export function MyApp() {
  return vNode(ThemeContext.Provider, 
    {value: themes.dark}, 
    vNode(ReactRouterDom.RouterProvider, {router}));
}
