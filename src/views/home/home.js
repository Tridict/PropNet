import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { createElement as vNode, useState } from "../../../vendor/react.js";
import { Menu } from "../../../vendor/tdesign.min.js";

function MyMenu(props) {
  return vNode(Menu.HeadMenu, 
      {value: props.active, onChange: (idx) => props.setActive(idx)},
      props.options.map((x,idx)=>
      vNode(ReactRouterDom.Link, {to: x.path}, 
        vNode(Menu.MenuItem, {value: `${idx}`}, x.label)
        )
      )
    )
}

export default function Home() {
  const [active, setActive] = useState('');
  const options = [
    {label: '答题', path: 'teach'},
    {label: '检索条目', path: 'item'},
    {label: '检索断言', path: 'assertion'},
    {label: '用户', path: 'user'},
  ];
  return vNode('div', {className: 'app'}, [
    vNode(MyMenu, {active, setActive, options}),
    vNode(ReactRouterDom.Outlet),
  ]);
}