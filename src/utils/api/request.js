import storage from "../store.js";
import { stringifyQs } from "../querystring.js";

const baseUrl = 'http://192.168.0.101:8000';

// https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods

class Request {
  constructor (config = {}) {
    this.config = config;
  }

  async wrapResponse(resp) {
    if (!resp?.ok && resp?.fetchError!=null) {
      console.log(resp.fetchError);
      return {
        real: false,
        "content-type": "",
        ok: resp?.ok,
        status: -1,
        statusText: "fetchError",
        fetchError: resp.fetchError,
      };
    };
    // console.log(resp);
    const content_type = resp?.headers?.get("content-type") ?? "";
    const wrapped = {
      real: true,
      // resp: resp,
      ok: resp?.ok,
      status: resp?.status,
      statusText: resp?.statusText,
      "content-type": resp?.headers?.["content-type"] ?? "",
    };
    if (!!content_type.toLowerCase().includes("json")) {
      wrapped.isJson = true;
    };
    if (!!content_type.toLowerCase().includes("html")) {
      wrapped.isHtml = true;
    };
    const wrapped_text = await resp.text();
    if (wrapped.isJson) {
      try {
        wrapped.data = JSON.parse(wrapped_text);
      } catch(err) {
        wrapped.errorJson = true;
        wrapped.text = wrapped_text;
      };
    } else {
      wrapped.text = wrapped_text;
    };
    return wrapped;
  }

  async refreshAccess() {
    if (!storage.getItem("have_tried_to_refresh_access_token")) {
      storage.setItem("have_tried_to_refresh_access_token", true);
      const wrapped_access_token = await this.post('/api/user/actions/refresh', null, {
        headers: {
          'authorization': `Bearer ${storage.getItem("refresh_token")}`,
        },
      });
      if (wrapped_access_token?.data?.data!=null) {
        const access_token = wrapped_access_token.data.data;
        storage.setItem('access_token', access_token);
        return {ok: true, access_token: access_token};
      };
      if (wrapped_access_token.status==401 && wrapped_access_token?.data?.msg?.includes?.("Token has expired")) {
        storage.setItem("refresh_token_expired", true);
      };
    };
    return {ok: false};
  }

  async request(path, params, callback) {
    try {
      const access_token = storage.getItem("access_token");
      if (access_token?.length) {
        if (params?.headers==null) {
          Object.assign(params, {
            headers: {
              'authorization': `Bearer ${access_token}`,
              'X-CSRF-TOKEN': access_token,
            },
          });
        } else if (!params.headers.authorization) {
          Object.assign(params.headers, {
            'authorization': `Bearer ${access_token}`,
            'X-CSRF-TOKEN': access_token,
          });
        };
      };
      let res = {};
      try {
        res = await fetch(baseUrl + path, params);
      } catch(error) {
        res = {
          ok: false,
          fetchError: error,
        };
      };
      const wrapped = await this.wrapResponse(res);


      if (wrapped.status==401 && wrapped?.data?.msg?.includes?.("Token has expired")) {
        if (!storage.getItem("have_tried_to_refresh_access_token")) {
          storage.setItem("access_token_expired", true);
          const result = await this.refreshAccess();

          if (result?.ok) {
            params.headers.authorization = result?.access_token ? `Bearer ${result?.access_token}` : null;
            storage.setItem("access_token_expired", false);
            storage.setItem("have_tried_to_refresh_access_token", false);
            return this.request(path, params, callback);
          };
          storage.setItem("have_tried_to_refresh_access_token", true);
        };
      };

      wrapped.access_token_expired = storage.getItem("access_token_expired");
      wrapped.have_tried_to_refresh_access_token = storage.getItem("have_tried_to_refresh_access_token");
      wrapped.refresh_token_expired = storage.getItem("refresh_token_expired");


      callback?.({path, params, wrapped});
      return wrapped;
      // if (res?.ok || res?.status==200) {
      //   return await res?.json?.();
      // } else if (res?.statusText) {
      //   return await res?.body;
      // } else {
      //   return res;
      // }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async get(path, queryObject=null, config={}, callback) {
    if (queryObject!=null) {
      const queryString = stringifyQs(queryObject);
      const splited = path.split("?");
      const last = splited[splited.length-1];
      if (splited?.length>=2 && last.length) {
        if (last.endsWith("&")) {
          path = `${path}${queryString}`;
        } else {
          path = `${path}&${queryString}`;
        };
      } else {
        path = `${path}?${queryString}`;
      };
    };
    const params = {
      method: 'GET',
      ...this.config,
      ...(config??{}),
    };
    return await this.request(path, params, callback);
  }

  async post(path, data, config={}, callback) {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.config?.headers||{}),
      ...(config?.headers||{}),
    }
    const params = {
      method: 'POST',
      body: JSON.stringify(data),
      ...this.config,
      ...(config??{}),
      headers,
    }

    return await this.request(path, params, callback);
  }

  async put(path, data, config={}, callback) {
    const params = {
      method: 'PUT',
      ...(config??{}),
      ...this.config,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await this.request(path, params, callback);
  }

  async patch(path, data, config={}, callback) {
    const params = {
      method: 'PATCH',
      ...(config??{}),
      ...this.config,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await this.request(path, params, callback);
  }
}

const request = new Request();
window.__request = request;

export default request;
export { request };