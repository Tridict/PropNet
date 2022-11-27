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


value_model = {
  ref_name: "",
  desc: "",
  from_type: "int|float|bool",
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
  slots: [],
  edges: [],
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













