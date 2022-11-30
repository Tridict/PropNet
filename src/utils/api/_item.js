// import { request } from "./request.js";
// import storage from "../store.js";
// import { stringifyQs } from "../querystring.js";

// export async function searchItems(params) {
//   const wrapped = await request.get('/api/items/?'+stringifyQs(params));
//   return wrapped;
// }

// export async function postItems(body) {
//   const wrapped = await request.post('/api/items', body);
//   return wrapped;
// }

// export async function searchItemByName(name) {
//   const wrapped = await request.get('/api/items/?name='+name);
//   return wrapped;
// }

// export async function getItemByFace(face) {
//   const wrapped = await request.get('/api/items/'+face);
//   return wrapped;
// }

// export async function addItem(face, body) {
//   const wrapped = await request.put('/api/items/'+face, body);
//   return wrapped;
// }

// export async function updateItem(face, body) {
//   const wrapped = await request.patch('/api/items/'+face, body);
//   return wrapped;
// }
