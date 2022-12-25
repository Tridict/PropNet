import storage from "./store.js";
import controls_js from "./controls.js";
const { FormControlMap } = controls_js;
import { AppApi } from "./api/api.js";
// import { EntryApi } from "./api/api.js";
// const { createEntries } = EntryApi;


const control_methods = Array.from(new Set(Object.values(FormControlMap).map(it=>Object.keys(it)).flat()));
const data_form_options = Object.keys(FormControlMap);
const data_form_options__ = [
  "string",
  "number",
  "boolean",
  "null",

  "date",
  "time",
  "datetime",

  "range",
  "array",

  "dict",
];
const primary_data_models = {
  'ModeledData': {},
};



const wrapped_data_example_0 = {
  _type: "Data",
  _data_form: "number",
  _data: 3
};
const wrapped_data_example_1 = {
  _type: "Data",
  _data_form: "dict",
  _data_model: "RGB_Dict",
  _data: {
    r: 234,
    g: 123,
    b: 112,
  },
};
const wrapped_data_example_4 = {
  _type: "Data",
  _data_form: "object",
  _data: {
    _model: "Label",
    region: "",  // engine.regions[__]
    spec: "",
  },
};
const wrapped_data_example_2 = {
  _type: "Data",
  _data_form: "array",
  _data_model: "RGB_Triplet",
  _data: [234, 123, 112],
};
const wrapped_data_example_3 = {
  _type: "DateModel",
  ref_name: "RGB_Dict",
  schema: {},
};

const label_example = {
  _data_model: "Label",
  _props: {
    label_set: "Month",
    options: ["January", /*...*/],
  },
  _spec: "May",
};




const DefaultProfile = {
  version: null,
  schemas: [
    {
      _schema: "SchemaSchema",
      name: "EdgeSchema",
      instance_name: "Edge",
      desc: "该 Schema 用于创建 Edge 。Edge 描述了若干元素之间的复杂关系。每个 Edge 将定义两个槽位（Slot），这些槽位可以填入特定的元素/内容/成分/对象，而该 Edge 便指示了两个元素之间的某些特定关系。",
      data_form: "dict",
      allow_custom_fields: false,
      fields: [
        {
          field_name: "symmetric",
          required: true,
          preload: true,
          desc: "该 Edge 所描述的关系是否对称？如“相识”是一种对称关系，而“认识”是一种非对称关系。",
          data_form: "boolean",
        },
        {
          field_name: "slot0_name",
          required: true,
          preload: true,
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "slot0_desc",
          required: true,
          preload: true,
          data_form: "string",
          control_method: "textarea",
        },
        {
          field_name: "slot1_name",
          preload: true,
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "slot1_desc",
          preload: true,
          data_form: "string",
          control_method: "textarea",
        },
      ],
    },
    {
      _schema: "SchemaSchema",
      name: "FrameSchema",
      instance_name: "Frame",
      desc: "该 Schema 用于创建 Frame 。Frame 描述了若干元素之间的复杂关系。每个 Frame 将定义若干槽位（Slot），这些槽位可以填入特定的元素/内容/成分/对象，而该 Frame 便指示了这些元素两两之间（乃至于任意数量的元素相互之间）都存在某些特定的关系。",
      data_form: "dict",
      allow_custom_fields: false,
      fields: [
        {
          field_name: "name",
          required: true,
          preload: true,
          desc: "The name of the frame.",
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "desc",
          preload: true,
          data_form: "string",
          control_method: "textarea",
        },
        {
          field_name: "slots",
          preload: true,
          data_form: "array",
          control_method: "add_one_by_one",
          item_schema: {
            _schema: "SchemaSchema",
            name: "FrameSlotSchema",
            instance_name: "FrameSlot",
            data_form: "dict",
            allow_custom_fields: false,
            fields: [
              {
                field_name: "slot_name",
                desc: "槽位名称，或者说“角色名称/元素名称/要素名称”等",
                data_form: "string",
                control_method: "input",
                required: true,
              },
              {
                field_name: "desc",
                preload: true,
                data_form: "string",
                control_method: "textarea",
              },
            ],
          },
        },
      ],
    },
    {
      // _refer_to: "schemas/SchemaSchema",
      _schema: "SchemaSchema",
      name: "SchemaSchema",
      instance_name: "Schema",
      data_form: "dict",
      allow_custom_fields: false,
      fields: [
        {
          field_name: "name",
          required: true,
          preload: true,
          desc: "The name of the schema.",
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "desc",
          preload: true,
          data_form: "string",
          control_method: "textarea",
        },
        {
          field_name: "instance_name",
          required: true,
          preload: true,
          desc: "The name of the instances of this schema.",
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "_refer_to",
          data_form: "string",
          control_method: "reference",
        },
        {
          field_name: "data_form",
          preload: true,
          data_form: "labeled",
          control_method: "select",
          options: data_form_options,
          default: "any",
        },
        {
          field_name: "fields",
          data_form: "array",
          control_method: "add_one_by_one",
          item_schema: {
            _refer_to: "schemas/SchemaFieldSchema",
          },
        },
      ],
    },
    {
      // _refer_to: "schemas/SchemaFieldSchema",
      _schema: "SchemaSchema",
      name: "SchemaFieldSchema",
      desc: "Schema to create SchemaField",
      instance_name: "SchemaField",
      instance_desc: "A field in a Schema",
      data_form: "dict",
      fields: [
        // 公共
        {
          field_name: "sadf",
          desc: "regsdfdafaw afasdfas awefwaefds asefwdsf bgdsfbasdfv asfdgv",
          data_form: "dict",
          control_method: "input",
          required: true,
        },
        {
          field_name: "aweasd",
          desc: "regsdf",
          data_form: "number",
          control_method: "rate",
          min: -10,
          max: 10,
          required: true,
        },
        {
          field_name: "field_name",
          desc: "字段名称",
          data_form: "string",
          control_method: "input",
          required: true,
        },
        {
          field_name: "desc",
          data_form: "string",
          control_method: "textarea",
        },
        {
          field_name: "data_form",
          data_form: "labeled",
          // control_methods: ["select", "ratio", "buttons", "rate"],
          options: data_form_options,
          default: "any",
          preload: true,
        },
        {
          field_name: "required",
          data_form: "boolean",
          // control_methods: ["switch", "ratio", "buttons"],
          default: false,
          preload: true,
        },
        {
          field_name: "preload",
          desc: "Whether to preload in the editor.",
          data_form: "boolean",
          control_methods: ["switch"],
          default: false,
          preload: true,
        },
        {
          field_name: "force_write",
          data_form: "boolean",
          default: false,
        },
        {
          field_name: "hidden",
          data_form: "boolean",
          default: false,
        },
        {
          field_name: "default",
        },
        {
          field_name: "variant",
        },

        {
          field_name: "control_method",
          data_form: "labeled",
          control_method: "select",
          options: control_methods,
        },
        {
          field_name: "control_methods",
          data_form: "array",
          control_method: "select",
          options: control_methods,
          default: [],
          item_schema: {
            data_form: "labeled",
          },
        },

        {
          // data_form: string | number | labeled
          field_name: "options",
          variant: 0,
          data_form: "array",
          control_method: "input",
          item_schema: {
            data_form: "string",
          },
        },
        {
          // data_form: dict
          field_name: "options",
          variant: 1,
          data_form: "array",
          control_method: "add_one_by_one",
          item_schema: {
            data_form: "dict",
            schema: "SchemaFieldSchema",
          },
        },
        {
          // options exists
          field_name: "allow_add_option",
          data_form: "boolean",
          default: false,
        },

        // data_form: "dict"
        {
          field_name: "schema",
          data_form: "refer",
          region: "schemas/SchemaSchema",
        },
        // data_form: "range"
        // data_form: "array"
        {
          field_name: "item_schema",
          data_form: "refer",
          region: "schemas/SchemaSchema",
        },
        {
          field_name: "max_num",
          data_form: "number",
          min: 0,
        },
        {
          field_name: "min_num",
          data_form: "number",
          min: 0,
        },

        // data_form: "refer"
        {
          field_name: "region",
          data_form: "refer",
        },

        // data_form: "string"
        {
          field_name: "regex_pattern",
          data_form: "string",
        },
        // data_form: "labeled"
        // data_form: "number"
        {
          field_name: "max",
          data_form: "number",
        },
        {
          field_name: "min",
          data_form: "number",
        },
        // data_form: "boolean"

        // https://www.mongodb.com/docs/manual/reference/operator/query/jsonSchema/#available-keywords
        // https://www.mongodb.com/docs/manual/reference/operator/query/#query-selectors
        // http://json-schema.org/specification.html
        // https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#properties
        // http://json-schema.org/draft/2020-12/json-schema-validation.html#name-a-vocabulary-for-structural

      ],
    }
  ],
};

class Engine {
  constructor() {
    this.shadow = {
      profile: {},
    };
  }
  get profile() {
    return this.shadow?.profile;
  }
  set profile(dict) {
    this.shadow.profile = dict;
    return this.shadow.profile;
  }
  get version() {
    return this.shadow.profile.version;
  }
  set version(value) {
    this.shadow.profile.version = value;
    return this.shadow.profile.version;
  }
  get storedProfile() {
    return storage.getItem('shadow_profile');
  }
  get refer_regions() {
    return {
      schemas: this?.shadow?.profile?.schemas,
    };
  }
  async parseRefer(refer_string) {
    const refer_path_route = refer_string?.split?.("/") ?? [];
    if (refer_path_route.length==2) {
      return this?.refer_regions?.[refer_path_route[0]]?.find?.(it=>((it?._ref_name??it?.name)==refer_path_route[1]));
    };
  }
  loadStoredProfile() {
    if (this.storedProfile!=null) {
      this.shadow.profile = storage.getItem('shadow_profile');
      this.log({content: `已加载缓存的版本为 ${this.version} 的 profile 。`, style: "info"});
      return this;
    };
    this.shadow.profile = DefaultProfile;
    this.log({content: `已重置 profile 为 DefaultProfile 。`, style: "info"});
    return this;
  }
  async init(config) {
    if (config?.logger!=null) {
      this.setLogger(config?.logger);
    };
    const stored_version = this.storedProfile?.version;
    const wrapped_version = await AppApi.getVersion((({wrapped})=>{
      // this.log({details: {wrapped}, style: "info"});
    }));
    const latest_version = wrapped_version?.data?.data;
    if (latest_version!=null&&stored_version!=latest_version) {
      const wrapped_profile = await AppApi.getProfile((({wrapped})=>{
        // this.log({details: {wrapped}, style: "info"});
      }));
      const latest_profile = wrapped_profile?.data?.data;
      if (latest_profile!=null) {
        this.shadow.profile = (latest_profile);
        this.log({details: {wrapped}, style: "success", content: `已加载最新的 profile 。`});
        return this;
      } else {
        this.loadStoredProfile();
        return this;
      };
    } else {
      this.loadStoredProfile();
      return this;
    };
  }
  static defaultLogger = ({content, style, duration, details}) => {
    console.log({content, style, duration, details});
  };
  log({content, style, duration, details}) {
    Engine.defaultLogger({content, style, duration, details});
  }
  setLogger(func) {
    this.log = func;
  }
  recoverLogger() {
    this.setLogger(Engine.defaultLogger);
  }
}

const engine = new Engine();
window.__engine = engine;
export default engine;
