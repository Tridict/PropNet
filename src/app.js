import { createElement as vNode, useEffect } from "../vendor/react.js";
import ReactRouterDom from "../vendor/react-router-dom.js";
import Home from "./views/home/home.js";
import Teach from "./views/teach/teach.js";
import User from "./views/user/user.js";
import King from "./views/king/king.js";
import Dev from "./views/dev/dev.js";
import Doc from "./views/doc/doc.js";
import Ground from "./views/ground/ground.js";
import { EdgeCreatePage } from "./views/primitives/edge.js";
import { FrameCreatePage } from "./views/primitives/frame.js";
import Login from "./views/user/login.js";
import Items, {loader as itemLoader, ItemDetail} from "./views/item/items.js";
import ItemCreatePage from "./views/item/itemCreate.js";
import EntryCreatePage from "./views/entry/entryCreate.js";
import ErrorPage from "./views/error-page/error-page.js";
import { ThemeContext, themes } from "./utils/theme.js";
import { MessagePlugin } from "../vendor/tdesign.min.js";

import { UserApi } from "./utils/api/api.js";
import storage from "./utils/store.js";


// https://juejin.cn/post/7023712736869613581
const router = ReactRouterDom.createHashRouter([
  {
    path: "/",
    element: vNode(Home),
    errorElement: vNode(ErrorPage),
    children: [
      {
        // 条目检索页，查询结果页为?kw=key_word
        path: "items",
        element: vNode(Items),
      },
      {
        // 条目详情页
        path: "items/:face",
        element: vNode(ItemDetail),
        loader: itemLoader,
      },
      {
        // 条目创建页
        path: "entry-create",
        element: vNode(EntryCreatePage),
      },
      {
        // 条目创建页
        path: "item-create",
        element: vNode(ItemCreatePage),
      },
      {
        // edge创建页
        path: "edge-create",
        element: vNode(EdgeCreatePage),
      },
      {
        // frame创建页
        path: "frame-create",
        element: vNode(FrameCreatePage),
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
// const navigate = ReactRouterDom.useNavigate();

// console.log('router\n', router);

export function MyApp() {

  // const logger = function logger ({content, style, duration, details}) {
  //   const style_ = (MessagePlugin[style]!=null) ? style : "info";
  //   MessagePlugin[style_]?.(content??JSON.stringify(details));
  // };

  // useEffect(()=>{
  //   // engine.setLogger(logger);
  //   // engine.init();
  // }, []);

  useEffect(()=>{
    if (storage.getItem("refresh_token_expired")) {
      MessagePlugin.warning("登录过期，请重新登录");
      UserApi.logout();
    };
  }, []);

  return vNode(ThemeContext.Provider,
    { value: themes.dark },
    vNode(ReactRouterDom.RouterProvider, {router})
  );
}
