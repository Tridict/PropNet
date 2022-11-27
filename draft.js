import { Form } from "./vendor/tdesign.min";

const xx = () => {

  const getSomeItems = (num, flag) => {
    const flag_map = {
      'random': ()=>{},
      'fresh': ()=>{},
      'wanted': ()=>{},
    };
  };

};



morpheme;
form;
token;
format;




entry;


entry = {
  form: form(),
  meaning: meaning(),
};








value = {};
label = {};

model = {};

type = {};

slot = {};

edge = {
  // lang: "FN-Meta",
  ref_name: "",
  desc: "",
  symmetric: true || false,
  slot0: {
    // lang: "FN-Meta",
    ref_name: "",
    desc: "",
  },
  slot1: {
    // lang: "FN-Meta",
    ref_name: "",
    desc: "",
  },
};


value_set = {
  uniq: true | false,
  seq: true | false,
  infinite: true | false,
  enumerated: true | false,
  samples: [],
};
value_model = {
  ref_name: "",
  desc: "",
  from_type: "int|float|bool|fraction|complex|angle|radian|hex|byte|discrete|hash|value_set|...",
};
dimension = {
  ref_name: "",
  desc: "",
  value_model: "",
};
domain = {
  ref_name: "",
  desc: "",
  dimensions: [
    dimension
  ],
};




frame = {
  // lang: "FN-Meta",
  ref_name: "",
  desc: "",
  slots: [
    {
      // lang: "FN-Meta",
      ref_name: "",
      desc: "",
    },
  ],
  relations: [
    {
      // lang: "FN-Meta",
      edge_ref_name: "",
      slot0_ref_name: "",
      slot1_ref_name: "",
    },
  ],
};

item



relation = frame();

prefab = {
  frame: frame("#"),
  elements: [
    {
      slot: this.frame.slot("#"),
      content: item("#"),
    },
  ],
};

item = prefab | label;




mappingMethod = {
  ref_name: "",
};

mappingCase = {
  method: "",
  input: "",
  output: "",
};







// X 描述了 XY 的 ____
// 特点
// 主体
// 来源
// 名称
// 类型
// X 和 XY 的关系是 ____
// 特点-主体
// 整体-部分
// 主体-产物
// 名称
// 类型




// 将要被 X 时会感到 _______
// 正在被 X 时会感到 _______
// 刚被 X 之后会感到 _______
// 回想起被 X 会感到 _______




question = {
  ref_name: "",
  lang: "",

  version: "",

  title: "",
  intro: "",
  tips: [""],

  frame: {
    slots: [],
  },
  args: {
    [slot.ref_name]: {
      // 其实是一个 item
      id: 00,
      ref_name: "",
      string: "",
      // ...
    },
  },

  pattern: [
    {t: ""},  // key 是 t  取 value 的文本内容
    {l: "_"},  // key 是 l  显示下划线
    {a: "<slot.ref_name>"},  // key 是 a  取 value 对应 arg 的 string
  ],

  choices: [
    {
      label: "",
      value: "",
      pattern: [{t: ""}],
    },
  ],
};





