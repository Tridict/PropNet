import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import storage from "../../utils/store.js";
import { EntryApi } from "../../utils/api/api.js";
const { createEntries } = EntryApi;
import engine from "../../utils/engine.js";
import {
  Form,
  Input,
  InputNumber,
  RangeInput,
  Textarea,
  Radio,
  Checkbox,
  Button,
  Switch,
  Select,
  Space,
  Cascader,
  TagInput,
  MessagePlugin,
  Tooltip,
  Popup,
  Divider,
  Tabs,
  SelectInput,
  Slider,
  TimePicker,
  DatePicker,
  DateRangePicker,
  TimeRangePicker,
} from "../../../vendor/tdesign.min.js";
const { FormItem, FormList } = Form;


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



const logger = function logger ({content, style, duration, details}) {
  const style_ = (MessagePlugin[style]!=null) ? style : "info";
  MessagePlugin[style_]?.(content??JSON.stringify(details));
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
    super(props);
    // 1  选择具体哪种控件
    // 2  编辑状态
    // 3  只读状态 不要了
    this.state = {
      field: {},
    };
  }
  async componentDidMount() {}
  render() {
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

const 整个表单 = class extends Component {
  constructor(props={}) {
    super(props);
    this.state = {
      schemas: [],
    };
  }
  async componentDidMount() {
    await engine.init({logger: logger});
    const schemas = engine?.profile?.schemas ?? [];
    this.setState({schemas: schemas});
  }
  render() {
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

    vNode(FormItem, {
      label: "构架",
      name: "_schema",
    }, vNode(控件_选择构架, {className: "flag1"})),

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

