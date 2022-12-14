import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import storage from "../../utils/store.js";
import { EntryApi } from "../../utils/api/api.js";
const { createEntries } = EntryApi;
import engine from "../../utils/engine.js";
// import { My_DictEditor } from "../../utils/controls.js";
import controls_js from "../../utils/controls.js";
const { My_DictEditor } = controls_js;
import {
  Form, Input, InputAdornment, InputNumber, RangeInput, Textarea, Radio, Checkbox, Button, Switch, Select, Space, Cascader, TagInput, MessagePlugin, Tooltip, Popup, Divider, Tabs, SelectInput, Slider, TimePicker, DatePicker, DateRangePicker, TimeRangePicker,
} from "../../../vendor/tdesign.min.js";
const { FormItem, FormList } = Form;

import BS from "../../utils/bs.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;



const 整个表单 = (props) => {

  const null_option = {label: "<null> -> 完全自定义", value: null};
  const [schema_options, set_schema_options] = useState([
    null_option,
  ]);

  useEffect(()=>{
    console.log("flag0");
    engine.init().then(()=>{
      const schemas = engine?.profile?.schemas ?? [];
      const engine_schema_options = schemas.map(schema=>{
        const schema_name = schema?.name;
        const schema_instance_name = schema?.instance_name;
        const label = schema_name==schema_instance_name ? schema_name : `${schema_name} -> ${schema_instance_name}`;
        return ({label: label, value: schema_name});
      });
      engine_schema_options.unshift(null_option);
      set_schema_options(engine_schema_options);
      console.log("flag1");
    });
  }, []);

  const [data, set_data] = useState(null);

  const [current_schema, set_current_schema] = useState(props?.currentSchema);
  const [schema_selected, set_schema_selected] = useState(props?.currentSchema!=null);

  const schema_name_face = current_schema==null
  ? "<未命名的Schema>" : current_schema?.desc ? `${current_schema?.name} :  ${current_schema.desc}` : current_schema?.name==current_schema?.instance_name
  ? current_schema?.name : `${current_schema?.name} :  用于创建 ${current_schema?.instance_name}`;

  const 构架选择区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    label: "选择 Schema",
  }, vNode('div', {className: "hstack gap-2"}, [
    // vNode('div', {
    //   className: "d-inline-block",
    // }, [
      vNode(Select, {
        // autoWidth: true,
        filterable: true,
        options: schema_options,
        onChange: (value, context)=>{
          if (value!=null) {
            const schema = engine?.profile?.schemas?.find?.(it=>it.name==value);
            set_current_schema(schema);
          } else {
            set_current_schema(null);
          };
        },
      }),
    // ]),
    vNode(Button, {
      theme: "default",
      onClick: ()=>{
        set_schema_selected(true);
      },
    }, "确定"),
  ])));

  const [json_data, set_json_data] = useState("");

  const 核心区 = () => vNode(My_DictEditor, {
    formControlMap: controls_js?.FormControlMap,
    componentsDict: controls_js,
    borderless: true,
    field: {
      data_format: "dict",
      schema: current_schema,
    },
    data: data,
    onDataChange: (newData)=>{
      // console.log(JSON.stringify(data, null, 2));
      // console.log(JSON.stringify(newData, null, 2));
      set_json_data(JSON.stringify(newData, null, 2));
      // console.log(json_data);
    },
    onSave: (newData)=>{
      set_data(newData);
      // console.log(JSON.stringify(data, null, 2));
      // console.log(JSON.stringify(newData, null, 2));
      set_json_data(JSON.stringify(newData, null, 2));
      // console.log(json_data);
    },
  });

  const 临时数据显示区 = () => vNode(BsContainer, {}, [
    vNode(BsLine, {}, [
      vNode('pre', {className: "border rounded p-2"}, json_data),
    ]),
  ]);

  const 顶部标题区 = () => vNode(BsContainer, {}, vNode("h3", {
  }, `新建 ${current_schema?.instance_name??"对象"}`), current_schema?.instance_desc ? vNode("p", {
    className: "text-muted",
  }, current_schema.instance_desc) : null);

  const 构架名称区 = () => vNode(BsContainer, {
    className: "text-muted",
  }, vNode(BsLine, {
    label: "当前 Schema",
  }, schema_name_face));

  const 底部按钮区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    // label: "底部按钮区",
    noLabel: true,
  }, vNode('div', {
    className: "hstack gap-2",
  }, schema_selected ? [
    vNode(Button, {
      theme: "default",
      type: "button",
    }, "提交"),
    vNode(Button, {
      theme: "default",
      type: "button",
    }, "重置"),
    vNode(Button, {
      theme: "default",
      type: "button",
      onClick: ()=>{
        set_schema_selected(false);
      },
    }, "更换 Schema"),
  ] : [
    // vNode(Button, {
    //   theme: "default",
    //   type: "button",
    // }, "返回"),
  ])));

  return vNode('div', null, [
    vNode('div', {className: `my-4`}, 顶部标题区()),
    schema_selected ? [
      vNode('div', {className: `my-4`}, 构架名称区()),
    ] : null,
    vNode('div', {className: `my-4${schema_selected?'':' d-none'}`}, vNode(核心区)),
    vNode('div', {className: `my-4${(!schema_selected)?'':' d-none'}`}, 构架选择区()),
    vNode('div', {className: `my-4`}, vNode(临时数据显示区)),
    vNode('div', {className: `my-4`}, 底部按钮区()),
  ]);
};



export default function EntryCreatePage() {

  return vNode(整个表单);

}














// 没用的草稿

const makeCompont = () => {
  const myClass = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        xx: new Date(),
        yy: new Date(),
      };
    }
    componentDidMount() {
      this.someTaskID = setInterval(
        () => this.doSomeTask(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.someTaskID);
    }

    doSomeTask = () => {
      this.setState({xx: new Date()});
    }

    render() {
      return vNode();
    }
  };
};


