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

frameCase = {
  frame: "",
  args: {
    [slot.ref_name]: item.ref_name,
  },
};



hh = {
  'Edge': {},
  'Type': {
    'Template': {},
    'Frame': {
      'Link': {},
      'Mapping': {},
    },
  },
  'Prototype|Prefab': {},
  'Case': {
    'Item': {},
    'FrameCase': {
      'LinkCase': {},
      'MappingCase': {},
    },
  },
};

// 我想去意大利，但老婆想去土耳其，谁也不服谁，就让孩子来选。
// 激活“家庭旅行”脚本的“选择目的地”步骤。
// 有可能 我想去意大利 并不是指 我想我去意大利 而是 我想我和老婆孩子去意大利
// 可以说这是“说错了”，或者“没想清楚”，或者“没逻辑”，但这种可能性确实存在
// 肖像画家问客户：“你想画哪种风格？”
// 显然不是“你想[你(自己)]画哪种风格？”而是“你想[我(给你)]画哪种风格？”
// 我在理发/剪头/剃头呢。


primitives = {
  Frames: {
    ValueProfile: {},
    LabelProfile: {},
  },
  Semis: {},

  Prototypes: {
    Continuum: {},
    ValueDomain: {},
    ValueDomainProfile_or_ValueModel: {},
  },

  Sington_of_one_system: {
    Edge: {},
    Value: {},
    Label: {},
  },
  Instances_or_Cases: {
    App: {},
  },
};
// 是否可以发展变化






hh = {
  'Label': {},
  'Value': {},
  'Process': {},
  'Ref': {},
  'Array': {},
  'Dict': {},

  'Frame|Schema': {
    'LabelProfile': {
      string: "",
      domain: {},
    },
    'ValueProfile': {
      model: [
        'label',
        'number',
        'boolean',
        'chance',
        'ref',
        'slot',
        'item',
      ],
    },
    'ProcessProfile': {agent, method, patient},
    'RefProfile': {},
    'ArrayProfile': {},
    'DictProfile': {},
  },

  'Frame': {
    'Mapping': ['input', 'method', 'output'],
    'Label': [],
    'Type': [],
    'Element': ['frame', 'slot', 'filler'],
    'Indie': ['domain', 'value'],
    'Compound': ['traits'],
    'Link|Relation': ['slot0', 'edge', 'slot1'],
  },
  'SemiItem': {},
  'Prototype|Prefab': {},
  'Prototype|Prefab': {},
  'Instance|Case': {},
};

prefab = {
  statements: [],
}

instance = {
  experiences: [],
}

// 互动
// 经历者 经历 事件/过程

// 时间点
// 时间段

// 点事件
// 体事件

TimePoint



// 体育运动
// action
// actionSequence

// 空间方位
// 飞机上 是指 飞机里面 还是 飞机表面
// 飞机有外壳
// 飞机里面/内部和飞机外面/外部
// humanCanGetIntoOrGetOutOf



FrameMapping


item = {
  ref_name: "",
  schema: "",
  detail: {},
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





