import { createElement as vNode, useEffect, useState } from "../../../vendor/react.js";
// import ReactRouterDom from "../../../vendor/react-router-dom.js";
// import { opreation } from "../../utils/api/king.js";
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


export function EdgeCreatePage() {
  const lang_of_last_created_item = storage.getItem('lang_of_last_created_item');

  const [form] = Form.useForm();
  const symmetric = Form.useWatch('symmetric', form);

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
      const slot0 = form.getFieldsValue(['slot0__ref_name', 'slot0__desc']);
      const slot1 = form.getFieldsValue(['slot1__ref_name', 'slot1__desc']);
      const data = form.getFieldsValue(["ref_name", "desc", "symmetric"]);
      Object.assign(data, {
        lang: "FN-Meta",
        slot0: {
          lang: "FN-Meta",
          ref_name: slot0.slot0__ref_name,
          desc: slot0.slot0__desc,
        },
      })
      if (!data.symmetric) {
        Object.assign(data, {
          slot1: {
            lang: "FN-Meta",
            ref_name: slot1.slot1__ref_name,
            desc: slot1.slot1__desc,
          },
        })
      }
      // storage.setItem('lang_of_last_created_item', form.getFieldValue("lang"));
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
      name: "ref_name",
    }, vNode(Input)),

    vNode(FormItem, {
      label: "desc",
      name: "desc",
    }, vNode(Input)),

    vNode(FormItem, {
      label: "symmetric",
      name: "symmetric",
    }, vNode(Switch)),

    vNode('div', null, [
      vNode('p', null, 'slot0'),
      vNode(FormItem, {
        label: "slot0 - 名称",
        name: "slot0__ref_name",
      }, vNode(Input)),
  
      vNode(FormItem, {
        label: "slot0 - desc",
        name: "slot0__desc",
      }, vNode(Input)),
    ]),

    symmetric ? '': vNode('div', null, [
      vNode('p', null, 'slot1'),
      vNode(FormItem, {
        label: "slot1 - 名称",
        name: "slot1__ref_name",
      }, vNode(Input)),
  
      vNode(FormItem, {
        label: "slot1 - desc",
        name: "slot1__desc",
      }, vNode(Input)),
    ]),

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
