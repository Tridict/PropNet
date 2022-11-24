import { request } from "./request.js";
import storage from "../stores.js";

export async function login(params) {
  const res = await request.post(`/api/user/actions/login`, params)
  const data = await res.json();
  storage.setItem("access_token", data?.access_token);
  storage.setItem("refresh_token", data?.refresh_token);
  storage.setItem("current_user", params.account);
  return data;
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