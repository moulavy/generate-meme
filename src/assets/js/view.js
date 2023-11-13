export default class View {
   constructor(canvasSelector) {
      this.canvas = document.querySelector(canvasSelector);
      this.context = this.canvas.getContext('2d');
   }

   renderMeme(model) {
      // очистим холст перед отрисовкой нового мема
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // отрисовываем изображение, если оно есть
      if (model.image) {
         this.context.drawImage(model.image, 0, 0, this.canvas.width, this.canvas.height);
      }

      // отрисовка текстов
      model.texts.forEach((text) => {
         this.context.fillStyle = text.color;
         this.context.font = `${text.fontSize}px Arial`;
         this.context.fillText(text.text, 50, 50); // положение текста
      });
   }
}