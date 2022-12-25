import { createElement as vNode, useEffect, useState, Component } from "../../vendor/react.js";
import TDesign from "../../vendor/tdesign.min.js";
window.__TDesign = TDesign;
// const {
//   Form, Input, InputAdornment, InputNumber, RangeInput, Textarea, Radio, Checkbox, Button, Switch, Select, Space, Cascader, TagInput, MessagePlugin, Tooltip, Popup, Divider, Tabs, SelectInput, Slider, TimePicker, DatePicker, DateRangePicker, TimeRangePicker,
// } = TDesign;

import { EntryApi } from "./api/api.js";

import BS from "./bs.js";
import engine from "./engine.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;

import Controller_Wrapper__ from "../components/controls/Controller_Wrapper.js";
import My_DictEditor__ from "../components/controls/My_DictEditor.js";

export const Controller_Wrapper = Controller_Wrapper__;
export const My_DictEditor = My_DictEditor__;


export const TD_TagInput_for_StringArray = (props) => {
  return vNode(TDesign['TagInput'], {
    // autoWidth: true,
    tips: props?.field?.tips ?? "输入多个文本内容，按回车键分隔或确定",
    dragSort: true,
    clearable: true,
    defaultValue: props?.data ?? props?.field?.default ?? [],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_TagInput_for_NumberArray = (props) => {
  const [list, set_list] = useState(props?.data ?? props?.field?.default ?? []);
  return vNode(TDesign['TagInput'], {
    // autoWidth: true,
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
      props?.onDataChange?.(numbers);
    },
  });
};

export const My_NubmerArrayEditor = props => {
  const [list, set_list] = useState(props?.data ?? props?.field?.default ?? []);
};

// export const TD_InputNumber = (props) => {
//   return vNode(TDesign['InputNumber'], {
//     max: props?.field?.max,
//     min: props?.field?.min,
//     defaultValue: (+(props?.data ?? props?.field?.default ?? 0)),
//     onChange: (newData)=>{props?.onDataChange?.(+newData);},
//   });
// };

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
    // autoWidth: true,
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
      props?.onDataChange?.(bools);
    },
  });
};

export const TD_Select_for_Labeled = (props) => {
  return vNode(TDesign['Select'], {
    // autoWidth: true,
    filterable: true,
    creatable: props?.field?.creatable,
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_Select_for_LabeledArray = (props) => {
  return vNode(TDesign['Select'], {
    // autoWidth: true,
    multiple: true,
    filterable: true,
    creatable: props?.field?.creatable,
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default ?? [],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_Checkbox_for_LabeledArray = (props) => {
  return vNode(TDesign.Checkbox.Group, {
    options: (props?.field?.options??["foo", "bar"]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default ?? [],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_Transfer_for_LabeledArray = (props) => {
  return vNode(TDesign['Transfer'], {
    // autoWidth: true,
    targetSort: "push",
    search: true,
    showCheckAll: true,
    data: (props?.field?.options??["foo", "bar"]).map(it=>({label: it, value: it, disabled: false,})),
    defaultValue: props?.data ?? props?.field?.default ?? [],
    onChange: (newData)=>{console.log(newData);props?.onDataChange?.(newData);},
    onCheckedChange: (newData)=>{console.log(newData);props?.onDataChange?.(newData);},
  });
};

export const TD_Radio_for_Labeled = (props) => {
  return vNode(TDesign.Radio.Group, {
    options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_Radio_for_Boolean = (props) => {
  return vNode(TDesign.Radio.Group, {
    options: [{label: 'false', value: false}, {label: 'true', value: true}],
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_RadioButtons_for_Labeled = (props) => {
  return vNode(TDesign.Radio.Group, {
    // options: (props?.field?.options??[]).map(it=>({label: it, value: it})),
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
    variant: "default-filled",
  }, (props?.field?.options??[]).map(it=>vNode(TDesign.Radio.Button, {value: it}, it)));
};

export const TD_RadioButtons_for_Boolean = (props) => {
  return vNode(TDesign.Radio.Group, {
    // options: [{label: 'false', value: false}, {label: 'true', value: true}],
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
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
    onChange: (newData)=>{props?.onDataChange?.(options[newData-1]);},
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
    onChange: (newData)=>{props?.onDataChange?.(0+(+texts[newData-1]));},
  });
};

export const TD_Input = (props) => {
  return vNode(TDesign['Input'], {
    // autoWidth: true,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_RangeInput = (props) => {
  return vNode(TDesign['RangeInput'], {
    // autoWidth: true,
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{
      if (!Array.isArray(newData)) {
        newData = [newData, newData];
      };
      props?.onDataChange?.(newData);
    },
  });
};

export const TD_RangeInput_for_NumberRange = (props) => {

  const default_value = props?.data
  ?? props?.field?.default
  ?? [(props?.field?.min ?? props?.field?.max ?? 0), (props?.field?.max ?? props?.field?.min ?? 0)];

  return vNode(TDesign['RangeInput'], {
    // autoWidth: true,
    max: props?.field?.max,
    min: props?.field?.min,
    defaultValue: default_value,
    onChange: (newData)=>{
      if (!Array.isArray(newData)) {
        newData = [(+newData), (+newData)];
      };
      const numbers = newData.map(it=>(+it));
      props?.onDataChange?.(numbers);
    },
  });
};

export const TD_InputNumber = (props) => {
  return vNode(TDesign['InputNumber'], {
    max: props?.field?.max,
    min: props?.field?.min,
    defaultValue: (+(props?.data ?? props?.field?.default ?? 0)),
    onChange: (newData)=>{props?.onDataChange?.(+newData);},
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
      set_value(+newValue);
      props?.onDataChange?.(+newValue);
    },
  });
};

export const TD_Slider_for_NumberRange = (props) => {

  const default_value = props?.data
  ?? props?.field?.default
  ?? [(props?.field?.min ?? props?.field?.max ?? 0), (props?.field?.max ?? props?.field?.min ?? 0)];
  const [value, set_value] = useState(default_value);

  return vNode(TDesign['Slider'], {
    range: true,
    // style: "default",
    max: props?.field?.max,
    min: props?.field?.min ?? 0,
    // label: true,
    step: props?.field?.step ?? 1,
    inputNumberProps: {},
    defaultValue: default_value,
    value: value,
    onChange: (newValue)=>{
      if (!Array.isArray(newValue)) {
        newValue = [(+newValue), (+newValue)];
      };
      set_value(newValue);
      props?.onDataChange?.(newValue);
    },
  });
};

export const TD_Textarea = (props) => {
  return vNode(TDesign['Textarea'], {
    defaultValue: props?.data ?? props?.field?.default,
    onChange: (newData)=>{props?.onDataChange?.(newData);},
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
      props?.onDataChange?.(newValue);
    },
  });
};

const currentDateTimeString = () => ((new Date).toLocaleString().replace(/\//g, "-"));
const currentDateString = () => ((new Date).toLocaleDateString().replace(/\//g, "-"));
const currentTimeString = () => ((new Date).toLocaleTimeString());

export const TD_TimePicker = (props) => {
  return vNode(TDesign['TimePicker'], {
    allowInput: true,
    format: "HH:mm:ss",
    presets: props?.presets,  // {'那时': "19:00:00"},
    disableTime: props?.disableTime,
    placeholder: props?.placeholder,
    defaultValue: props?.data ?? props?.field?.default ?? currentTimeString(),
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_TimeRangePicker = (props) => {
  return vNode(TDesign['TimeRangePicker'], {
    allowInput: true,
    format: "HH:mm:ss",
    presets: props?.presets,  // {'那时': "19:00:00"},
    disableTime: props?.disableTime,
    placeholder: props?.placeholder,
    defaultValue: props?.data ?? props?.field?.default ?? [currentTimeString(), currentTimeString()],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_DatePicker = (props) => {
  return vNode(TDesign['DatePicker'], {
    allowInput: true,
    format: "YYYY-MM-DD",
    presets: props?.presets,  // {'那天': "2110-01-10"},
    disableDate: props?.disableDate,
    firstDayOfWeek: props?.firstDayOfWeek,
    placeholder: props?.placeholder,
    defaultValue: props?.data ?? props?.field?.default ?? currentDateString(),
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_DateRangePicker = (props) => {
  return vNode(TDesign['DateRangePicker'], {
    allowInput: true,
    format: "YYYY-MM-DD",
    presets: props?.presets,  // {'那天': "2110-01-10"},
    disableDate: props?.disableDate,
    firstDayOfWeek: props?.firstDayOfWeek,
    placeholder: props?.placeholder,
    defaultValue: props?.data ?? props?.field?.default ?? [currentDateString(), currentDateString()],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_DateTimePicker = (props) => {
  return vNode(TDesign['DatePicker'], {
    enableTimePicker: true,
    allowInput: true,
    disableDate: props?.disableDate,
    placeholder: props?.placeholder,
    // format: "YYYY-MM-DD HH:mm:ss",
    defaultValue: props?.data ?? props?.field?.default ?? currentDateTimeString(),
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};

export const TD_DateTimeRangePicker = (props) => {
  return vNode(TDesign['DateRangePicker'], {
    enableTimePicker: true,
    allowInput: true,
    disableDate: props?.disableDate,
    placeholder: props?.placeholder,
    // format: "YYYY-MM-DD HH:mm:ss",
    defaultValue: props?.data ?? props?.field?.default ?? [currentDateTimeString(), currentDateTimeString()],
    onChange: (newData)=>{props?.onDataChange?.(newData);},
  });
};


// "TD_DatePicker": {
//   component_name: "DatePicker",
// },


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
    "default": "TD_DateTimePicker",
    "pick": "TD_DateTimePicker",
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
    "default": "TD_DateTimeRangePicker",
    "pick": "TD_DateTimeRangePicker",
  },
  // "range_of_dict": {
  //   "default": "My_DictRangePicker",
  //   "pick": "My_DictRangePicker",
  // },

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
    "checkbox": "TD_Checkbox_for_LabeledArray",
    // "transfer": "TD_Transfer_for_LabeledArray",
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
  TD_Radio_for_Labeled,
  TD_RadioButtons_for_Labeled,
  TD_Rate_for_Labeled,

  TD_Select_for_LabeledArray,
  TD_Checkbox_for_LabeledArray,
  TD_Transfer_for_LabeledArray,

  TD_Radio_for_Boolean,
  TD_RadioButtons_for_Boolean,

  TD_Input,
  TD_Textarea,

  TD_Rate_for_Number,
  TD_InputNumber,
  TD_Slider_for_Number,

  TD_Switch,

  TD_DatePicker,
  TD_TimePicker,
  TD_DateTimePicker,

  TD_RangeInput,

  TD_RangeInput_for_NumberRange,
  TD_Slider_for_NumberRange,

  TD_TimeRangePicker,
  TD_DateRangePicker,
  TD_DateTimeRangePicker,

  TD_TagInput_for_StringArray,
  TD_TagInput_for_NumberArray,
  TD_TagInput_for_BooleanArray,

  My_DictEditor,
};

export default SELF;

// 下面是要实现的组件 供参考

const My_CompontentMap = {
  "My_ReferenceEditor_for_Labeled": {comment: ["涉及网络请求"]},
  "My_ReferenceEditor_for_String": {comment: ["涉及网络请求"]},

  // "My_DictEditor": {},

  "My_FreeArrayEditor": {},
  "My_NubmerArrayEditor": {},
  "My_BoolArrayEditor": {},
  "My_DateArrayEditor": {},
  "My_TimeArrayEditor": {},
  "My_DateTimeArrayEditor": {},
  "My_RangeArrayEditor": {},
  "My_DictArrayEditor": {},
  "My_ArrayArrayEditor": {},

  "My_FreeEditor": {},
};
