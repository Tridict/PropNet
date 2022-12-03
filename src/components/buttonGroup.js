import { createElement as vNode } from "../../vendor/react.js";
import { Button, Tooltip } from "../../vendor/tdesign.min.js";

const makeButtonGroup = options => options.map((opt, idx) => (opt.type==null||['btn', 'button'].includes(opt?.type?.toLowerCase?.())) ? vNode(Tooltip, {
  content: opt.tooltip ?? opt.name,
}, vNode(Button, {
  key: idx,
  onClick: ()=>{opt?.fn?.()},
  theme: opt?.theme ?? "default",
}, opt.name)) : ['title'].includes(opt?.type?.toLowerCase?.()) ? vNode('h5', {className: "text-center mt-4 mb-3"}, opt.title??"------") : null);

export default makeButtonGroup;
