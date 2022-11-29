import { request } from "./request.js";
import storage from "../store.js";

export class KingApi {
  static async opreation(params, callback) {
    const wrapped = await request.post(`/api/db`, params, {}, callback);
    return wrapped;
  }
}

export class UserApi {
  static async login(params) {
    const wrapped = await request.post(`/api/user/actions/login`, params);
    const data = wrapped?.data?.data;
    if (data?.access_token) {
      storage.setItem("access_token", data?.access_token);
      storage.setItem("refresh_token", data?.refresh_token);
      storage.setItem("current_user", data?.user);
    };
    return wrapped;
  }

  static async register(params) {
    const wrapped = await request.post(`/api/user/actions/register`, params);
    if (wrapped?.ok) {
      await UserApi.login({account: params.username, password: params.password});
    };
    return wrapped;
  }
  
  static async logout(callback) {
    const wrapped = await request.post(`/api/user/actions/logout`, {
      access_token: storage.getItem("access_token"),
      refresh_token: storage.getItem("refresh_token"),
    }, {}, callback);
    storage.removeItem("access_token");
    storage.removeItem("refresh_token");
    storage.removeItem("current_user");
  }
}
