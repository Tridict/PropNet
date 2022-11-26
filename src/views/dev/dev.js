import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Radio, Space, Select, Button, Tooltip } from "../../../vendor/tdesign.min.js";

export default function Dev() {

  const options = [
    {
      name: "获取10个新鲜条目",
    },
    {
      name: "获取10个随机条目",
    },
    {
      name: "获取10个待完善的条目",
    },
    {
      name: "跳转到1个随机条目页",
      theme: "primary",
    },
    {
      name: "跳转到1个待完善的条目页",
      theme: "primary",
    },
    {
      name: "开始针对1个陈述模板检验一组条目",
      theme: "success",
    },
    {
      name: "获取10个新鲜陈述",
    },
    {
      name: "获取10个随机陈述",
    },
    {
      name: "获取10个待完善的陈述",
    },
    {
      name: "跳转到1个随机陈述页",
      theme: "primary",
    },
    {
      name: "跳转到1个待完善的陈述页",
      theme: "primary",
    },
    {
      name: "开始基于1个评估模板评估一组陈述",
      theme: "success",
    },
    {
      name: "获取10个新鲜评估",
    },
    {
      name: "获取10个随机评估",
    },
    {
      name: "获取当前用户信息",
      theme: "danger",
    },
  ];

  return vNode('div', {
    className: "d-grid gap-2 col-6 col-md-4 mx-auto",
  }, options.map((opt, idx)=>vNode(Tooltip, {
    content: opt.tooltip ?? opt.name,
  }, vNode(Button, {
    key: idx,
    onClick: ()=>{opt?.fn?.()},
    theme: opt?.theme ?? "default",
  }, opt.name))));
}