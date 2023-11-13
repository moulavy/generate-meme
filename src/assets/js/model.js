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
      this.texts.push({ text, color, fontSize });
   }

   getMemeData() {
      return {
         image: this.image,
         texts: this.texts,
      };
   }
}