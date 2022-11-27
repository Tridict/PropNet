import { request } from "./request.js";
// import storage from "../store.js";
// import { stringifyQs } from "../querystring.js";

export async function postEdge(body) {
  const wrapped = await request.post('/api/edges', body);
  return wrapped;
}

export async function getEdges(body) {
  const wrapped = await request.get('/api/edges');
  //
  const data = [
    { label: '丈夫-夫妇-妻子', value: '夫妇'},
    { label: '父亲-feiowjfieowjfo-孩子', value: 'feiowjfieowjfo'},
    { label: '母亲-32jriojdewio-孩子', value: '32jriojdewio'},
   ];
  return data;
}
