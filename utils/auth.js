class AuthApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  register(email, password) {
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })

  };

  authorize(email, password) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })

  }

  getContent(token) {
    //console.log("token2 = " + token);
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    })
  }

}

export const apiAuth = new AuthApi({
  url: 'http://localhost:3001',
  // url: 'https://api.projectmesto.averiano.nomoredomains.monster',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
});