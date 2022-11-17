import { stringifyQs } from "../querystring.js";
import { request } from "./request.js";

export async function searchItems(params) {
  const res = await request.get('/api/items/?'+stringifyQs(params));
  return res;
}

// export async function searchItemByName(name) {
//   const res = await request.get('/api/items/?name='+name);
//   return res;
// }

export async function getItemByFace(face) {
  const res = await request.get('/api/items/'+face);
  return res;
}

export async function addItem(face, body) {
  const res = await request.put('/api/items/'+face, body);
  return res;
}

export async function updateItem(face, body) {
  const res = await request.patch('/api/items/'+face, body);
  return res;
}
