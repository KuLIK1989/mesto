export default class Popup {
   constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
   };
   open() {
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.classList.add('popup_opened');
   }
   close() {
      document.removeEventListener('keydown', this._handleEscClose)
      this._popup.classList.remove('popup_opened');
   }
   _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
         this.close()
      }
   }
   setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup')) {
            this.close()
         }
         if (evt.target.classList.contains('popup__close-button')) {
            this.close()
         }
      })
   }
}