export default class MemeModel {
   constructor() {
      this.image = null;
      this.texts = [];
   }

   // обновления данных модели
   setImage(image) {
      this.image = image;
   }

   addText(text, color, fontSize) {
      const centerX = this.image ? 50 : 0;
      const centerY = this.image ? 50 : 0;

      this.texts.push({ text, color, fontSize, x: centerX, y: centerY });
   }
   updateTextPosition(textIndex, x, y) {
      if (textIndex >= 0 && textIndex < this.texts.length) {
         this.texts[textIndex].x = x;
         this.texts[textIndex].y = y;
      }
   }

   getMemeData() {
      return {
         image: this.image,
         texts: this.texts,
      };
   }
}