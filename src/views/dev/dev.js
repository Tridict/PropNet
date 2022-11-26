import { createElement as vNode, Fragment, useState } from "../../../vendor/react.js";
import { Radio, Space, Select, Button, Tooltip } from "../../../vendor/tdesign.min.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
const { generatePath, useNavigate } = ReactRouterDom;

export default function Dev() {

  const goto = useNavigate();

  const options = [
    {
      type: "title",
      title: "页面跳转",
    },
    {
      theme: "primary",
      name: "广场页",
    },
    {
      theme: "primary",
      name: "用户页",
      fn: ()=>{goto('../user');},
    },
    {
      theme: "primary",
      name: "检索页(内部再分[条目/陈述/混合])",
    },
    {
      theme: "danger",
      name: "大王页",
      fn: ()=>{goto('../king');},
    },


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
      name: "评估总览页?",
    },
    {
      theme: "primary",
      name: "陈述模板总览页",
    },
    {
      theme: "primary",
      name: "评估模板总览页",
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
      name: "开始答题(仅评估判断)",
    },
    {
      theme: "success",
      name: "开始答题(混合)",
    },


    {
      type: "title",
      title: "条目相关",
    },
    {
      theme: "danger",
      name: "条目创建页",
      fn: ()=>{goto('../item-create');},
    },
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
      theme: "primary",
      name: "跳转到1个随机条目页",
    },
    {
      theme: "primary",
      name: "跳转到1个待完善的条目页",
    },


    {
      type: "title",
      title: "陈述相关",
    },
    {
      theme: "primary",
      name: "陈述页",
      fn: ()=>{goto('../statement/:perma', {perma: ""});},
    },
    {
      theme: "primary",
      name: "陈述模板页",
      fn: ()=>{goto('../statement-template/:perma', {perma: ""});},
    },
    {
      theme: "danger",
      name: "陈述模板创建页",
      fn: ()=>{goto('../statement-template-create');},
    },
    {
      theme: "warning",
      name: "陈述创建页(无参数)",
      fn: ()=>{goto('../statement-create');},
    },
    {
      theme: "success",
      name: "陈述创建页(基于模板)",
      fn: ()=>{goto('../statement-create');},
    },
    {
      theme: "success",
      name: "陈述创建页(基于模板+1个主条目)",
      fn: ()=>{goto('../statement-create');},
    },
    {
      theme: "success",
      name: "陈述创建页(基于模板+1组论元)",
      fn: ()=>{goto('../statement-create');},
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
      theme: "primary",
      name: "跳转到1个随机陈述页",
    },
    {
      theme: "primary",
      name: "跳转到1个待完善的陈述页",
    },
    {
      theme: "success",
      name: "开始针对1个陈述模板检验一组条目",
    },


    {
      type: "title",
      title: "评估相关",
    },
    {
      theme: "primary",
      name: "评估模板页",
      fn: ()=>{goto('../evaluation-template/:perma', {perma: ""});},
    },
    {
      theme: "danger",
      name: "评估模板创建页",
      fn: ()=>{goto('../evaluation-template-create');},
    },
    {
      theme: "warning",
      name: "评估创建页(无参数)",
      fn: ()=>{goto('../evaluation-create');},
    },
    {
      theme: "success",
      name: "评估创建页(基于模板)",
      fn: ()=>{goto('../evaluation-create');},
    },
    {
      theme: "success",
      name: "评估创建页(基于模板+1个陈述)",
      fn: ()=>{goto('../evaluation-create');},
    },
    {
      name: "获取10个新鲜评估",
    },
    {
      name: "获取10个随机评估",
    },
    {
      theme: "success",
      name: "开始基于1个评估模板评估一组陈述",
    },
  ];

  const btnGroup = options.map((opt, idx) => (opt.type==null||['btn', 'button'].includes(opt?.type?.toLowerCase?.())) ? vNode(Tooltip, {
    content: opt.tooltip ?? opt.name,
  }, vNode(Button, {
    key: idx,
    onClick: ()=>{opt?.fn?.()},
    theme: opt?.theme ?? "default",
  }, opt.name)) : ['title'].includes(opt?.type?.toLowerCase?.()) ? vNode('h5', {className: "text-center my-2"}, opt.title??"------") : null);

  const devBox = vNode('div', {
    className: "d-grid gap-2 col-6 col-md-4 mx-auto",
  }, btnGroup);

  return devBox;
}