export default class Api {
  constructor({ baseUrl, headers }) {
    this.server = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.server}/cards`, {
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this.server}/users/me`, {
      headers: this.headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  renderCards() {
    return Promise.all(this.getUserInfo(), this.getInitialCards());
  }

  updateProfileInfo(name, about) {
    fetch(`${this.server}/users/me`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateAvatar(avatar) {
    fetch(`${this.server}/users/me/avatar`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  createCards(name, link) {
    fetch(`${this.server}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCards(cardID) {
    fetch(`${this.server}/cards/:${cardID}`, {
      method: "DELETE",
      headers: this.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  putCardLike(cardID) {
    fetch(`${this.server}/cards/:${cardID}/likes`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ name: "", link: "", isLiked: true }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCardLike(cardID) {
    fetch(`${this.server}/cards/:${cardID}/likes`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({ name, link, isLiked: true }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
