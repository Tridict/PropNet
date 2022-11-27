import { request } from "./request.js";
import storage from "../store.js";
import {
    MessagePlugin,
  } from "../../../vendor/tdesign.min.js";

export async function opreation(params) {
  const wrapped = await request.post(`/api/db`, params, {}, ({path, params, wrapped})=>{
    MessagePlugin.info(JSON.stringify(wrapped));
  });
  return wrapped;
}

export async function register(params) {
  const res = await request.post(`/api/user/actions/register`, params);
  const data = await res.json();
  if (res.ok) {
    data.ok = true;
    await login({account: params.username, password: params.password})
  }
  return data;
}

export async function logout() {
  storage.removeItem("access_token");
  storage.removeItem("refresh_token");
  storage.removeItem("current_user");
}