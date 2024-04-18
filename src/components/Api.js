import { JavascriptModulesPlugin } from "webpack";

export default class Api {
  constructor({ baseUrl, headers }) {
    this.server = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.server}/cards`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getUserInfo() {
    return fetch(`${this.server}/users/me`, { headers: this.headers })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateProfileInfo() {
    fetch(`${this.server}/users/me`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: "", about: "" }),
    });
  }

  updateAvatar() {
    fetch(`${this.server}/users/me/avatar`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ avatar: "" }),
    });
  }

  createCards() {
    fetch(`${this.server}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: "", link: "" }),
    });
  }

  deleteCards(cardID) {
    fetch(`${this.server}/cards/:${cardID}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({ name: "", link: "" }),
    });
  }

  putCardLike(cardID) {
    fetch(`${this.server}/cards/:${cardID}/likes`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ name: "", link: "", isLiked: true }),
    });
  }

  deleteCardLike(cardID) {
    fetch(`${this.server}/cards/:${cardID}/likes`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({ name: "", link: "", isLiked: true }),
    });
  }
}
