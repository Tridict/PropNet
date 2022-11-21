import storage from "../stores.js";

const baseUrl = 'http://192.168.0.101:8000';


class Request {
  constructor (config = {}) {
    this.config = config;
  }

  async request(path, params) {
    try {
      const access_token = storage.getItem("access_token");
      if (access_token?.length) {
        Object.assign(params, {
          headers: {
            'authorization': `Bearer ${access_token}`,
            'X-CSRF-TOKEN': access_token,
          },
        });
      };
      const res = await fetch(baseUrl + path, params);
      if (res?.ok || res?.status==200) {
        return await res?.json?.();
      } else if (res?.statusText) {
        return await res?.body;
      } else {
        return res;
      }
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