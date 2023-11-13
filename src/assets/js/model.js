export default class Model{
   constructor() {
      this.image = null;
      this.texts = [];
   }
   setImage(image) {
      this.image = image;
   }
   addText(text) {
      this.text.push({ text, x: 50, y: 50 });
   }
   getTexts() {
      return this.texts;
   }
}
