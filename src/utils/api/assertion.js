import { stringifyQs } from "../querystring.js";
import { request } from "./request.js";

export async function getRandomAssertion() {
  const res = await request.get('/api/assertion');
}

export async function getAssertion(id) {
  const res = await request.get('/api/assertion/' + id);
}

/**
 * 
 * @param {*} params 查询的参数，可以用face或id来查，可以控制limit（查询多少条）
 */
export async function queryAssertion(params) {
  const res = await request.get(`/api/assertion/?${stringifyQs(params)}`);
}