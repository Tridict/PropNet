import { createElement as vNode } from "../../../vendor/react.js";
import { Button, MessagePlugin } from "../../../vendor/tdesign.min.js";
import { UserApi } from "../../utils/api/api.js";
import storage from "../../utils/store.js";

const logout = UserApi.logout;

import makeButtonGroup from "../../components/buttonGroup.js";


export default function User() {
  const username = storage.getItem('current_user')?.username;

  const options = [
    {
      name: "退出登录",
      fn: handleLogout,
    },
    {
      theme: "danger",
      name: "获取当前用户信息",
    },
    {
      theme: "warning",
      name: "获取当前用户的操作记录",
    },
    {
      name: "暗黑模式",
      fn: ()=>{document.documentElement.setAttribute('theme-mode', 'dark');},
    },
    {
      name: "非暗黑模式",
      fn: ()=>{document.documentElement.removeAttribute('theme-mode');},
    },
  ];

  const btnGroup = makeButtonGroup(options);

  const devBox = vNode('div', {
    className: "d-grid gap-2 col-6 col-md-4 mx-auto",
  }, btnGroup);

  function handleLogout() {
    logout((({wrapped})=>{
      if (wrapped?.ok) {
        MessagePlugin.success("登出成功");
        navigate('../login');
      } else {
        storage.removeItem("access_token");
        storage.removeItem("refresh_token");
        storage.removeItem("current_user");
        MessagePlugin.warning("登出发生异常但没关系" + JSON.stringify(wrapped));
        navigate('../login');
      };
    }));
  } 
  return vNode('div', null, [
    vNode('p', null, '欢迎，'+username+'！'),
    vNode(Button, {onClick: handleLogout}, '退出登录'),
    devBox,
  ]);
}
