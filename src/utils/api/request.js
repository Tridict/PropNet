import storage from "../stores.js";

const baseUrl = 'http://192.168.0.101:8000';


class Request {
  constructor (config = {}) {
    this.config = config;
  }

  static async wrapResponse(resp) {
    const content_type = resp?.headers?.get("content-type") ?? "";
    const wrapped = {
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
    if (wrapped.isJson) {
      try {
        wrapped.data = await resp.json();
      } catch(err) {
        wrapped.errorJson = true;
        wrapped.text = await resp.text();
      };
    } else {
      wrapped.text = await resp.text();
    };
    return wrapped;
  }

  async request(path, params) {
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
        } else {
          Object.assign(params.headers, {
            'authorization': `Bearer ${access_token}`,
            'X-CSRF-TOKEN': access_token,
          });
        };
      };
      const res = await fetch(baseUrl + path, params);
      return res;
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

  async get(path, config={}) {
    const params = {
      method: 'GET',
      ...config,
      ...this.config,
    };
    return await this.request(path, params);
  }

  async post(path, data, config={}) {
    const params = {
      method: 'POST',
      ...config,
      ...this.config,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await this.request(path, params);
  }

  async put(path, data, config={}) {
    const params = {
      method: 'PUT',
      ...config,
      ...this.config,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await this.request(path, params);
  }

  async patch(path, data, config={}) {
    const params = {
      method: 'PATCH',
      ...config,
      ...this.config,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return await this.request(path, params);
  }
}

const request = new Request();
window.__request = request;

export default request;
export { request };