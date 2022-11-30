import { createElement as vNode, useEffect, useState } from "../../../vendor/react.js";
// import ReactRouterDom from "../../../vendor/react-router-dom.js";
// import storage from "../../utils/store.js";
// import { postEdge } from "../../utils/api/edge.js";
import { EntryApi } from "../../utils/api/api.js";
const { createEntries } = EntryApi;
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
  // const lang_of_last_created_item = storage.getItem('lang_of_last_created_item');

  const [form] = Form.useForm();
  const symmetric = Form.useWatch('symmetric', form);

  // useEffect(()=>{
  //   form.setFieldsValue({
  //     lang: lang_of_last_created_item,
  //   });
  // }, []);

  const onSubmit = async (evt) => {
    if (evt.validateResult === true) {
      const data = form.getFieldsValue(true);


      data._schema = "EdgeProfile";
      // TODO  这个应该是设置项


      // storage.setItem('lang_of_last_created_item', form.getFieldValue("lang"));
      console.log(evt);
      console.log(data);
      MessagePlugin.info(JSON.stringify(data));
      // const wrapped = await postEdge([data]);
      const wrapped = await createEntries([data]);
      console.log(wrapped);
      MessagePlugin.info(JSON.stringify(wrapped));
    };
  };
  const onReset = async (evt) => {
    console.log(evt);
    MessagePlugin.info(JSON.stringify(evt));
  };

  // 自定义异步校验器
  function refnameValidator(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const data = form.getFieldsValue(true);
        let hasSame = false;

        const ref_names = {};
        let curr = data?.ref_name;
        if (curr != undefined) {
          ref_names[curr] = 1;
        }
        curr = data?.slot0?.ref_name;
        if (curr != undefined) {
          if (curr in ref_names) {
            hasSame = true;
          }
          ref_names[curr] = 1;
        }
        curr = data?.slot1?.ref_name;
        if (curr != undefined) {
          if (curr in ref_names) {
            hasSame = true;
          }
          ref_names[curr] = 1;
        }
        resolve(!hasSame);
        clearTimeout(timer);
      });
    });
  }


  return vNode(Form, {
    form: form,
    colon: false,
    labelWidth: 160,
    onSubmit,
    onReset,
  }, [

    vNode(FormItem, {
      label: 'lang',
      name: "lang",
      initialData: "FN-Meta",
    }, vNode(Input, {disabled: true,})),

    vNode(FormItem, {
      label: "名称",
      name: "ref_name",
      rules: [{required: true},{validator: refnameValidator, message: 'ref_name不能重复'}],
    }, vNode(Input)),

    vNode(FormItem, {
      label: "desc",
      name: "desc",
    }, vNode(Input)),

    vNode(FormItem, {
      label: "symmetric",
      name: "symmetric",
      initialData: false,
    }, vNode(Switch)),

    vNode('div', null, [
      vNode('p', null, 'slot0'),
      vNode(FormItem, {
        label: 'lang',
        name: ['slot0', "lang"],
        initialData: "FN-Meta",
      }, vNode(Input, {disabled: true,})),
      vNode(FormItem, {
        label: "slot0 - 名称",
        rules: [{required: true},{validator: refnameValidator, message: 'ref_name不能重复'}],
        name: ['slot0', 'ref_name'],
      }, vNode(Input)),
      
      vNode(FormItem, {
        label: "slot0 - desc",
        name: ['slot0', 'desc'],
      }, vNode(Input)),
    ]),

    symmetric ? '': vNode('div', null, [
      vNode('p', null, 'slot1'),
      vNode(FormItem, {
        label: 'lang',
        name: ['slot1', "lang"],
        initialData: "FN-Meta",
      }, vNode(Input, {disabled: true,})),
      vNode(FormItem, {
        label: "slot1 - 名称",
        rules: [{required: true},{validator: refnameValidator, message: 'ref_name不能重复'}],
        name: ['slot1', 'ref_name'],
      }, vNode(Input)),
  
      vNode(FormItem, {
        label: "slot1 - desc",
        name: ['slot1', 'desc'],
      }, vNode(Input)),
    ]),

    vNode(FormItem, null, vNode(Space, {
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
