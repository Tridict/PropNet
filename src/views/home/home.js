import ReactRouterDom from "../../../vendor/react-router-dom.js";
const { generatePath, useNavigate } = ReactRouterDom;
import { createElement as vNode, useState } from "../../../vendor/react.js";
import {
  Layout,
  Menu,
  Space,
  Row,
  Col,
  Button,
} from "../../../vendor/tdesign.min.js";

function MyHeaderBox(props) {
  const goto = useNavigate();
  const btnGroup = vNode(Space, {
    direction: "horizontal",
    size: "small",
  }, props.options.map((xx, idx)=>vNode(Button, {
    key: idx,
    type: "button",
    size: "medium",
    variant: (props.active==idx ? "base" : "text"), // 样式 base outline dashed text
    theme: "default",
    // href: goto(xx.path),
    onClick: (evt) => {
      props.setActive(idx);
      goto(xx.path);
    },
  }, xx.label)));

  const logo = vNode('div', {className: 'logo'}, 'PropNet');

  const content = vNode(Row, {
    justify: "space-between",
    align: "middle",
    style: {"width": "100%"},
  }, [
    vNode(Col, {span: 12, sm: 2} ,logo),
    vNode(Col, {span: 12, sm: 10} ,vNode(Row, {
      justify: "end",
      align: "middle",
    }, vNode(Col, {}, btnGroup))),
  ]);

  const box = vNode('div', {
    className: "container my-3",
  }, content);

  return box;
};


function MyMenu(props) {
  return vNode(Menu.HeadMenu,
    {
      value: props.active,
      onChange: (idx) => props.setActive(idx),
      logo: vNode('div', {className: 'logo'}, 'PropNet'),
    },
    props.options.map(
      (xx, idx)=>
      vNode(ReactRouterDom.Link,
        {to: generatePath(xx.path)},
        vNode(Menu.MenuItem, {value: `${idx}`}, xx.label)
      )
    ),
  );
}

export default function Home() {
  const [active, setActive] = useState('');
  const options = [
    {label: '首页', path: '../'},
    // {label: '大王', path: '../king'},
    {label: '答题', path: '../teach'},
    {label: '检索条目', path: '../items'},
    // {label: '检索断言', path: '../assertion'},
    {label: '用户', path: '../user'},
    {label: '开发', path: '../dev'},
  ];
  return vNode(Layout, {className: 'app'}, [
    vNode(Layout.Header, {className: 'app-header shadow-sm'}, vNode(MyHeaderBox, {active, setActive, options})),
    vNode(Layout.Content, {className: 'app-main'}, vNode('div', {
      className: "container my-4 py-4 rounded app-main-container bg-white shadow-sm",
    }, vNode(ReactRouterDom.Outlet))),
    vNode(Layout.Footer, {className: 'app-footer'}, 'Copyright @ 2022 Tridict. All Rights Reserved'),
  ]);
}