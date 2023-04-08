export class Api {
   constructor(config) {
      this._config = config;
   }
   _error(res) {
      if (res.ok) {
         return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
   }
   getInitialCards() {
      return fetch(`${this._config.url}/cards`, {
         method: "GET",
         headers: this._config.headers
      })
         .then(this._error)
   }
   getUser() {
      return fetch(`${this._config.url}/users/me`, {
         method: "GET",
         headers: this._config.headers
      })
         .then(this._error)
   }
   getInitialData() {
      return Promise.all([this.getUser(), this.getInitialCards()])
   }
   setUserInfo(info) {
      return fetch(`${this._config.url}/users/me`, {
         method: "PATCH",
         headers: this._config.headers,
         body: JSON.stringify(info)
      })
         .then(this._error)
   }
   setCard(info) {
      return fetch(`${this._config.url}/cards`, {
         method: "POST",
         headers: this._config.headers,
         body: JSON.stringify(info)
      })
         .then(this._error)
   }
   toggleLikeCard({ idCard, methodCardLike }) {
      return fetch(`${this._config.url}/cards/${idCard}/likes`, {
         method: methodCardLike,
         headers: this._config.headers
      })
         .then(this._error)
   }
   deleteCard(idCard) {
      return fetch(`${this._config.url}/cards/${idCard}`, {
         method: "DELETE",
         headers: this._config.headers
      })
         .then(this._error)
   }
   setAvatar(info) {
      return fetch(`${this._config.url}/users/me/avatar`, {
         method: "PATCH",
         headers: this._config.headers,
         body: JSON.stringify(info)
      })
         .then(this._error)
   }
};
