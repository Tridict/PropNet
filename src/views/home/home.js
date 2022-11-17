import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { createElement as vNode } from "../../../vendor/react.js";

export default function Home() {
  return vNode('div', null, [
    vNode('h1', null, 'Hello!'),
    vNode(ReactRouterDom.Link, {to: 'item'}, '查询条目'),
    vNode(ReactRouterDom.Link, {to: 'aaa'}, 'aaa'),
  ]);
}