import storage from "./store.js";
import { AppApi } from "./api/api.js";
// import { EntryApi } from "./api/api.js";
// const { createEntries } = EntryApi;


const data_form_options = [
  "string",
  "labeled",
  "number",
  "boolean",
  "range",
  "array",
  "dict",
  "null",
  "mixed",
  "any",
];
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
const DefaultProfile = {
  version: null,
  schemas: [
    {
      // _refer_to: "schemas/SchemaSchema",
      _schema: "SchemaSchema",
      name: "SchemaSchema",
      instance_name: "Schema",
      data_form: "dict",
      fields: [
        {
          field_name: "name",
          data_form: "string",
          control_method: "input",
        },
        {
          field_name: "instance_name",
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
          data_form: "labeled",
          control_method: "select_one",
          options: data_form_options,
          default: "any",
        },
        {
          field_name: "fields",
          data_form: "array",
          control_method: "config_one_by_one",
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
      instance_name: "SchemaField",
      data_form: "dict",
      fields: [
        // 公共
        {
          field_name: "field_name",
          data_form: "string",
          control_method: "input",
          required: true,
        },
        {
          field_name: "data_form",
          data_form: "labeled",
          control_method: "select_one",
          options: data_form_options,
          default: "any",
        },
        {
          field_name: "required",
          data_form: "boolean",
          control_methods: ["switch", "select_one"],
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
          control_method: "select_one",
          options: control_methods,
          default: "select_control_and_act",
        },
        {
          field_name: "control_methods",
          data_form: "array",
          control_method: "select_some",
          options: control_methods,
          default: ["select_control_and_act"],
        },

        {
          // data_form: string | number | labeled
          field_name: "options",
          variant: 0,
          data_form: "array",
          control_method: "input_one_by_one",
          item_schema: {
            data_form: "string",
          },
        },
        {
          // data_form: dict
          field_name: "options",
          variant: 1,
          data_form: "array",
          control_method: "config_one_by_one",
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
          data_form: "dict",
          schema: {
            _refer_to: "schemas/SchemaSchema",
          },
        },
        // data_form: "range"
        // data_form: "array"
        {
          field_name: "item_schema",
          data_form: "dict",
          schema: {
            _refer_to: "schemas/SchemaSchema",
          },
        },

        // data_form: "string"
        // data_form: "labeled"
        // data_form: "number"
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
  async init({logger}) {
    if (logger!=null) {
      this.setLogger(logger);
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
