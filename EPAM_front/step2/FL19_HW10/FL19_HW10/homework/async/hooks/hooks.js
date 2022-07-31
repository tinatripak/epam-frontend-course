export class User {
  constructor(email) {
    this.email = email;
  }

  updateEmail(email) {
    this.email = email;
  }

  removeEmail() {
    this.email = '';
  }
}