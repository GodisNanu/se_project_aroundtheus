export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
      avatar: this.avatar.src,
    };
  }

  setUserInfo(name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
  }

  setAvatar(link) {
    this.avatar.src = link;
  }
}
