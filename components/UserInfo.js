export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this.name = document.querySelector(nameSelector);
    this.job = document.querySelector(jobSelector);
    this.profileNameInput = document.querySelector("#name-input");
    this.profileDescriptionInput = document.querySelector("#description-input");
  }

  getUserInfo() {
    return {
      name: this.name.textContent,
      job: this.job.textContent,
    };
  }

  setUserInfo() {
    this.name.textContent = this.profileNameInput.value;
    this.job.textContent = this.profileDescriptionInput.value;
  }
}
