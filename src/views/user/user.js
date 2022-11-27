import { createElement as vNode, useEffect } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Button, Tooltip } from "../../../vendor/tdesign.min.js";
import { logout } from "../../utils/api/user.js";
import storage from "../../utils/stores.js";

import makeButtonGroup from "../../components/buttonGroup.js";

const { useNavigate } = ReactRouterDom;

export default function User() {
  const navigate = useNavigate();
  const username = storage.getItem('current_user')

  useEffect(() => {
    if (!username) {
      navigate('../login');
    }
  });

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
    logout();
    navigate('../login');
  } 
  return vNode('div', null, [
    vNode('p', null, '欢迎，'+username+'！'),
    vNode(Button, {onClick: handleLogout}, '退出登录'),
    devBox,
  ]);
}
