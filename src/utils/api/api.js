import { request } from "./request.js";
import storage from "../store.js";

export class KingApi {
  static async opreation(data, callback) {
    const wrapped = await request.post(`/api/db`, data, null, callback);
    return wrapped;
  }
}

export class PrimitiveApi {
  static async lookupSchema(ref_name, forceRefresh=false, callback) {
    if (!forceRefresh) {
      const storedProfile = storage.getItem("appProfile");
      const found = storedProfile?.schemas?.find?.(it=>it.ref_name==ref_name);
      if (found!=null) {
        return {
          ok: true,
          data: {data: found},
          status: -2,
          statusText: "stored value found",
        };
      };
    };
    const queryObject = {
      _type: "Schema",
      ref_name: ref_name,
      limit: 1,
    };
    return EntryApi.lookupEntries(queryObject, callback);
  }
}

export class AppApi {
  static async getVersion(callback) {
    const wrapped = await request.get(`/api/app/version`, null, null, callback);
    return wrapped;
  }
  static async getProfile(keys, forceRefresh=false, callback) {
    if (!forceRefresh) {
      const storedProfile = storage.getItem("appProfile") ?? {};
      if (!keys?.length) {
        return {
          ok: true,
          data: {data: storedProfile},
          status: -2,
          statusText: "stored value found",
        };
      };
      const storedDict = {};
      for (const key of keys) {
        const found = storedProfile?.[key];
        if (found==null) {break;};
        storedDict[key] = found;
      };
      if (Object.keys(storedDict).length>=keys.length) {
        return {
          ok: true,
          data: {data: storedDict},
          status: -2,
          statusText: "stored value found",
        };
      };
    };
    if (keys!=null && !Array.isArray(keys)) {
      keys = [keys];
    };
    const wrapped = await request.get(`/api/app/profile`, (keys!=null?{keys: keys}:null), null, callback);
    return wrapped;
  }
}

export class EntryApi {
  static async createEntry(entry, callback) {
    return EntryApi.createEntries([entry], callback);
  }
  static async createEntries(entries, callback) {
    const wrapped = await request.post(`/api/entries`, entries, null, callback);
    return wrapped;
  }
  static async lookupEntry(queryObject, callback) {
    queryObject.limit = 1;
    return EntryApi.lookupEntries(queryObject, callback);
  }
  static async lookupEntries(queryObject, callback) {
    const wrapped = await request.get(`/api/entries`, queryObject, null, callback);
    return wrapped;
  }
  static async updateEntry(entry, callback) {
    return EntryApi.updateEntries([entry], callback);
  }
  static async updateEntries(entries, callback) {
    const wrapped = await request.post(`/api/entries`, entries, null, callback);
    return wrapped;
  }
  static async deleteEntry(entry, callback) {
    return EntryApi.deleteEntries([entry], callback);
  }
  static async deleteEntries(entries, callback) {
    callback?.({
      params: {data: data},
      wrapped: {
        ok: resp?.ok,
        status: -2,
        statusText: "Don't delete anything",
      },
    });
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

      storage.setItem("access_token_expired", false);
      storage.setItem("have_tried_to_refresh_access_token", false);
      storage.setItem("refresh_token_expired", false);
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
    const access_token = storage.getItem("access_token");
    const refresh_token = storage.getItem("refresh_token");

    storage.removeItem("access_token");
    storage.removeItem("refresh_token");
    storage.removeItem("current_user");

    if (access_token && refresh_token) {
      const wrapped = await request.post(`/api/user/actions/logout`, {
        access_token: access_token,
        refresh_token: refresh_token,
      }, null, callback);
  
      if (wrapped?.data?.ok) {
        storage.removeItem("current_user");
      };
      return wrapped;
    }
  }
}
