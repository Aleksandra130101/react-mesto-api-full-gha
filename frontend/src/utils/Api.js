class Api {
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

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      credentials: 'include'
    })
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include'
    })
  }


  updateUserInfo(name, about) {
    console.log("name=" + JSON.stringify(name));
    console.log("about=" + JSON.stringify(about));
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH', 
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
  }

  updateAvatar(avatar) {
    console.log("avatar = " + JSON.stringify(avatar))
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    })
  }

  addNewCard(user) {
    console.log("user=" + JSON.stringify(user))
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        link: user.image
      }),
    })
  }

  putLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    })
  }

  deleteLike(cardId) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
  }
}

export const api = new Api({
  url: 'http://localhost:3001',
  // url: 'https://api.projectmesto.averiano.nomoredomains.monster',
  headers: {
    authorization: '18c1f460-1209-46d8-b484-04ad7ddb3f47',
    'Content-Type': 'application/json'
  },
});