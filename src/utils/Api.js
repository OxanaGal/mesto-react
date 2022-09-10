class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  _request(url, options) {
    return fetch(url, options).then(this._checkServerResponse)
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  getInitialCards() {
    return this._request(`${this._url}/cards/`, {
      method: 'GET',
      headers: this._headers
    })
  }

  patchUserProfile(data) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about })
    })
  }

  patchUserAvatar(data) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  postNewCard(item){
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: item.name, link: item.link })
    })
  }


  deleteCard(cardId){
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  toggleLike(cardId, isLiked) {
    return this._request(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: isLiked ? 'PUT' : 'DELETE' ,
    })
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'f4adbd05-b875-4ca6-87f0-5ee77caa205a',
    'Content-Type': 'application/json'
  }
});











