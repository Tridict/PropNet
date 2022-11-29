import { createElement as vNode, useEffect, useState } from "../../../vendor/react.js";
// import ReactRouterDom from "../../../vendor/react-router-dom.js";
import { getEdges } from "../../utils/api/edge.js";
import { postFrame } from "../../utils/api/frame.js";
import storage from "../../utils/store.js";
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
// import TDesignIcons from '../../../vendor/tdesign-icons-react.js';
// const { MinusCircleIcon } = TDesignIcons;
const { FormItem, FormList } = Form;

function FrameSlot({remove, refnameValidator, key, idx, name, ...restField}) {
  return vNode(FormItem, {key}, [
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
    vNode(FormItem, null, vNode(Button, {theme: "danger", variant:"dashed", shape: "round", onClick: ()=>remove(name)}, '删')),
  ])
}

function FrameRelation({remove, relationSlotValidator, edgeOptions, key, idx, name, ...restField}) {
  return vNode(FormItem, {key}, [
    // vNode(Divider, {}, 'relation'+idx), 
    vNode(FormItem, {
      ...restField,
      className: "d-none",
      label: "lang",
      name: [name, "lang"],
      initialData: "FN-Meta",
    }, vNode(Input, {disabled: true,})),
    vNode(FormItem, {
      ...restField,
      label: "edge",
      name: [name, "edge_ref_name"],
    }, vNode(Select, {options: edgeOptions})),
    vNode(FormItem, {
      ...restField,
      label: "slot0",
      name: [name, "slot0_ref_name"],
      rules: [{ required: true, type: 'error' },{validator: relationSlotValidator, message: 'ref_name不存在，请先添加slot'}],
    }, vNode(Input)),
    vNode(FormItem, {
      ...restField,
      label: "slot1",
      name: [name, "slot1_ref_name"],
      rules: [{ required: true, type: 'error' },{validator: relationSlotValidator, message: 'ref_name不存在，请先添加slot'}],
    }, vNode(Input)),
    vNode(FormItem, null, [
      vNode(Button, {theme: "danger", variant: "dashed", shape: "round", onClick: ()=>remove(name)}, '删')]),
  ])
}


export function FrameCreatePage() {
  // const lang_of_last_created_item = storage.getItem('lang_of_last_created_item');

  const [form] = Form.useForm();
  // const symmetric = Form.useWatch('symmetric', form);

  // const [edge, setEdge] = useState('');
  const [edgeOptions, changeEdgeOptions] = useState([
    { label: '丈夫-夫妇-妻子', value: '夫妇'},
    { label: '父亲-feiowjfieowjfo-孩子', value: 'feiowjfieowjfo'},
    { label: '母亲-32jriojdewio-孩子', value: '32jriojdewio'},
   ]);
  // const onChangeEdge = (value) => {
  //   setEdge(value);
  // };

  useEffect(async()=>{
    // 初始化 edgeOptions 的数据
    const edges = await getEdges();
    changeEdgeOptions(edges);

    // form.setFieldsValue({
    //   lang: lang_of_last_created_item,
    // });
  }, []);

  const onSubmit = async (evt) => {
    if (evt.validateResult === true) {
      const data = form.getFieldsValue(true);
      // storage.setItem('lang_of_last_created_item', form.getFieldValue("lang"));
      console.log(evt);
      console.log(data);
      MessagePlugin.info(JSON.stringify(data));
      const wrapped = await postFrame([data]);
      console.log(wrapped);
      MessagePlugin.info(JSON.stringify(wrapped));
    };
  };
  const onReset = async (evt) => {
    console.log(evt);
    MessagePlugin.info(JSON.stringify(evt));
  };


  // 校验：slots的ref_name不可重复
  function refnameValidator(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const data = form.getFieldsValue(true);
        const {slots} = data;
        let hasSame = false;

        const ref_names = {};
        let curr = data.ref_name;
        if (curr != undefined) {
          ref_names[curr] = 1;
        }
        for (const key in slots) {
          curr = slots?.[key]?.ref_name;
          if (curr != undefined) {
            if (curr in ref_names) {
              hasSame = true;
              break;
            }
            ref_names[curr] = 1;
          }
        }
        resolve(!hasSame);
        clearTimeout(timer);
      });
    });
  }

  // 校验：slot{id}_ref_name必须从slots中选
  function relationSlotValidator(val) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        const {slots} = form.getFieldsValue(true);
        const ref_names = slots.map(x=>x.ref_name);
        resolve(ref_names.includes(val));
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

    vNode(Divider),

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
        vNode(Button, {theme: 'default', variant:"base", onClick: ()=>add({ref_name: '', desc: ''})}, 'Add slot')),
      ]
    ))),

    vNode(Divider),

    vNode(FormList, {name: 'relations'}, (fields, { add, remove }) => (vNode('div', null, 
      [...fields.map(
        ({ key, name, ...restField }, idx) => vNode(FrameRelation, {
          remove,
          relationSlotValidator,
          edgeOptions,
          key,
          idx,
          name,
          ...restField
        }),
      ),
      vNode(FormItem, null, 
        vNode(Button, {theme: 'default', variant:"base", onClick: ()=>add({ref_name: '', desc: ''})}, 'Add relation')),
      ]
    ))),

    vNode(Divider),

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
