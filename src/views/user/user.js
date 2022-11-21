import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Radio, Space, Select, Button } from "../../../vendor/tdesign.min.js";
import { register, login } from "../../utils/api/user.js";

export default function User(props) {
  return vNode(Fragment, null, [
    vNode('p', null, '待开发'),
  ]);
}

window.__register = register;
window.__login = login;
