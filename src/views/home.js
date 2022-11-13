import { createElement as vNode, Fragment, useState } from "../../lib/react.js";
import { Menu, Radio, Space, Select } from "../../lib/tdesign.min.js";

function MyMenu(props) {
  return vNode(Menu.HeadMenu, 
      {value: props.active, onChange: (v) => props.setActive(v)},
      props.options.map((x,idx)=>
        vNode(Menu.MenuItem, {value: `${idx}`}, 
          vNode('span', null, x.label)
        )
      )
    )
}

function InitMode(props) {
  return vNode(Fragment, null, [
    vNode('p', null, '功能待开发'),
  ]);
}

function TeachMode(props) {
  const [assertion, setAssertion] = useState({
    assertion: '苹果是红色的。',
    options: [
      {label: '完全正确', value: 2},
      {label: '不确定', value: 1},
      {label: '完全错误', value: 0}]
  });
  const [answer, setAnswer] = useState();
  const onSelectAnswer = v=>setAnswer(v);
  
  return vNode(Fragment, null, [
    vNode('p', null, '请判断以下命题的正确性：'),
    vNode('p', {className: 'assertion'}, assertion.assertion),
    // vNode(Radio.Group, null, 
    //   assertion.options.map(x=>vNode(Radio, {value: x.value}, x.label))
    // ),
    vNode(Radio.Group, null, 
      vNode(Space, {direction: 'vertical', size: 8},
        assertion.options.map(x=>vNode(Radio.Button, {value: x.value, block: true, className: 'teach__option-button'}, x.label))
      )
    ),
    vNode(Select, {
      value: answer,
      onChange: onSelectAnswer,
      options: assertion.options,
    })
  ]);
}

function CheckMode(props) {
  return vNode(Fragment, null, [
    vNode('p', null, '功能待开发'),
  ]);
}

function QueryMode(props) {
  return vNode(Fragment, null, [
    vNode('p', null, '功能待开发'),
  ]);
}

export function Home() {
  const [active, setActive] = useState('1');
  const options = [
    {label: '初始化', component: InitMode},
    {label: '教学', component: TeachMode},
    {label: '检验', component: CheckMode},
    {label: '查询', component: QueryMode},
  ];
  return vNode(Fragment, null, [
    vNode(MyMenu, {active, setActive, options}),
    vNode('h1', null, options[active].label+'模式'),
    vNode(options[active].component)
  ]);
}
