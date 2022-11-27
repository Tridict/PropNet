import { request } from "./request.js";
import storage from "../store.js";

export async function login(params) {
  const wrapped = await request.post(`/api/user/actions/login`, params)
  const data = wrapped.data;
  if (data?.access_token) {
    storage.setItem("access_token", data?.access_token);
    storage.setItem("refresh_token", data?.refresh_token);
    storage.setItem("current_user", params.account);
  }
  return data;
}

export async function register(params) {
  const wrapped = await request.post(`/api/user/actions/register`, params);
  if (wrapped?.ok) {
    await login({account: params.username, password: params.password})
  }
  return wrapped;
}

export async function logout() {
  storage.removeItem("access_token");
  storage.removeItem("refresh_token");
  storage.removeItem("current_user");
}