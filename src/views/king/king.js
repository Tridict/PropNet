import { createElement as vNode, useEffect } from "../../../vendor/react.js";
// import { opreation } from "../../utils/api/king.js";
import { KingApi } from "../../utils/api/api.js";
const { opreation } = KingApi;
import storage from "../../utils/store.js";
import ReactRouterDom from "../../../vendor/react-router-dom.js";
import {
  Form,
  Input,
  Textarea,
  Radio,
  Checkbox,
  Button,
  Switch,
  MessagePlugin,
  DatePicker,
  Tooltip,
  Space,
} from "../../../vendor/tdesign.min.js";
const { FormItem } = Form;

export default function King() {
  const old_king_form = storage.getItem('old_king_form');

  const [form] = Form.useForm();
  const tableName = Form.useWatch('tableName', form);
  const operatorName = Form.useWatch('operatorName', form);
  const kwargsJsonText = Form.useWatch('kwargsJsonText', form);

  useEffect(()=>{
    form.setFieldsValue({
      tableName: old_king_form.table,
      operatorName: old_king_form.operator,
      kwargsJsonText: JSON.stringify(old_king_form.kwargs, null, 2),
    });
  }, []);

  const rules = {
    tableName: [
      { required: true, message: '必填', type: 'error' },
    ],
    operatorName: [
      { required: true, message: '必填', type: 'error' },
      {
        enum: [
          'insert_one', 'update_one', 'delete_one',
          'insert_many', 'update_many', 'delete_many',
          'replace_one', 'find_one_and_replace',
          'find', 'aggregate',
          'find_one', 'count_documents',
        ], message: '不存在的方法', type: 'error' },
    ],
    kwargsJsonText: [
      {
        validator: (val)=>{
          try {JSON.parse(val); return true;} catch(err) {return false;};
        }, message: '无法正确执行 json.parse' }
    ],
  };

  const onSubmit = async (evt) => {
    console.log(evt);
    const data = {
      table: tableName,
      operator: operatorName,
      kwargs: JSON.parse(kwargsJsonText),
    };
    storage.setItem('old_king_form', data);
    const wrapped = await opreation(data, (({wrapped})=>{
      MessagePlugin.info(JSON.stringify(wrapped));
    }));
    console.log(wrapped);
  };
  const onReset = async (evt) => {
    console.log(evt);
    MessagePlugin.info('重置成功');
  };

  return vNode(Form, {
    form: form,
    // onSubmit: async(evt)=>{await onSubmit(evt);},
    onSubmit,
    onReset,
    rules,
    colon: true,
    labelWidth: 100,
  }, [
    vNode(FormItem, {
      label: "table",
      name: "tableName",
    }, vNode(Input)),
    vNode(FormItem, {
      label: "operator",
      name: "operatorName",
    }, vNode(Input)),
    vNode(FormItem, {
      label: "kwargs",
      name: "kwargsJsonText",
    }, vNode(Textarea)),
    vNode(FormItem, {
      name: "submitButton",
    }, vNode(Space, {
      direction: "horizontal",
      size: "small",
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
