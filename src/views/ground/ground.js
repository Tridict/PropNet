import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Radio, Space, Select, Button, Tooltip } from "../../../vendor/tdesign.min.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";

import makeButtonGroup from "../../components/buttonGroup.js";

const { generatePath, useNavigate } = ReactRouterDom;

export default function Dev() {

  const goto = useNavigate();

  const options = [


    {
      type: "title",
      title: "总览类",
    },
    {
      theme: "primary",
      name: "条目总览页",
    },
    {
      theme: "primary",
      name: "陈述总览页",
    },
    {
      theme: "primary",
      name: "映射总览页",
    },
    {
      theme: "primary",
      name: "陈述模板总览页",
    },
    {
      theme: "primary",
      name: "映射模板总览页",
    },


    {
      type: "title",
      title: "核心?",
    },
    {
      theme: "success",
      name: "开始答题(仅陈述填空)",
    },
    {
      theme: "success",
      name: "开始答题(仅映射判断)",
    },
    {
      theme: "success",
      name: "开始答题(混合)",
    },

  ];

  const btnGroup = makeButtonGroup(options);

  const devBox = vNode('div', {
    className: "d-grid gap-2 col-6 col-md-4 mx-auto",
  }, btnGroup);

  return devBox;
}