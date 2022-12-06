export class UserInfo {
   constructor(userNameSelector, aboutUserSelector) {
      this._userName = document.querySelector(userNameSelector);
      this._aboutUser = document.querySelector(aboutUserSelector);
   }
   getUserInfo() {
      const UserInfo = {
         username: this._userName.textContent,
         aboutuser: this._aboutUser.textContent
      }
      return UserInfo;
   }
   setUserInfo(data) {
      this._userName.textContent = data.name;
      this._aboutUser.textContent = data.status;
   }
}