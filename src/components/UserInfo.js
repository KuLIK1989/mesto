export class UserInfo {
   constructor( userNameSelector, aboutUserSelector, userAvatarSelector ) {
      this._userName = document.querySelector(userNameSelector);
      this._aboutUser = document.querySelector(aboutUserSelector);
      this._userAvatar = document.querySelector(userAvatarSelector);
      this._myId = "";
   }
   getUserInfo() {
      return {
         name: this._userName.textContent,
         about: this._aboutUser.textContent,
         myId: this._myId
      };
   };
   setUserInfo({ name, about, myId = ""}) {
      if (name) {
         this._userName.textContent = name;
      };
      if (about) {
         this._aboutUser.textContent = about;
      };
      if (!this._myId) {this._myId = myId}
      // this._userName.textContent = data.username;
      // this._aboutUser.textContent = data.aboutuser;
   }
   renderAvatar(link) {
      if (link) {
         this._userAvatar.src = link
      };
   }
   renderUserInfo(info) {
      this.setUserInfo({ name: info.name, about: info.about, myId: info.myId });
      this.renderAvatar(info.avatar)
   }
}