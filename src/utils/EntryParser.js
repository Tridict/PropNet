
const defaultAppProfile = {
  primitives: {
    "PrimaryDataForm": "PrimaryDataForm",

    "PrimaryDataForms/String": "String",
    "PrimaryDataForms/Number": "Number",
    "PrimaryDataForms/Boolean": "Boolean",
    "PrimaryDataForms/None": "None",
    "PrimaryDataForms/Array": "Array",
    "PrimaryDataForms/Dict": "Dict",

    "PrimaryType": "Type",
    "PrimaryTypes/Data": "Data",
  },
  types: {
    'PrimaryDataForm': { _type: "Type",
      profile_schema: "PrimaryDataFormProfileSchema",
      data_form_validators: [
        { data_form: "Dict", validator: "PrimaryDataForm_DictValidator", },
        { data_form: "String", validator: "PrimaryDataForm_StringValidator", },
      ],
    },
  },
  data_validators: {},
};

class Validator {
  static normalize(data) {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch(error) {
      return null;
    };
  };
  static defaultApp = {
    profile: defaultAppProfile,
  };
  constructor(app=Validator.defaultApp) {
    this.app = app??Validator.defaultApp;
  };
  get profile() {
    return this?.app?.profile;
  };
  get primitives() {
    return this?.app?.profile?.primitives;
  };


  judgeForm(data) {
    const json = Validator.normalize(data);
    if (typeof(json)==="undefined") {return this.primitives?.["PrimaryDataForms/None"];};
    if (json==null) {return this.primitives?.["PrimaryDataForms/None"];};
    if (typeof(json)==="string") {return this.primitives?.["PrimaryDataForms/String"];};
    if (typeof(json)==="number") {return this.primitives?.["PrimaryDataForms/Number"];};
    if (typeof(json)==="boolean") {return this.primitives?.["PrimaryDataForms/Boolean"];};
    // if (typeof(json?.constructor?.name)==="String") {return this.primitives?.["PrimaryDataForms/String"];};
    // if (typeof(json?.constructor?.name)==="Number") {return this.primitives?.["PrimaryDataForms/Number"];};
    // if (typeof(json?.constructor?.name)==="Boolean") {return this.primitives?.["PrimaryDataForms/Boolean"];};
    if (Array.isArray(json)) {return this.primitives?.["PrimaryDataForms/Array"];};
    return this.primitives?.["PrimaryDataForms/Dict"];
  };
  // static judgeType(data) {
  //   if (data?._type!=null) {return data._type;};
  //   return this.primitives?.["PrimaryTypes/Data"];
  // };
  static validate(data, schema) {
    const form = this.judgeForm(data);
  };
};

class EntryWrap {
  constructor(data=null) {
    this.data = data;
  }
};

export default class EntryParser {
  static defaultApp = {
    profile: defaultAppProfile,
  };
  constructor(app=EntryParser.defaultApp) {
    this.app = app;
  }
  useApp(app) {
    this.app = app;
    return this;
  }

  feedData(data) {
    this.data = data;
    return this;
  }
};
















const AppProfile = {};

const defdef = {

  // PrimaryDataForm

  'String': { _type: "PrimaryDataForm",
    validator_operators: [
      "len_gt", "len_lt", "len_gte", "len_lte", "len_eq", "len_ne",
      "in", "nin",
      "regex", "includes",
    ],
  },
  'Number': { _type: "PrimaryDataForm",
    validator_operators: [
      "gt", "lt", "gte", "lte", "eq", "ne",
      "in", "nin",
    ],
  },
  'Boolean': { _type: "PrimaryDataForm",
    validator_operators: [
      "eq", "ne", "in", "nin",
    ],
  },
  'Null': { _type: "PrimaryDataForm",
    validator_operators: [
      "eq", "ne", "in", "nin",
    ],
  },
  'Array': { _type: "PrimaryDataForm",
    validator_operators: [
      "len_gt", "len_lt", "len_gte", "len_lte", "len_eq", "len_ne",
      "each", "all", "any",
      "includes",
      "item_validator",
    ],
  },
  'Dict': { _type: "PrimaryDataForm",
    validator_operators: [
      "len_gt", "len_lt", "len_gte", "len_lte", "len_eq", "len_ne",
      "each", "all", "any",
      "has_key", "has_value", "has_pair",
      "fields",
    ],
  },

  'Str': { _type: "ReferPointer", target: "String", },
  'Num': { _type: "ReferPointer", target: "Number", },
  'Bool': { _type: "ReferPointer", target: "Boolean", },



  // Type

  'PrimaryDataForm': { _type: "Type",
    profile_schema: "PrimaryDataFormProfileSchema",
    data_forms: [
      { data_form: "Dict", profile_schema: "PrimaryDataFormProfileSchema", },
      "String",
    ],
  },
  'Type': { _type: "Type",
    profile_schema: "TypeProfileSchema",
    data_forms: [
      "Dict",
      "String",
    ],
  },

  // 如果 在 Value 字典中  则 根据其 validator 字段的定义来校验
  // 如果 在某个 dict 的某个字段中  则 根据该 dict 的该字段的定义来校验
  // 如果 是独立存现的  则 视为 primary 的类型  如果是 dict  则根据其 validator 字段的定义来校验
  'Data': { _type: "Type",
    profile_schema: "DataProfileSchema",
    data_schema: "DataDataSchema",
    data_forms: [
      "Dict",
      "Array",
      "Null",
      "Boolean",
      "Number",
      "String",
    ],
  },
  'DataValidator': { _type: "Type",
    profile_schema: "DataValidatorProfileSchema",
    data_forms: [
      "Dict",
      "String",
    ],
  },
  'ReferPointer': { _type: "Type",
    profile_schema: "ReferPointerProfileSchema",
    data_schema: "ReferPointerDataSchema",
    data_forms: [
      "Dict",
      "String",
    ],
  },



  // DataValidator

  'PrimaryDataFormProfileSchema': { _type: "DataValidator",
    data_form_is: "Dict",
    type_is: "PrimaryDataForm",
    fields: [
      {
        field_name: "validator_operators",
        validator: {
          data_form_is: "Array",
          item_validator: {
            data_form_is: "String",
          },
        },
      },
    ],
  },
  'TypeProfileSchema': { _type: "DataValidator",
    data_form_is: "Dict",
    type_is: "Type",
    fields: [
      {
        field_name: "profile_schema",
        validator: {
          data_form_is: "String",
        },
      },
      {
        field_name: "data_schema",
        validator: {
          data_form_is: "String",
        },
      },
    ],
  },
  'DataProfileSchema': { _type: "DataValidator",
    data_form_is: "Dict",
    type_is: "Data",
    fields: [
    ],
  },
  'ReferPointerProfileSchema': { _type: "DataValidator",
    data_form_is: "Dict",
    type_is: "ReferPointer",
    fields: [
      {
        field_name: "region",
        validator: {
          data_form_is: "String",
          type_is: "ReferPointer",
        },
      },
      {
        field_name: "key",
        validator: {
          data_form_is: "String",
          type_is: "Data",
        },
      },
      {
        field_name: "target",
        validator: {
          data_form_is: "String",
          type_is: "ReferPointer",
        },
      },
    ],
  },
  'DataValidatorProfileSchema': { _type: "DataValidator",
    data_form_is: "Dict",
    type_is: "DataValidator",
    fields: [
      {
        field_name: "data_form_is",
        validator: {
          type_is: "ReferPointer",
          data_form_is: "String",
        },
      },
      {
        field_name: "type_is",
        validator: {
          type_is: "ReferPointer",
          data_form_is: "String",
        },
      },
      {
        field_name: "fields",
        validator: {
          type_is: "Data",
          data_form_is: "Array",
          item_validator: {
            data_form_is: "Dict",
            fields: [
              {
                field_name: "field_name",
                validator: {
                  data_form_is: "String",
                },
              },
              {
                field_name: "validator",
                validator: {
                  data_form_is: "Dict",
                  type_is: "DataValidator",
                },
              },
            ],
          },
        },
      },
    ],
  },





  //
  anything: {
    _type: "",  // 描述了 value 的 properties
    _model: "",  // 描述了 任何格式的 value 的 validator
    _format: "",  // 描述了 value 的 书写形式
    _schema: {},  // 描述了 Dict 格式的 value 的 validator
    _value: "",  // value 本身
  },
};

const defs = {
  FORMAT_STRING: { _type: "KeyWordLabel", _ref_name: "FORMAT_STRING", string: "FORMAT_STRING", },
  FORMAT_NUMBER: { _type: "KeyWordLabel", _ref_name: "FORMAT_NUMBER", string: "FORMAT_NUMBER", },
  FORMAT_BOOLEAN: { _type: "KeyWordLabel", _ref_name: "FORMAT_BOOLEAN", string: "FORMAT_BOOLEAN", },
  FORMAT_NULL: { _type: "KeyWordLabel", _ref_name: "FORMAT_NULL", string: "FORMAT_NULL", },
  FORMAT_ARRAY: { _type: "KeyWordLabel", _ref_name: "FORMAT_ARRAY", string: "FORMAT_ARRAY", },
  FORMAT_DICT: { _type: "KeyWordLabel", _ref_name: "FORMAT_DICT", string: "FORMAT_DICT", },

  String: { _type: "DataFormat", _ref_name: "String",
    label: "FORMAT_STRING",
    detail_properties: [
      {
        name: "regex_pattern",
        filler_def: {},
      },
    ],
  },
  Number: { _type: "DataFormat", _ref_name: "Number",
    label: "FORMAT_NUMBER",
  },
  Boolean: { _type: "DataFormat", _ref_name: "Boolean",
    label: "FORMAT_BOOLEAN",
  },
  Null: { _type: "DataFormat", _ref_name: "Null",
    label: "FORMAT_NULL",
  },
  Array: { _type: "DataFormat", _ref_name: "Array",
    label: "FORMAT_ARRAY",
  },
  Dict: { _type: "DataFormat", _ref_name: "Dict",
    label: "FORMAT_DICT",
  },



  RefNameString: { _type: "DataModel", _ref_name: "RefNameString",
    format_type: "String",
    format_detail: {
      regex_pattern: "^[\\$#@]?[^\\$#@]+$",
    },
  },
  RefName: { _type: "Type", _ref_name: "RefName",
    properties: [
      {
        slot_name: "location",
      },
    ],
    instance_data_model: "RefNameString",
  },





  DataFormat: { _type: "Type", _ref_name: "DataFormat", definition: {
    _ref_name: "DataFormatDefinition",
    properties: [
      {
        slot_name: "label",
        filler_def: {
          _type: "RefName",
          location: "$keywords",
        },
      },
    ],
    instance_data_model: "Dict",
  }, },

  Profile: { _type: "DataModel", _ref_name: "Profile", format: "Dict" },




  String: { _type: "DataModel", _ref_name: "String",
    format: { label: "LITERAL", },
  },
  Number: { _type: "DataModel", _ref_name: "Number",
    format: { label: "LITERAL", },
  },
  Boolean: { _type: "DataModel", _ref_name: "Boolean",
    format: { label: "LITERAL", },
  },
  Null: { _type: "DataModel", _ref_name: "Null",
    format: { label: "LITERAL", },
  },
  Array: { _type: "DataModel", _ref_name: "Array",
    format: { label: "ARRAY", },
  },
  Dict: { _type: "DataModel", _ref_name: "Dict",
    format: { label: "DICT", },
  },










  TypedProfileSchema: { _type: "Schema",
    _ref_name: "TypedProfileSchema", slots: [
      {
        slot_name: "_type",
        filler_def: { _type: "RefString", location: "$types", },
      },
    ],
  },
  SchematicProfileSchema: { _type: "Schema",
    _ref_name: "SchematicProfileSchema", slots: [
      {
        slot_name: "_schema",
        filler_def: { _type: "RefString", location: "$schemas", },
      },
    ],
  },
  ModeledProfileSchema: { _type: "Schema",
    _ref_name: "ModeledProfileSchema", slots: [
      {
        slot_name: "_model",
        filler_def: { _type: "RefString", location: "$models", },
      },
    ],
  },
  PreReferedProfileSchema: { _type: "Schema",
    _ref_name: "PreReferedProfileSchema", slots: [
      {
        slot_name: "_ref_name",
        filler_def: { _model: "String", },
      },
    ],
  },


  Type: { _type: "Type", _ref_name: "", definition: {}, },
  Data: { _type: "Type", _ref_name: "", definition: {}, },
  Schema: { _type: "Type", _ref_name: "", definition: {}, },










  Type: {
    _type: "Type", definition: { _ref_name: "TypeDefinition", slots: [
      {
        slot_name: "definition",
        filler_def: { _type: "Profile", _schema: "ProfileSchema", },
      },
      {
        slot_name: "data_model",
        filler_def: { _type: "Profile", _schema: "ProfileSchema", },
      },
    ]},
    data_model: {
      _model: "RefString",
    },
  },
};

const testingTypes = {
  RefString: {
    _type: "Type", definition: { _ref_name: "RefStringTypeDefinition", slots: [
      {
        slot_name: "location",
        filler_def: { _type: "RefString", },
      },
    ]},
    data_model: {
      _model: "String",
      regex_pattern: "^[\\$#@]?[^\\$#@]+$",
    },
  },
  Type: {
    _type: "Type", definition: { _ref_name: "TypeTypeDefinition", slots: [
      {
        slot_name: "definition",
        filler_def: { _type: "Profile", _schema: "ProfileSchema", },
      },
      {
        slot_name: "data_model",
        filler_def: { _type: "Profile", _schema: "ProfileSchema", },
      },
    ]},
    data_model: {
      _model: "RefString",
    },
  },
  Schema: {
    _type: "Type", definition: { _ref_name: "SchemaTypeDefinition", slots: [
      {
        slot_name: "ref_name",
        filler_def: { _model: "String", },
      },
      {
        slot_name: "slots",
        filler_def: { _model: "Array", },
        item_schema: "Slot",
      },
    ]},
  },
  Profile: {
    _type: "Type", definition: { _ref_name: "ProfileTypeDefinition", slots: [
      {
        slot_name: "_type",
        filler_def: { _model: "String", },
      },
      {
        slot_name: "slots",
        filler_def: { _model: "Array", },
        item_schema: "Slot",
      },
    ]},
  },
  Literal: {
    _type: "Type", definition: { _ref_name: "LiteralTypeDefinition" },
  },
  Value: {
    _type: "Type", definition: { _ref_name: "ValueTypeDefinition" },
  },
  Refer: {
    _type: "Type", definition: { _ref_name: "ReferTypeDefinition", slots: [
      {
        slot_name: "target",
        filler_def: { _model: "Any", },
      },
    ]},
  },
};

const testingValueModels = {

  Label: {},

  Array: {},
  Dict: {},

  String: {},
  Number: {},
  Boolean: {},
  Null: {},

  Refered: {},




  Refered: {
    _type: "ValueModel", _schema: { _ref_name: "ReferedValueModelProfile", slots: [
      {
        slot_name: "target",
        filler_def: {
          _model: "ValueModel",
        },
      },
    ]},
  },
  BasicValue: {
    _type: "ValueModel", _schema: { _ref_name: "BasicValueValueModelProfile", slots: [
      {
        slot_name: "_model",
        filler_def: {
          _type: "ValueModel",
        },
      },
    ]},
  },
  Dict: {
    _type: "ValueModel", _schema: { _ref_name: "DictValueModelProfile", slots: [
      {
        slot_name: "_type",
      },
      {
        slot_name: "_schema",
      },
    ]},
  },
  Array: {
    _type: "ValueModel", _schema: { _ref_name: "ArrayValueModelProfile", slots: [
      {
        slot_name: "filler_def",
      },
    ]},
  },
  Enumerated: {
    _type: "ValueModel", _schema: { _ref_name: "EnumeratedValueModelProfile", slots: [
      {
        slot_name: "enum",
        filler_def: {
          _model: "Array",
        },
      },
    ]},
  },
  OneOf: {},
  AnyOf: {},
  AllOf: {},
  Opitional: {},
  Not: {},
};

const testingSchemaDict = {
  Xx: {
    _type: "Schema",
    _schema: "Schema",
    _ref_name: "Xx",
    slots: [],
  },
  ObjectPrototype: {
    _ref_name: "ObjectPrototype",
    slots: [
      {
        slot_name: "_type",
      },
      {
        slot_name: "_schema",
      },
      {
        slot_name: "_model",
      },
    ],
  },
  Schema: {
    _ref_name: "Schema",
    slots: [
      {
        slot_name: "ref_name",
        filler_def: {
          _model: "String",
        },
      },
      {
        slot_name: "slots",
        filler_def: {
          _model: "Array",
        },
        item_schema: "Slot",
      },
    ],
  },
  Slot: {
    _ref_name: "Slot",
    slots: [
      {
        slot_name: "slot_name",
        filler_def: {
          _model: "String",
        },
      },
      {
        slot_name: "filler_def",
        filler_def: {
          _schema: "filler_def",
        },
        defalut: {
          _model: "Any",
        },
      },
      {
        slot_name: "required",
        filler_def: {
          _model: "Boolean",
        },
        defalut: {
          _model: "Boolean",
          value: false,
        },
      },
      {
        slot_name: "default",
        filler_def: {
          _model: "Any",
        },
      },
    ],
  },
};



