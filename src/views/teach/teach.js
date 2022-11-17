import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Radio, Space, Select, Button } from "../../../vendor/tdesign.min.js";

function FillAssertion(props) {
  return vNode(Fragment, null, [
    vNode('p', null, '断言填空功能待开发'),
  ]);
}

function EvalAssertion() {
  const [assertion, setAssertion] = useState({
    assertion: '苹果是红色的。',
    options: [
      {label: '完全正确', value: 3},
      {label: '不确定', value: 2},
      {label: '完全错误', value: 1}
    ],
    moreOptions: [
      {label: '选择困难', value: 2.1},
      {label: '不知道', value: 2.2},
      {label: '这表述怪怪的', value: 2.3}
    ],
  });
  const [answer, setAnswer] = useState();
  const [showMore, setShowMore] = useState(false);
  const onSelectAnswer = v=>setAnswer(v);
  function onSubmit() {
    console.log(answer);
  }
  
  return vNode(Fragment, null, [
    vNode('p', null, '请评估以下断言的正确性：'),
    vNode('p', {className: 'assertion'}, assertion.assertion),
    vNode(Space, {direction: 'vertical', size: 8},
      vNode(Radio.Group, {onChange: onSelectAnswer}, 
        assertion.options.map(x=>
          vNode(Radio, {
            className: 'teach__option-button',
            value: x.value, 
          }, x.label)
        ),
      ),
      showMore ? vNode(Select, {
        onChange: onSelectAnswer,
        options: assertion.moreOptions,
        clearable: true,
      }) : vNode(Radio, {
        defaultChecked: false,
        className: 'teach__option-button',
        onChange: (checked) => setShowMore(checked),
      }, '我的回答未在此列出'),
      vNode(Button, {disabled: !answer, onClick: onSubmit}, '提交'),
    ),
  ]);
}

export default function Teach() {
  const [active, setActive] = useState();
  const options = [
    {label: '断言评估', component: EvalAssertion},
    {label: '断言填空', component: FillAssertion},
  ];
  return vNode(Fragment, null, [
    vNode(Space, null, [
      vNode(Button, {onClick: () => setActive(1)}, '断言评估'),
      vNode(Button, {onClick: () => setActive(2)}, '断言填空'),]
    ),
    active ? vNode(options[active-1].component) : null,
  ]);
}