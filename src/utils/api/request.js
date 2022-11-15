const baseUrl = '';

class Request {
  constructor (config = {}) {
    this.config = config;
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
    }
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
}

const request = new Request();

export default request;
export { request };