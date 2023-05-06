class AuthApi {
  constructor(config) {
    this._url = config.url;
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
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        password
      })
    })

  };

  authorize(email, password) {
    return this._request(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })

  }

  getContent(token) {
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
  // url: 'http://localhost:3001',
  url: 'https://api.projectmesto.averiano.nomoredomains.monster',
});