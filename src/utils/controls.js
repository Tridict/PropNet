import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import TDesign from "../../vendor/tdesign.min.js";
const {
  Form, Input, InputAdornment, InputNumber, RangeInput, Textarea, Radio, Checkbox, Button, Switch, Select, Space, Cascader, TagInput, MessagePlugin, Tooltip, Popup, Divider, Tabs, SelectInput, Slider, TimePicker, DatePicker, DateRangePicker, TimeRangePicker,
} = TDesign;

import { EntryApi } from "./api/api.js";

import BS from "./bs.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;


const Controller_Wrapper = (props) => {
  // 已指明的控件
  let specified_controls = (props?.field?.control_methods??[]);
  if (props?.field?.control_method != null) {
    specified_controls.unshift(props.field.control_method);
  };

  let form_name = props?.field?.data_form ?? "any";
  if (["array", "range"].includes(props?.field?.data_form)) {
    if (props?.field?.data_form?.item_schema?.length) {
      form_name += "_of_" + props?.field?.data_form?.item_schema;
    };
  };

  const available_control_options = Object.keys(FormControlMap?.[form_name]??{});
  specified_controls = specified_controls.filter(it=>available_control_options.includes(it));

  const control_options = specified_controls.map(ctrl=>({label: `${ctrl}`, value: `${ctrl}`}));

  const [selected_control_name, set_selected_control_name] = useState(specified_controls?.[0]);
  const 控件选择区 = () => vNode(InputAdornment, {
    prepend: "请选择数据输入控件",
  }, vNode(Select, {
    options: control_options,
    defaultValue: selected_control_name,
    onChange: (new_control)=>{set_selected_control_name(new_control)},
  }));

  const selected_component_name = FormControlMap?.[form_name]?.[selected_control_name]
  ?? FormControlMap?.[form_name]?.['default']
  ?? FormControlMap?.["any"]?.['default']
  ?? "My_FreeEditor";


  const 具体控件区 = () => vNode('div', {}, vNode('div', {}, form_name), vNode('div', {}, JSON.stringify(control_options)), vNode('div', {}, selected_component_name), vNode(SELF?.[selected_component_name]??'div', {field: props?.field, data: props?.data, onDataChange: props?.onDataChange}));

  return vNode(BsContainer, null, [
    control_options.length>1 ? vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 控件选择区()) : null,
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 具体控件区()),
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, JSON.stringify({field: props?.field, value: props?.data?.[props?.field?.field_name]})),
  ]);
};

const TD_Select_for_Labeled = (props) => {
  return vNode(TDesign['Select'], {
    filterable: true,
    creatable: props?.field?.creatable,
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.field?.default,
    onDataChange: (newData)=>{props?.onDataChange(newData);},
  });
};

const My_DictEditor = (props) => {
  const schema = props?.field?.schema ?? {};
  const fields = schema?.fields ?? [];
  const init_dict_data = props?.data ?? {};
  const [dict_data, set_dict_data] = useState(init_dict_data);
  // https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
  return vNode(BsContainer, null,
    fields.map((field, idx)=>vNode(BsLine, {
      // key: `${field.field_name}-${idx}`,
      key: `${schema?.name}-${field.field_name}-${idx}`,
      idx: idx,
      label: field.field_name,
      tip: field?.desc,
      // onDelete: ()=>{},
      // onChange: ()=>{},
    }, vNode(Controller_Wrapper, {
      field: field,
      data: dict_data?.[field?.field_name],
      onDataChange: (newData)=>{
        set_dict_data(newData);
        props?.onDataChange?.(dict_data);
      },
    }))),
  );
};

const FormControlMap = {
  "labeled": {
    "default": "TD_Select_for_Labeled",
    "select": "TD_Select_for_Labeled",
    "ratio": "TD_Radio_for_Labeled",
    "rate": "TD_Rate_for_Labeled",
    "buttons": "TD_RadioButtons_for_Labeled",
    "reference": "My_ReferenceEditor_for_Labeled",
  },

  "string": {
    "default": "TD_Input",
    "input": "TD_Input",
    "textarea": "TD_Textarea",
    "reference": "My_ReferenceEditor_for_String",
  },
  "number": {
    "default": "TD_InputNumber",
    "input": "TD_InputNumber",
    "rate": "TD_Rate_for_Number",
    "slider": "TD_Slider_for_number",
  },
  "boolean": {
    "default": "TD_Switch",
    "switch": "TD_Switch",
    "ratio": "TD_Radio_for_Boolean",
    "buttons": "TD_RadioButtons_for_Boolean",
  },

  "date": {
    "default": "TD_DatePicker",
    "pick": "TD_DatePicker",
  },
  "time": {
    "default": "TD_TimePicker",
    "pick": "TD_TimePicker",
  },
  "datetime": {
    "default": "My_DataTimePicker",
    "pick": "My_DataTimePicker",
  },

  "range": {
    "default": "TD_RangeInput",
    "input": "TD_RangeInput",
  },
  "range_of_number": {
    "default": "TD_RangeInput_for_NumberRange",
    "input": "TD_RangeInput_for_NumberRange",
  },
  "range_of_date": {
    "default": "TD_DateRangePicker",
    "pick": "TD_DateRangePicker",
  },
  "range_of_time": {
    "default": "TD_TimeRangePicker",
    "pick": "TD_TimeRangePicker",
  },
  "range_of_datetime": {
    "default": "My_DataTimeRangePicker",
    "pick": "My_DataTimeRangePicker",
  },
  "range_of_dict": {
    "default": "My_DictRangePicker",
    "pick": "My_DictRangePicker",
  },

  "dict": {
    "default": "My_DictEditor",
    "edit": "My_DictEditor",
  },

  "array": {
    "default": "My_FreeArrayEditor",
  },
  "array_of_labeled": {
    "default": "TD_Select_for_LabeledArray",
    "select": "TD_Select_for_LabeledArray",
    "select_or_input": "TD_SelectInput_for_LabeledArray",
    "checkbox": "TD_Checkbox_for_LabeledArray",
    "transfer": "TD_Transfer_for_LabeledArray",
  },
  "array_of_string": {
    "default": "TD_TagInput_for_StringArray",
    "input": "TD_TagInput_for_StringArray",
  },
  "array_of_number": {
    "default": "TD_TagInput_for_NumberArray",
    "input": "TD_TagInput_for_NumberArray",
    "add": "My_NubmerArrayEditor",
  },
  "array_of_boolean": {
    "default": "TD_TagInput_for_BooleanArray",
    "input": "TD_TagInput_for_BooleanArray",
    "add": "My_BoolArrayEditor",
  },
  "array_of_date": {
    "default": "My_DateArrayEditor",
    "pick_and_add": "My_DateArrayEditor",
  },
  "array_of_time": {
    "default": "My_TimeArrayEditor",
    "pick_and_add": "My_TimeArrayEditor",
  },
  "array_of_datetime": {
    "default": "My_DateTimeArrayEditor",
    "add": "My_DateTimeArrayEditor",
  },
  "array_of_range": {
    "default": "My_RangeArrayEditor",
    "add": "My_RangeArrayEditor",
  },
  "array_of_dict": {
    "default": "My_DictArrayEditor",
    "add": "My_DictArrayEditor",
  },
  "array_of_array": {
    "default": "My_ArrayArrayEditor",
    "add": "My_ArrayArrayEditor",
  },
  "array_of_any": {
    "default": "My_FreeArrayEditor",
    "add": "My_FreeArrayEditor",
  },

  "mixed": {
    "default": "My_FreeEditor",
  },
  "any": {
    "default": "My_FreeEditor",
  },
};

const SELF = {
  FormControlMap,

  TD_Select_for_Labeled,

  My_DictEditor,

};

export default SELF;

// 下面是要实现的组件 供参考

const TD_CompontentMap = {
  "TD_Select_for_Labeled": {
    component_name: "Select",
    initial_props: {filterable: true, creatable: undefined,},
  },
  "TD_Radio_for_Labeled": {
    component_name: "Radio",
  },
  "TD_Rate_for_Labeled": {
    component_name: "Rate",
  },
  "TD_RadioButtons_for_Labeled": {
    component_name: "Radio",
    initial_props: {variant: "default-filled",},
  },
  "TD_Input": {
    component_name: "Input",
  },
  "TD_Textarea": {
    component_name: "Textarea",
  },
  "TD_InputNumber": {
    component_name: "InputNumber",
  },
  "TD_Rate_for_Number": {
    component_name: "Rate",
  },
  "TD_Slider_for_number": {
    component_name: "Slider",
  },
  "TD_Switch": {
    component_name: "Switch",
  },
  "TD_Radio_for_Boolean": {
    component_name: "Radio",
  },
  "TD_RadioButtons_for_Boolean": {
    component_name: "Radio",
    initial_props: {variant: "default-filled",},
  },
  "TD_DatePicker": {
    component_name: "DatePicker",
  },
  "TD_TimePicker": {
    component_name: "TimePicker",
  },
  "TD_RangeInput": {
    component_name: "RangeInput",
  },
  "TD_RangeInput_for_NumberRange": {
    component_name: "RangeInput",
    comment: ["需要检查是否为数值"],
  },
  "TD_DateRangePicker": {
    component_name: "DateRangePicker",
  },
  "TD_TimeRangePicker": {
    component_name: "TimeRangePicker",
  },
  "TD_Select_for_LabeledArray": {
    component_name: "Select",
    initial_props: {multiple: true, filterable: true, creatable: undefined,},
  },
  "TD_SelectInput_for_LabeledArray": {
    component_name: "SelectInput",
  },
  "TD_Checkbox_for_LabeledArray": {
    component_name: "Checkbox",
  },
  "TD_Transfer_for_LabeledArray": {
    component_name: "Transfer",
  },
  "TD_TagInput_for_StringArray": {
    component_name: "TagInput",
  },
  "TD_TagInput_for_NumberArray": {
    component_name: "TagInput",
    comment: ["需要检查是否为数值"],
  },
  "TD_TagInput_for_BooleanArray": {
    component_name: "TagInput",
    comment: ["需要将输入转为布尔型"],
  },
};
const My_CompontentMap = {
  "My_ReferenceEditor_for_Labeled": {comment: ["涉及网络请求"]},
  "My_ReferenceEditor_for_String": {comment: ["涉及网络请求"]},
  "My_DataTimePicker": {},
  "My_DataTimeRangePicker": {},
  "My_DictRangePicker": {},
  "My_DictEditor": {},
  "My_FreeArrayEditor": {},
  "My_NubmerArrayEditor": {},
  "My_BoolArrayEditor": {},
  "My_DateArrayEditor": {},
  "My_TimeArrayEditor": {},
  "My_DateTimeArrayEditor": {},
  "My_RangeArrayEditor": {},
  "My_DictArrayEditor": {},
  "My_ArrayArrayEditor": {},
  "My_FreeArrayEditor": {},
  "My_FreeEditor": {},
  "My_FreeEditor": {},
};
