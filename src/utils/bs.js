import { createElement as vNode } from "../../../vendor/react.js";
import { Tooltip, Button } from "../../vendor/tdesign.min.js";

const BsDiv = (klass) => {
  return (props) => {
    const sub_props = {};
    Object.assign(sub_props, props);
    sub_props.children = undefined;
    if (sub_props?.className?.length) {
      sub_props.className += ` ${klass}`;
    } else {
      sub_props.className = `${klass}`;
    };
    return vNode('div', sub_props, props?.children);
  };
};
// const BsDiv = (klass) => {
//   return (attrs, children) => {
//     const sub_attrs = {};
//     Object.assign(sub_attrs, attrs);
//     if (sub_attrs?.className?.length) {
//       sub_attrs.className += ` ${klass}`;
//     } else {
//       sub_attrs.className = `${klass}`;
//     };
//     return vNode('div', sub_attrs, ...children);
//   };
// };
const BsContainer = BsDiv("container");
const BsRow = BsDiv("row");
const BsCol = BsDiv("col");
const BsLine = (props) => {
  // console.log(props);
  if (props?.noLabel) {
    return vNode(BsRow, {
      className: `${props?.rowMy??"my-4"} d-flex align-items-center`,
    }, vNode(BsCol, { className: "col-12", }, props?.children),);
  };
  return vNode(BsRow, {
    className: `${props?.rowMy??"my-4"} d-flex align-items-center`,
  }, ...[
    vNode(BsCol, {
      className: `col-12 col-sm-12 col-md-3 col-lg-2 ${props?.labelClass??''}`,
      // title: props?.tip,
    }, [
      (props?.label),
      props?.tip ? vNode(Tooltip, {
        placement: "top-left",
        showArrow: false,
        content: props?.tip,
      }, vNode(Button, {
        className: "ms-1 cursor-help-important text-muted",
        shape: "circle",
        size: "small",
        variant: "text",
        // ghost: true,
        theme: "default",
      }, "(?)")) : null,
      (props?.deletable),
      props?.deletable ? vNode(Tooltip, {
        placement: "top-left",
        showArrow: false,
        content: "Press to DELETE this field's data.",
      }, vNode(Button, {
        className: "ms-1 text-muted",
        shape: "circle",
        size: "small",
        variant: "text",
        // ghost: true,
        theme: "default",
        onClick: ()=>{props?.onDelete?.(props?.deleteFlag)},
      }, "×")) : null,
    ]),
    vNode(BsCol, {
      className: "col-12 col-sm-12 col-md-9 col-lg-10",
    }, props?.children),
  ]);
};

export default {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
};
