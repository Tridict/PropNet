import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Input, Button, Alert } from "../../../vendor/tdesign.min.js";
import { getItemByFace } from "../../utils/api/item.js";

function SearchItem(props) {
  const [value, onChange] = useState('');
  const [loading, setLoading] = useState(false);
  async function onSearch() {
    setLoading(true);
    const res = await getItemByFace(value);
    if (res.status === 200) {
      props.setData(res.json());
    } else {
      alert(res.statusText);
    }
    setLoading(false);
  }
  return vNode('div', null, [
    vNode('p', null, '请输入您要搜索的条目'),
    vNode(Input, {
      placeholder: '请输入您要搜索的条目',
      onChange: v => onChange(v),
      onEnter: onSearch,
    }),
    vNode(Button, {theme: 'primary', loading, onClick: onSearch}, '搜索')
  ])
}

export default function ItemHome() {
  const [data, setData] = useState();
  return vNode(Fragment, null, [
    data ? vNode('div', null, 'haha') : vNode(SearchItem, { setData }),
  ]);
}
