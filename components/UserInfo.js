export class UserInfo {
   constructor({ userNameSelector, aboutUserSelector }) {
      this.userName = document.querySelector(userNameSelector);
      this._aboutUser = document.querySelector(aboutUserSelector);
   }
   getUserInfo() {
      const UserInfo = {
         username: this.userName.textContent,
         aboutuser: this._aboutUser.textContent
      }
      return UserInfo;
   }
   setUserInfo() {
      this.userName.textContent = data.username;
      this._aboutUser.textContent = data.aboutuser;

   }
}