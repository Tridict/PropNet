import { createElement as vNode } from "../../../vendor/react.js";

export default function Doc() {

  const kk = `
  wargdsa
  `;

  const pps = [
    {tag: "hr",},
    {
      tag: "h4",
      text: "dd",
    },
    ...kk.trim().split("\n").map(it=>({text: it.trim(),})).filter(it=>it?.text?.length),
    {tag: "hr",},
  ];

  const ppGroup = (pps).map((pp, idx)=>{
    return vNode(pp?.tag??'p', {key: idx,}, pp.text);
  });

  const docBox = vNode('div', {
    className: "doc-content",
  }, ppGroup);

  return docBox;
}

// https://getbootstrap.com/docs/5.2/utilities/background/
// https://tdesign.tencent.com/react/components/grid
// https://tdesign.tencent.com/design/layout