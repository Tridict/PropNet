import { request } from "./request.js";

export async function login(params) {
  const res = await request.post(`/api/user/actions/login`, params).then(async(res)=>{
    if (res?.ok || res?.status==200) {
      const data = await res?.json?.();
      localStorage.setItem("access_token", data?.access_token);
      localStorage.setItem("refresh_token", data?.refresh_token);
      console.log(data);
    };
    return res;
  });
  return res;
}

export async function register(params) {
  const res = await request.post(`/api/user/actions/register`, params);
  return res;
}
