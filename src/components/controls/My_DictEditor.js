import { createElement as vNode, useEffect, useState, Component } from "../../../vendor/react.js";
import TDesign from "../../../vendor/tdesign.min.js";
window.__TDesign = TDesign;

import BS from "../../utils/bs.js";
import engine from "../../utils/engine.js";
const {
  BsDiv,
  BsContainer,
  BsRow,
  BsCol,
  BsLine,
} = BS;

import Controller_Wrapper from './Controller_Wrapper.js';

const My_DictEditor = (props) => {

  const FormControlMap = props?.formControlMap ?? {};
  const ComponentsDict = props?.componentsDict ?? {};

  const init_dict_data = props?.data ?? {};
  const [dict_data, set_dict_data] = useState(init_dict_data);
  const [temp_dict_data, set_temp_dict_data] = useState(dict_data);

  const [schema, set_schema] = useState();

  const [shown_fields, set_shown_fields] = useState([]);
  const [unshown_fields, set_unshown_fields] = useState([]);
  const [hidden_fields, set_hidden_fields] = useState([]);
  const [custom_fields, set_custom_fields] = useState([]);
  const [field_name_to_add, set_field_name_to_add] = useState("");

  async function init () {
    console.log('init')
    let schema__ = props?.field?.schema ?? {};
    console.log(schema__);
    if (schema__['_refer_to']!=null) {
      schema__ = await engine.parseRefer(schema__['_refer_to']);
    };
    set_schema(schema__);
    const fields = schema__?.fields ?? [];
    console.log(fields);
    updateFiedls(fields);
  }

  function updateFiedls(fields) {
    const initial_shown_fields = [];
    const initial_unshown_fields = [];
    const initial_hidden_fields = [];
    for (const field of fields) {
      if (field?.field_name in init_dict_data && init_dict_data[field?.field_name]!==undefined) {
        initial_shown_fields.push(field);
        continue;
      };
      if (field?.hidden) {
        initial_hidden_fields.push(field);
        continue;
      };
      if (field?.default==null&&field?.required) {
        initial_shown_fields.push(field);
        continue;
      };
      if (field?.preload) {
        initial_shown_fields.push(field);
        continue;
      };
      initial_unshown_fields.push(field);
      continue;
    };
    set_shown_fields(initial_shown_fields);
    set_unshown_fields(initial_unshown_fields);
    set_hidden_fields(initial_hidden_fields);
    console.log(shown_fields);
  }

  useEffect(()=>{
    init();
    return function cleanup() {};
  }, [props.field]);

  const judgeReomvable = field => {
    if (field?.default==null&&field?.required) {
      return false;
    };
    return true;
  };

  const onTempChange = (field, newFieldData) => {
    const newData = {};
    Object.assign(newData, temp_dict_data);
    Object.assign(newData, {[field?.field_name]: newFieldData});
    set_temp_dict_data(newData);
    // props?.onDataChange?.(newData);
  };

  const onSave = () => {
    set_dict_data(temp_dict_data);
    props?.onSave?.(temp_dict_data);
  };

  const onAddField = (field_name) => {
    const new_shown_fields = [...shown_fields];
    const the_field = unshown_fields.find(it=>it?.field_name == field_name);
    if (the_field!=null) {
      new_shown_fields.push(the_field);
      set_shown_fields(new_shown_fields);
    };
    const new_unshown_fields = unshown_fields.filter(it=>it?.field_name != field_name);
    set_unshown_fields(new_unshown_fields);
  };
  const onRemoveField = (field_name) => {
    const new_unshown_fields = [...unshown_fields];
    const the_field = shown_fields.find(it=>it?.field_name == field_name);
    if (the_field!=null) {
      new_unshown_fields.push(the_field);
      set_unshown_fields(new_unshown_fields);
      onTempChange(the_field, undefined);
    };
    const new_shown_fields = shown_fields.filter(it=>it?.field_name != field_name);
    set_shown_fields(new_shown_fields);
  };

  const fieldLabelClass = field => {
    return (field?.default==null && field?.required) ? "text-danger" :
    field?.preload ? (field?.required ? "text-warning" : "text-primary") :
    field?.required ? "text-success" : "text-success" ;
  };

  const 添加预设字段区 = () => vNode(BsLine, {
    label: "更多字段(预设)",
    // children: "hello",
  }, [
    vNode('div', {className: "hstack gap-2"}, [
      vNode(TDesign['Select'], {
        // autoWidth: true,
        options: unshown_fields.map(it=>({label: it.field_name, value: it.field_name,})),
        onChange: (new_field_name_to_add)=>{
          set_field_name_to_add(new_field_name_to_add);
        },
      }),
      vNode(TDesign['Button'], {
        theme: "default",
        onClick: ()=>{
          onAddField(field_name_to_add);
        },
      }, "添加"),
    ]),
  ]);
  const 添加自定义字段区 = () => {
    return null;
    // return vNode(BsLine, {
    //   label: "更多字段(自定义)",
    // }, []);
  };

  return vNode(BsContainer, {
    className: props?.borderless ? undefined : "border rounded",
  },
    shown_fields.map((field, idx)=>vNode(BsLine, {
      // https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/
      // key: `${field.field_name}-${idx}`,
      key: `${schema?.name}-${field.field_name}-${idx}`,
      idx: idx,
      label: field.field_name,
      tip: field?.desc ? (field?.default!=null ? `${field?.desc}\ndefault: ${JSON.stringify(field?.default)}` : field?.desc) : field?.default!=null ? `default: ${JSON.stringify(field?.default)}` : null,
      // labelClass: fieldLabelClass(field),
      deletable: judgeReomvable(field),
      deleteFlag: field.field_name,
      onDelete: (field_name)=>{onRemoveField(field_name)},
      // onChange: ()=>{},
    }, vNode(Controller_Wrapper, {
      formControlMap: FormControlMap,
      componentsDict: ComponentsDict,
      field: field,
      data: dict_data?.[field?.field_name],
      onDataChange: (newFieldData)=>{
        onTempChange(field, newFieldData);
      },
      onSave: onSave,
    }))),
    unshown_fields?.length ? 添加预设字段区() : null,
    ((schema?.allow_custom_fields==null) ? true : schema?.allow_custom_fields) ? 添加自定义字段区() : null,
    vNode(BsLine, {noLabel: true}, vNode(TDesign['Button'], {
      theme: "default",
      onClick: onSave,
    }, props?.saveText ?? "确定")),
  );
};

export default My_DictEditor;
