import { request } from "./request.js";

export async function login(params) {
  const res = await request.post(`/api/user/actions/login`, params);
  return res;
}

export async function register(params) {
  const res = await request.post(`/api/user/actions/register`, params);
  return res;
}
