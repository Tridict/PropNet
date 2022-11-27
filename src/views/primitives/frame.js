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
  Divider,
  Tabs,
} from "../../../vendor/tdesign.min.js";
// import { CloseIcon } from '../../../vendor/tdesign-icons-react/index.js';
const { FormItem, FormList } = Form;

function FrameSlot({remove, refnameValidator, key, idx, name, ...restField}) {
  return vNode(FormItem, {key}, [
    // vNode(Divider, {align: 'left'}, ['slot'+idx, 
    //   // vNode(CloseIcon),
    //   vNode(Button, {theme: "danger",  onClick: ()=>remove(name)}, '-'),
    // ]), 
    vNode(FormItem, {
      ...restField,
      className: "d-none",
      label: "lang",
      name: [name, "lang"],
      initialData: "FN-Meta",
    }, vNode(Input, {disabled: true,})),
    vNode(FormItem, {
      ...restField,
      label: "ref_name",
      name: [name, "ref_name"],
      rules: [{ required: true, type: 'error' },{validator: refnameValidator, message: 'ref_name不能重复'}],
    }, vNode(Input)),
    vNode(FormItem, {
      ...restField,
      label: "desc",
      name: [name, "desc"],
    }, vNode(Input)),
    vNode(FormItem, null, vNode(Button, {theme: "danger",  onClick: ()=>remove(name)}, '-')),
  ])
}

function FrameRelation({remove, key, idx, name, ...restField}) {
  return vNode('div', {key}, [
    vNode(Divider, {}, 'relation'+idx), 
    vNode(FormItem, {
      ...restField,
      className: "d-none",
      label: "lang",
      name: [name, "lang"],
      initialData: "FN-Meta",
    }, vNode(Input, {disabled: true,})),
    vNode(FormItem, {
      ...restField,
      label: "edge_ref_name",
      name: [name, "edge_ref_name"],
    }, vNode(Input)),
    vNode(FormItem, {
      ...restField,
      label: "slot0_ref_name",
      name: [name, "slot0_ref_name"],
    }, vNode(Input)),
    vNode(FormItem, {
      ...restField,
      label: "slot1_ref_name",
      name: [name, "slot1_ref_name"],
    }, vNode(Input)),
    vNode(FormItem, null, [
      vNode(Button, {theme: "danger", variant: "dashed", onClick: ()=>remove(name)}, 'remove')]),
  ])
}


export function FrameCreatePage() {
  // const lang_of_last_created_item = storage.getItem('lang_of_last_created_item');

  const [form] = Form.useForm();
  // const symmetric = Form.useWatch('symmetric', form);

  // useEffect(()=>{
  //   form.setFieldsValue({
  //     lang: lang_of_last_created_item,
  //   });
  // }, []);

  const [edge, setEdge] = useState('');
  const [edgeOptions, changeEdgeOptions] = useState([]);
  const onChangeEdge = (value) => {
    setEdge(value);
  };
  const onCreateEdge = (value) => {
    changeEdgeOptions(edgeOptions.concat([{ value, label: value }]));
  };

  const onSubmit = async (evt) => {
    if (evt.validateResult === true) {
      const data = form.getFieldsValue(true);
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


  // 自定义异步校验器
  function refnameValidator(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const {slots} = form.getFieldsValue(true);
        let hasSame = false;

        const ref_names = {};
        let curr;
        for (const key in slots) {
          curr = slots?.[key]?.ref_name;
          if (curr != undefined) {
            if (curr in ref_names) {
              hasSame = true;
            }
            ref_names[curr] = 1;
          }
        }
        resolve(!hasSame);
        clearTimeout(timer);
      });
    });
  }


  return vNode(Form, {
    form: form,
    colon: false,
    // labelWidth: 160,
    onSubmit,
    onReset,
  }, [
    vNode(FormList, {name: 'slots'}, (fields, { add, remove }) => (vNode('div', null, 
      [...fields.map(
        ({ key, name, ...restField }, idx) => vNode(FrameSlot, {
          remove,
          refnameValidator,
          key,
          idx,
          name,
          ...restField
        }),
      ),
      vNode(FormItem, null, 
        vNode(Button, {variant:"dashed", onClick: ()=>add({ref_name: '', desc: ''})}, 'Add slot')),
      ]
    ))),

    vNode(FormList, {name: 'relations'}, (fields, { add, remove }) => (vNode('div', null, 
      [...fields.map(
        ({ key, name, ...restField }, idx) => vNode(FrameRelation, {
          remove,
          key,
          idx,
          name,
          ...restField
        }),
      ),
      vNode(FormItem, null, 
        vNode(Button, {variant:"dashed", onClick: ()=>add({ref_name: '', desc: ''})}, 'Add relation')),
      ]
    ))),

    // vNode(FormItem, {
    //   label: "symmetric",
    //   name: "symmetric",
    // }, vNode(Switch)),

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
