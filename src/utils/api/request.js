const baseUrl = 'http://192.168.0.101:8000';

class Request {
  constructor (config = {}) {
    this.config = config;
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  async request(path, params) {
    try {
      const res = await fetch(baseUrl + path, params);
      return res;
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
    const access_token = localStorage.getItem("access_token");
    if (access_token?.length) {
      Object.assign(params, {
        headers: {
          'authorization': `Bearer ${access_token}`,
          'X-CSRF-TOKEN': access_token,
        },
      });
    };
    return this.request(path, params);
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
    return this.request(path, params);
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
    return this.request(path, params);
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
    return this.request(path, params);
  }
}

const request = new Request();
window.__request = request;

export default request;
export { request };