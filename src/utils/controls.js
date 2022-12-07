import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import TDesign from "../../vendor/tdesign.min.js";
window.__TDesign = TDesign;
// const {
//   Form, Input, InputAdornment, InputNumber, RangeInput, Textarea, Radio, Checkbox, Button, Switch, Select, Space, Cascader, TagInput, MessagePlugin, Tooltip, Popup, Divider, Tabs, SelectInput, Slider, TimePicker, DatePicker, DateRangePicker, TimeRangePicker,
// } = TDesign;

import { EntryApi } from "./api/api.js";

import BS from "./bs.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;


export const Controller_Wrapper = (props) => {

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
    SELF?.[selected_component_name] ? vNode(SELF[selected_component_name], {
      field: local_field,
      data: local_data,
      onDataChange: (newValue) => {
        set_local_data(newValue);
        props?.onDataChange?.(newValue);
      },
    }) : vNode('div', {}, selected_component_name),);

  return vNode(BsContainer, null, [
    ["null", "mixed", "any", undefined, null].includes(form_name) ?
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 数据形式选择区()) : null,

    control_options.length>1 ?
    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 控件选择区()) : null,

    vNode(BsLine, {noLabel: true, rowMy: "my-2"}, 具体控件区()),

    !SELF?.[selected_component_name] ?
    [
      vNode('div', {}, form_name),
      vNode('div', {}, working_form_name),
      vNode(BsLine, {noLabel: true, rowMy: "my-2"}, vNode("pre", {}, JSON.stringify({field: props?.field, data: props?.data}, null, 2))),
    ] : null,
  ]);
};




export const TD_TagInput_for_StringArray = (props) => {
  return vNode(TDesign['TagInput'], {
    tips: props?.field?.tips ?? "输入多个文本内容，按回车键分隔或确定",
    dragSort: true,
    clearable: true,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_TagInput_for_NumberArray = (props) => {
  const [list, set_list] = useState(props?.data ?? props?.field?.default ?? []);
  return vNode(TDesign['TagInput'], {
    tips: props?.field?.tips ?? "输入多个数值，按回车键分隔或确定",
    dragSort: true,
    clearable: true,
    defaultValue: list,
    value: list,
    valueDisplay: ({value, onClose})=>{
      return value?.map?.((it, idx)=>{
        return vNode(TDesign['Tag'], {
          key: `${idx}-${it}`,
          closable: true,
          onClose: ()=>{onClose(idx)},
        }, vNode('div', {}, (`${+it}`)));
      });
    },
    onChange: (newData)=>{
      const numbers = newData.map(it=>(+it));
      set_list(numbers);
      props?.onDataChange(numbers);
    },
  });
};

const toBool = (it) => {
  if (typeof(it)==="boolean") {return it;};
  if (!isNaN(Number(it))) {return it<=0 ? false : true;};
  return ['f', 'n'].includes(it?.toLowerCase?.()?.[0]) ? false : (!!it);
};
const boolLabel = it => {
  const bool = toBool(it);
  return `${bool}`==`${it}` ? `${it}` : `${it}(${bool})`;
};
export const TD_TagInput_for_BooleanArray = (props) => {
  const [list, set_list] = useState(props?.data ?? props?.field?.default ?? []);
  return vNode(TDesign['TagInput'], {
    tips: props?.field?.tips ?? "输入多个布尔值，按回车键分隔或确定",
    dragSort: true,
    clearable: true,
    defaultValue: list,
    value: list,
    valueDisplay: ({value, onClose})=>{
      return value?.map?.((it, idx)=>{
        return vNode(TDesign['Tag'], {
          key: `${idx}-${it}`,
          closable: true,
          onClose: ()=>{onClose(idx)},
        }, vNode('div', {}, boolLabel(it)));
      });
    },
    onChange: (newData)=>{
      const bools = newData.map(it=>toBool(it));
      set_list(bools);
      props?.onDataChange(bools);
    },
  });
};

export const TD_Select_for_Labeled = (props) => {
  return vNode(TDesign['Select'], {
    filterable: true,
    creatable: props?.field?.creatable,
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_Select_for_LabeledArray = (props) => {
  return vNode(TDesign['Select'], {
    multiple: true,
    filterable: true,
    creatable: props?.field?.creatable,
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_Radio_for_Labeled = (props) => {
  return vNode(TDesign.Radio.Group, {
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_Radio_for_Boolean = (props) => {
  return vNode(TDesign.Radio.Group, {
    options: [{label: 'false', value: false}, {label: 'true', value: true}],
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_RadioButtons_for_Labeled = (props) => {
  return vNode(TDesign.Radio.Group, {
    // options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
    variant: "default-filled",
  }, (props?.field?.options??[]).map(it=>vNode(TDesign.Radio.Button, {value: it}, it)));
};

export const TD_RadioButtons_for_Boolean = (props) => {
  return vNode(TDesign.Radio.Group, {
    // options: [{label: 'false', value: false}, {label: 'true', value: true}],
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
    variant: "default-filled",
  }, ([false, true]).map(it=>vNode(TDesign.Radio.Button, {value: it}, `${it}`)));
};

export const TD_Rate_for_Labeled = (props) => {
  const options = props?.field?.options ?? [];
  return vNode(TDesign['Rate'], {
    count: options.length,
    texts: options,
    showText: true,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(options[newData-1]);},
  });
};

export const TD_Rate_for_Number = (props) => {
  const min = props?.field?.min ?? (props?.field?.max!=null ? (props?.field?.max-4) : 1);
  const max = props?.field?.max ?? (props?.field?.min!=null ? (props?.field?.min+4) : 5);
  const count = max - min + 1;
  const texts = props?.field?.labels ?? Array.from(Array(count)).map((it, idx)=>(`${idx+min}`));
  return vNode(TDesign['Rate'], {
    count: count,
    // allowHalf: props?.field?.allow_half ?? false,
    texts: texts,
    showText: true,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(0+(+texts[newData-1]));},
  });
};

export const TD_Input = (props) => {
  return vNode(TDesign['Input'], {
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_InputNumber = (props) => {
  return vNode(TDesign['InputNumber'], {
    max: props?.field?.max,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_Slider_for_Number = (props) => {

  const default_value = props?.data ?? props?.field?.default ?? props?.field?.min ?? 0;
  const [value, set_value] = useState(default_value);

  return vNode(TDesign['Slider'], {
    // style: "default",
    max: props?.field?.max,
    min: props?.field?.min ?? 0,
    // label: true,
    step: props?.field?.step ?? 1,
    inputNumberProps: {},
    defaultValue: default_value,
    value: value,
    onChange: (newValue)=>{
      set_value(newValue);
      props?.onDataChange(newValue);
    },
  });
};

export const TD_Textarea = (props) => {
  return vNode(TDesign['Textarea'], {
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};

export const TD_Switch = (props) => {

  const default_value = props?.data ?? props?.field?.default;
  const [value, set_value] = useState(default_value);

  return vNode(TDesign['Switch'], {
    label: ['true', 'false'],
    defaultValue: default_value,
    value: value,
    onChange: (newValue)=>{
      set_value(newValue);
      props?.onDataChange(newValue);
    },
  });
};

export const TD_DatePicker = (props) => {
  return vNode(TDesign['DatePicker'], {
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange(newData);},
  });
};


// "TD_DatePicker": {
//   component_name: "DatePicker",
// },

export const My_DictEditor = (props) => {
  const schema = props?.field?.schema ?? {};
  const fields = schema?.fields ?? [];
  const init_dict_data = props?.data ?? {};
  const [dict_data, set_dict_data] = useState(init_dict_data);
  // https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/

  const [temp_dict_data, set_temp_dict_data] = useState(dict_data);

  const onTempChange = (field, newFieldData) => {
    const newData = {};
    Object.assign(newData, temp_dict_data);
    Object.assign(newData, {[field?.field_name]: newFieldData});
    set_temp_dict_data(newData);
    // props?.onDataChange?.(newData);
  };

  const onSave = () => {
    set_dict_data(temp_dict_data);
    props?.onSave?.(temp_dict_data);
  };

  const 添加预设字段区 = () => vNode(BsLine, {
    label: "更多字段(预设)",
    // children: "hello",
  }, []);
  const 添加自定义字段区 = () => vNode(BsLine, {
    label: "更多字段(自定义)",
  }, []);

  const labelClass = field => {
    return field?.preload ? (field?.required ? "text-warning" : "text-primary") :
    field?.default==null ? (field?.required ? "text-danger" : null) :
    field?.required ? "text-success" : "text-success" ;
  };

  return vNode(BsContainer, {
    className: props?.borderless ? undefined : "border rounded",
  },
    fields.map((field, idx)=>vNode(BsLine, {
      // key: `${field.field_name}-${idx}`,
      key: `${schema?.name}-${field.field_name}-${idx}`,
      idx: idx,
      label: field.field_name,
      tip: field?.desc,
      labelClass: labelClass(field),
      // onDelete: ()=>{},
      // onChange: ()=>{},
    }, vNode(Controller_Wrapper, {
      field: field,
      data: dict_data?.[field?.field_name],
      onDataChange: (newFieldData)=>{
        onTempChange(field, newFieldData);
      },
      onSave: onSave,
    }))),
    props?.field?.schema ? [
      vNode(BsLine, {
        label: "更多字段(预设)",
        // children: "hello",
      }, []),
    ] : null,
    (props?.field?.allow_custom==null ? true : props?.field?.allow_custom) ? [
      vNode(BsLine, {
        label: "更多字段(自定义)",
      }, []),
    ] : null,
    vNode(BsLine, {noLabel: true}, vNode(TDesign['Button'], {
      theme: "default",
      onClick: onSave,
    }, props?.saveText ?? "确定")),
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
    "slider": "TD_Slider_for_Number",
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
    "slider": "TD_Slider_for_NumberRange",
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

  Controller_Wrapper,
  TD_Select_for_Labeled,
  TD_Select_for_LabeledArray,
  TD_Radio_for_Labeled,
  TD_Radio_for_Boolean,
  TD_RadioButtons_for_Labeled,
  TD_RadioButtons_for_Boolean,
  TD_Rate_for_Labeled,
  TD_Rate_for_Number,
  TD_Input,
  TD_InputNumber,
  TD_Slider_for_Number,
  TD_Textarea,
  TD_Switch,
  TD_DatePicker,

  TD_TagInput_for_StringArray,
  TD_TagInput_for_NumberArray,
  TD_TagInput_for_BooleanArray,

  My_DictEditor,
};

export default SELF;

// 下面是要实现的组件 供参考

const TD_CompontentMap = {
  // "TD_Select_for_Labeled": {
  //   component_name: "Select",
  //   initial_props: {filterable: true, creatable: undefined,},
  // },
  // "TD_Radio_for_Labeled": {
  //   component_name: "Radio",
  // },
  // "TD_Rate_for_Labeled": {
  //   component_name: "Rate",
  // },
  // "TD_RadioButtons_for_Labeled": {
  //   component_name: "Radio",
  //   initial_props: {variant: "default-filled",},
  // },
  // "TD_Input": {
  //   component_name: "Input",
  // },
  // "TD_Textarea": {
  //   component_name: "Textarea",
  // },
  // "TD_InputNumber": {
  //   component_name: "InputNumber",
  // },
  // "TD_Rate_for_Number": {
  //   component_name: "Rate",
  // },
  // "TD_Slider_for_Number": {
  //   component_name: "Slider",
  // },
  // "TD_Switch": {
  //   component_name: "Switch",
  // },
  // "TD_Radio_for_Boolean": {
  //   component_name: "Radio",
  // },
  // "TD_RadioButtons_for_Boolean": {
  //   component_name: "Radio",
  //   initial_props: {variant: "default-filled",},
  // },

  "TD_DatePicker": {
    component_name: "DatePicker",
  },
  "TD_TimePicker": {
    component_name: "TimePicker",
  },


  "TD_Slider_for_NumberRange": {
    component_name: "Slider",
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

  // "TD_Select_for_LabeledArray": {
  //   component_name: "Select",
  //   initial_props: {multiple: true, filterable: true, creatable: undefined,},
  // },
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
