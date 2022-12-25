import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import TDesign from "../../../vendor/tdesign.min.js";
window.__TDesign = TDesign;

import BS from "../../utils/bs.js";
import engine from "../../utils/engine.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;

const Controller_Wrapper = (props) => {

  const FormControlMap = props?.formControlMap ?? {};
  const ComponentsDict = props?.componentsDict ?? {};

  const all_manual_form_names = (
    Object.keys(FormControlMap)
      .filter(it=>!["null", "mixed", "any"].includes(it)))
      .map(it=>({label: it, value: it})
  );

  let form_name__ = props?.field?.data_form ?? "any";
  if (["array", "range"].includes(props?.field?.data_form)) {
    if (props?.field?.item_schema?.data_form?.length) {
      form_name__ += "_of_" + props?.field?.item_schema?.data_form;
    };
  };
  const form_name = form_name__;

  const initial_available_controls = Object.keys(FormControlMap?.[form_name]??{});

  let defined_controls__ = (props?.field?.control_methods??[]);
  if (props?.field?.control_method != null) {
    defined_controls__.unshift(props.field.control_method);
  };
  const defined_controls = defined_controls__.filter(it=>initial_available_controls.includes(it));

  // const all_control_methods = Array.from(new Set(Object.values(FormControlMap).map(it=>Object.keys(it)).flat()));
  // if (defined_controls?.length<=0 && ["any", "mixed", null, undefined].includes(props?.field?.data_form)) {
  //   defined_controls = [];
  // };

  const [working_form_name, set_working_form_name] = useState(form_name);
  // const [manual_form_name, set_manual_form_name] = useState(form_name);

  // const [available_control_options, set_available_control_options] = useState(initial_available_controls);

  const [control_options, set_control_options] = useState(defined_controls.map(ctrl=>({label: `${ctrl}`, value: `${ctrl}`})));
  // const control_options = defined_controls.map(ctrl=>({label: `${ctrl}`, value: `${ctrl}`}));

  const 数据形式选择区 = () => vNode(TDesign['InputAdornment'], {
    prepend: "选择数据形式",
  }, vNode(TDesign['Select'], {
    // autoWidth: true,
    options: all_manual_form_names,
    defaultValue: form_name,
    onChange: (new_manual_form_name)=>{
      // set_manual_form_name(new_manual_form_name);
      set_working_form_name(new_manual_form_name);
      const available_control_options__ = Object.keys(FormControlMap?.[new_manual_form_name]??{});
      // set_available_control_options(available_control_options__);
      set_control_options(available_control_options__.map(ctrl=>({label: `${ctrl}`, value: `${ctrl}`})));
    },
  }));

  const [selected_control_name, set_selected_control_name] = useState(defined_controls?.[0]);
  const 控件选择区 = () => vNode(TDesign['InputAdornment'], {
    prepend: "选择控件",
  }, vNode(TDesign['Select'], {
    // autoWidth: true,
    options: control_options,
    defaultValue: selected_control_name,
    onChange: (new_control)=>{set_selected_control_name(new_control)},
  }));

  const selected_component_name = FormControlMap?.[working_form_name]?.[selected_control_name]
  ?? FormControlMap?.[working_form_name]?.['default']
  ?? FormControlMap?.["any"]?.['default']
  ?? "My_FreeEditor";

  const [local_field, set_local_field] = useState(props?.field);
  const [local_data, set_local_data] = useState(props?.data);

  const 具体控件区 = () => vNode('div', {},
    ComponentsDict?.[selected_component_name] ? vNode(ComponentsDict[selected_component_name], {
      field: local_field,
      data: local_data,
      onDataChange: (newValue) => {
        set_local_data(newValue);
        props?.onDataChange?.(newValue);
      },
    }) : vNode('div', {}, selected_component_name),
  );

  return vNode(BsContainer, {className: "p-0"}, [
    ["null", "mixed", "any", undefined, null].includes(form_name) ?
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 数据形式选择区()) : null,

    control_options.length>1 ?
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 控件选择区()) : null,

    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 具体控件区()),

    !ComponentsDict?.[selected_component_name] ?
    [
      vNode('div', {}, form_name),
      vNode('div', {}, working_form_name),
      vNode(BsLine, {noLabel: true, rowMy: "my-2"}, vNode("pre", {}, JSON.stringify({field: props?.field, data: props?.data}, null, 2))),
    ] : null,
  ]);
};

export default Controller_Wrapper;
