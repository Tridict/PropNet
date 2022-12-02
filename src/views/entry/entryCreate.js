import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import storage from "../../utils/store.js";
import { EntryApi } from "../../utils/api/api.js";
const { createEntries } = EntryApi;
import engine from "../../utils/engine.js";
import {
  Form, Input, InputNumber, RangeInput, Textarea, Radio, Checkbox, Button, Switch, Select, Space, Cascader, TagInput, MessagePlugin, Tooltip, Popup, Divider, Tabs, SelectInput, Slider, TimePicker, DatePicker, DateRangePicker, TimeRangePicker,
} from "../../../vendor/tdesign.min.js";
const { FormItem, FormList } = Form;



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




// const recommended_controls = {
//   string: [Input, Textarea],
//   number: [InputNumber, Slider, TimePicker, TimeRangePicker, DatePicker, DateRangePicker],
//   boolean: [Switch, Radio],

//   range: [RangeInput],
//   array_of_strings: [TagInput],
//   array_of_numbers: [TagInput],
//   array_of_booleans: [TagInput],

//   sub_dict: [Form],
//   array_of_sub_dicts: [FormList],

//   labeled: [Radio, Select, SelectInput, Checkbox],
//   array_of_labeleds: [],
// };

const control_methods = [
  "reference",
  "input",
  "switch",
  "select_one",
  "select_some",
  "input_one_by_one",
  "config_one_by_one",
  "select_control_and_act",
];
const Controllers = {
  "reference": {},
  "input": {},
  "switch": {},
  "select_one": {},
  "select_some": {},
  "input_one_by_one": {},
  "config_one_by_one": {},
  "select_control_and_act": {},
};










const 控件_选择构架 = class extends Component {
  constructor(props={}) {
    super(props);
    this.state = {
      options: [],
    };
  }
  async componentDidMount() {
    const schemas = this.props?.schemas ?? [];
    const options = schemas.map(schema=>({ label: schema.name, value: schema.name, }));
    options.push({ label: "<None>", value: null, });
    this.setState({options: options});
  }
  render() {
    const sub_props = Object.assign(this.props, this.state);
    return vNode(Select, sub_props);
  }
};

const 组件_单个字段的包裹 = class extends Component {
  constructor(props={}) {

    // field 定义
    // 要使用的控件

    super(props);

    // 1  选择具体哪种控件
    // 2  编辑状态
    // 3  只读状态 不要了
    this.state = {
      controller: "",
    };
  }
  async componentDidMount() {}
  render() {
    // 选择控件
    // 切换 只读 可编辑
  }
};

const 组件_可复用的表单 = class extends Component {
  constructor(props={}) {
    super(props);
    this.state = {
      fields: [],
    };
  }
  async componentDidMount() {}
  render() {
  }
};

const BsLine = (props) => {
  console.log(props);
  return vNode(BsRow, {
    className: "my-4",
  }, ...[
    vNode(BsCol, {
      className: "col-12 col-sm-12 col-md-3 col-lg-2",
    }, (props?.label)),
    vNode(BsCol, {
      className: "col-12 col-sm-12 col-md-9 col-lg-10",
    }, props?.children),
  ]);
};


const Controller_Line_Wrapper = (props) => {};

const Controller_of_Dict = (props) => {
  const [lines, set_lines] = useState([
    {label: "标签"},
    {label: "标签"},
  ]);
  return vNode(BsContainer, null,
    lines.map((line, idx)=>vNode(BsLine, {
      idx: idx,
      label: line.label,
      // onDelete: ()=>{},
      // onChange: ()=>{},
    })),
  );
};



const 整个表单 = (props) => {

  const [lines, set_lines] = useState([{}, {}]);
  const [schema_name, set_schema_name] = useState(props?.schema_name??"<未命名的Schema>");
  const [instance_name, set_instance_name] = useState(props?.instance_name??"对象");

  const 顶部标题区 = () => vNode(BsContainer, {}, vNode("h3", {
  }, `新建 ${instance_name}`));

  const 构架名称区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    label: "当前 Schema",
  }, schema_name));

  const 添加预设字段区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    label: "更多字段(预设)",
    // children: "hello",
  }, []));
  const 添加自定义字段区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    label: "更多字段(定义)",
  }, []));

  const 底部按钮区 = () => vNode(BsContainer, {}, vNode(BsLine, {
    label: "底部按钮区",
  }, vNode('div', {
    className: "hstack gap-2",
  }, [
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
    }, "更换 Schema"),
  ])));

  return vNode('div', null, [
    vNode('div', {className: "my-4"}, 顶部标题区()),
    vNode('div', {className: "my-4"}, vNode(Controller_of_Dict, {
      lines: lines,
      set_lines: set_lines,
    })),
    vNode('div', {className: "my-4"}, 添加预设字段区()),
    vNode('div', {className: "my-4"}, 添加自定义字段区()),
    vNode('div', {className: "my-4"}, 构架名称区()),
    vNode('div', {className: "my-4"}, 底部按钮区()),
  ]);
};


const 整个表单__ = class extends Component {
  constructor(props={}) {
    super(props);
    this.state = {
      schemas: [],
      fields: [],
      lines: [{}, {}],
    };
  }
  async componentDidMount() {
    const logger = function logger ({content, style, duration, details}) {
      const style_ = (MessagePlugin[style]!=null) ? style : "info";
      MessagePlugin[style_]?.(content??JSON.stringify(details));
    };
    await engine.init({logger: logger});
    const schemas = engine?.profile?.schemas ?? [];
    this.setState({schemas: schemas});
  }

  render() {
    return vNode('div', null, ...[
      vNode('div'),
      vNode('div'),
      vNode('div'),
    ]);
    return vNode(Controller_of_Dict);
  }
};






const 区块_标题区 = () => {
  return vNode();
};

const 块_添加预设字段 = () => {
  return vNode();
};

const 块_添加自定义字段 = () => {
  return vNode();
};

const 块_单个字段 = () => {
  return vNode();
};



export default function EntryCreatePage() {
  const lang_of_last_created_item = storage.getItem('lang_of_last_created_item');

  const [form] = Form.useForm();

  useEffect(()=>{
    form.setFieldsValue({
      lang: lang_of_last_created_item,
    });
  }, []);

  const [lang, setLang] = useState('');
  const [langOptions, changeLangOptions] = useState([
    { label: '普通话', value: 'zh-cn' },
    { label: '美式英语', value: 'en-us' },
    { label: '元语言', value: 'FN-Meta' },
    { label: '(留空)', value: null },
  ]);
  const onChangeLang = (value) => {
    setLang(value);
  };
  const onCreateLang = (value) => {
    changeLangOptions(langOptions.concat([{ value, label: value }]));
  };



  const onSubmit = async (evt) => {
    if (evt.validateResult === true) {
      const data = form.getFieldsValue(["lang", "name", "knownCategory", "customCategory"]);
      storage.setItem('lang_of_last_created_item', form.getFieldValue("lang"));
      console.log(evt);
      console.log(data);
      MessagePlugin.info(JSON.stringify(data));
      const wrapped = await createEntries([data]);
      console.log(wrapped);
      MessagePlugin.info(JSON.stringify(wrapped));
    };
  };
  const onReset = async (evt) => {
    console.log(evt);
    MessagePlugin.info(JSON.stringify(evt));
  };


  const rules = {
    name: [
      { required: true, message: '必填', type: 'error' },
    ],
  };

  return vNode(Form, {
    form: form,
    colon: false,
    labelWidth: 160,
    rules,
    onSubmit,
    onReset,
  }, [

    vNode(整个表单),

    // vNode(FormItem, {
    //   label: "构架",
    //   name: "_schema",
    // }, vNode(控件_选择构架, {className: "flag1"})),

    vNode(FormItem, {
      label: "名称",
      name: "name",
    }, vNode(Input)),

    vNode(FormItem, {
      label: "语言",
      name: "lang",
    }, vNode(Select, {
      value: lang,
      onChange: onChangeLang,
      options: langOptions,
      filterable: true,
      creatable: true,
      clearable: true,
      onCreate: onCreateLang,
    })),

    vNode(FormItem, {
      name: "submitButton",
    }, vNode(Space, {
      direction: "horizontal",
      size: "small",
      align: "center",
    }, [
      vNode(Button, {
        theme: "primary",
        type: "submit",
      }, "提交"),
      vNode(Button, {
        theme: "default",
        // variant: "base",
        type: "reset",
      }, "重置"),
    ])),
  ]);
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


