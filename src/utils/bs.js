import { createElement as vNode } from "../../../vendor/react.js";

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
      className: "col-12 col-sm-12 col-md-3 col-lg-2",
      title: props?.tip,
    }, (props?.label)),
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
