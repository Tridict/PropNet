import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { Input, Button } from "../../../vendor/tdesign.min.js";
import { getItemByFace } from "../../utils/api/item.js";

export default function Items() {
  // 暂时
  return vNode(SearchItem);
}

export function SearchItem() {
  const [value, onChange] = useState('');
  return vNode('div', null, [
    vNode('p', null, '请输入您要搜索的条目'),
    vNode(Input, {
      placeholder: '请输入您要搜索的条目',
      onChange: v => onChange(v),
    }),
    vNode(ReactRouterDom.Link, {to: value}, vNode(Button, {theme: 'primary'}, '搜索')),
  ])
}

export async function loader({ params }) {
  return getItemByFace(params.face);
}

export function ItemDetail() {
  const data = ReactRouterDom.useLoaderData();
  console.log(data);
  return vNode(Fragment, null, [
    vNode('p', null, '该条目不存在, 是否创建？'),
    vNode(ReactRouterDom.Link, {to: '../item-create'}, vNode(Button, null, '创建条目')),
    vNode(ReactRouterDom.Link, {to: '../items'}, vNode(Button, null, '返回查询')),
  ])
}
