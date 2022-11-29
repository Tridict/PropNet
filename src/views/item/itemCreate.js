import { createElement as vNode, useEffect, useState } from "../../../vendor/react.js";
import storage from "../../utils/store.js";
import { postItems } from "../../utils/api/item.js";
import {
  Form,
  Input,
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
} from "../../../vendor/tdesign.min.js";
const { FormItem } = Form;


export default function ItemCreatePage() {
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

  const [knownCategory, setKnownCategory] = useState([]);
  const [knownCategoryOptions, changeKnownCategoryOptions] = useState([
    {
      label: '东西', value: '东西',
      children: [
        {
          label: '生物', value: '生物',
          children: [
            { label: '人', value: '人', },
            { label: '动物', value: '动物', },
            { label: '植物', value: '植物', },
          ],
        },
        { label: '非生物', value: '非生物', },
        { label: '其他东西', value: '其他东西', },
      ],
    },
    {
      label: '事情', value: '事情',
      children: [
        { label: '子选项一', value: '2.1', },
        { label: '当选项数据展示文本过长时', value: '2.2', },
        { label: '其他事情', value: '其他事情', },
      ],
    },
    { label: '属性', value: '属性', },
    { label: '其他分类', value: '其他分类', },
  ]);
  const onChangeKnownCategory = (value) => {
    setKnownCategory(value);
  };

  const [customCategory, setCustomCategory] = useState([]);
  const onChangeCustomCategory = (value) => {
    setCustomCategory(value);
  };
  const onPasteCustomCategory = (context) => {
    console.log(context);
  };
  const onEnterCustomCategory = (context) => {
    console.log(context);
  };


  const onSubmit = async (evt) => {
    if (evt.validateResult === true) {
      const data = form.getFieldsValue(["lang", "name", "knownCategory", "customCategory"]);
      storage.setItem('lang_of_last_created_item', form.getFieldValue("lang"));
      console.log(evt);
      console.log(data);
      MessagePlugin.info(JSON.stringify(data));
      const wrapped = await postItems([data]);
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

    // vNode(FormItem, {
    //   label: "所属分类(预设)",
    //   name: "knownCategory",
    // }, vNode(Cascader, {
    //   options: knownCategoryOptions,
    //   value: knownCategory,
    //   onChange: onChangeKnownCategory,
    //   multiple: true,
    //   clearable: true,
    //   filterable: true,
    // })),

    // vNode(FormItem, {
    //   label: "所属分类(自定义)",
    //   name: "customCategory",
    // }, vNode(TagInput, {
    //   value: customCategory,
    //   onChange: onChangeCustomCategory,
    //   onPaste: onPasteCustomCategory,
    //   onEnter: onEnterCustomCategory,
    // })),

    // vNode(FormItem, {
    //   label: "ref_name",
    //   name: "ref_name",
    // }, vNode(Tooltip, {
    //   content: "跨语言同义词的共同名称",
    //   trigger: "focus",
    // }, vNode(Input))),

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