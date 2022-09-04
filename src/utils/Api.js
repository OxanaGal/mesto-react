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

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards/`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => this._checkServerResponse(res));
  }

  patchUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about })
    })
      .then((res) => this._checkServerResponse(res));
  }

  patchUserAvatar(data) {

    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.link})
    })
      .then((res) => this._checkServerResponse(res));
  }

  postNewCard(item){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name: item.name, link: item.link })
    })
      .then((res) => this._checkServerResponse(res));
  }


  deleteCard(cardId){
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkServerResponse(res));
  }

  toggleLike(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: isLiked ? 'DELETE' : 'PUT',
    })
      .then((res) => this._checkServerResponse(res));
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
  headers: {
    authorization: 'f4adbd05-b875-4ca6-87f0-5ee77caa205a',
    'Content-Type': 'application/json'
  }
});











