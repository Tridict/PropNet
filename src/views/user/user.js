import { createElement as vNode } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Button } from "../../../vendor/tdesign.min.js";
import { logout } from "../../utils/api/user.js";

const { useNavigate } = ReactRouterDom;

export default function User() {
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  } 
  return vNode('div', null, [
    vNode(Button, {onClick: handleLogout}, '退出登录'),
  ]);
}
