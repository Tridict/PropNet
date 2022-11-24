import { createElement as vNode, useEffect } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Button } from "../../../vendor/tdesign.min.js";
import { logout } from "../../utils/api/user.js";
import storage from "../../utils/stores.js";

const { useNavigate } = ReactRouterDom;

export default function User() {
  const navigate = useNavigate();
  const username = storage.getItem('current_user')

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  });

  function handleLogout() {
    logout();
    navigate('/login');
  } 
  return vNode('div', null, [
    vNode('p', null, '欢迎，'+username+'！'),
    vNode(Button, {onClick: handleLogout}, '退出登录'),
  ]);
}
