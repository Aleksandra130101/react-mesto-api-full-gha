class Api {
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

  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    })
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      // credentials: 'include'
    })
  }


  updateUserInfo(name, about) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
  }

  updateAvatar(avatar) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        avatar: avatar.avatar,
      }),
    })
  }

  addNewCard(user) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({
        name: user.name,
        link: user.image
      }),
    })
  }

  putLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }

  deleteCard(id) {
    const token = localStorage.getItem('token');
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }
}

export const api = new Api({
  // url: 'http://localhost:3001',
  url: 'https://api.projectmesto.averiano.nomoredomains.monster',
});