import { request } from "./request.js";

export async function getItemByFace(face) {
  const res = await request.get('/api/item/'+face);
  return res;
}

export async function searchItemByName(name) {
  const res = await request.get('/api/item/?name='+name);
  return res;
}