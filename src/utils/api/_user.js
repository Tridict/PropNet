// import { request } from "./request.js";
// import storage from "../store.js";

// export async function login(params) {
//   console.log(params);
//   const wrapped = await request.post(`/api/user/actions/login`, params);
//   console.log(wrapped);
//   const data = wrapped.data;
//   if (data?.data?.access_token) {
//     storage.setItem("access_token", data?.data?.access_token);
//     storage.setItem("refresh_token", data?.data?.refresh_token);
//     storage.setItem("current_user", data?.data?.user);
//   }
//   return data;
// }

// export async function register(params) {
//   const wrapped = await request.post(`/api/user/actions/register`, params);
//   if (wrapped?.ok) {
//     await login({account: params.username, password: params.password})
//   }
//   return wrapped;
// }

// export async function logout() {
//   storage.removeItem("access_token");
//   storage.removeItem("refresh_token");
//   storage.removeItem("current_user");
// }