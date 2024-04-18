export default class Api {
  constructor({ baseURl, headers }) {
    this.server = baseURl;
    this.headers = headers;
    console.log(baseURl);
  }

  getInitialCards() {
    return fetch(this.server, {
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

  getUserInfo() {}

  updateProfileInfo() {}

  updateAvatar() {}

  createCards() {}

  deleteCards() {}

  putCardLike() {}

  deleteCardLike() {}
}
