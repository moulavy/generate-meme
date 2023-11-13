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
         // Вычисляем соотношение сторон изображения
         const aspectRatio = model.image.width / model.image.height;

         // Устанавливаем размеры холста с учетом соотношения сторон изображения
         this.canvas.width = this.canvas.width; // Сброс размера холста
         this.canvas.width = this.canvas.height * aspectRatio;
         this.context.drawImage(model.image, 0, 0, this.canvas.width, this.canvas.height);
      }

      // отрисовка текстов
      model.texts.forEach((text) => {
         this.context.fillStyle = text.color;
         this.context.font = `${text.fontSize}px Arial`;
         const x = (text.x / model.image.width) * this.canvas.width;
         const y = (text.y / model.image.height) * this.canvas.height;

         this.context.fillText(text.text, x, y);
      });
   }
   
}