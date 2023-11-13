export default class MemeController {
   constructor(model, view) {
      this.model = model;
      this.view = view;

      // обработчик события загрузки изображения
      document.getElementById('fileInput').addEventListener('change', (event) => {
         const file = event.target.files[0];
         this.handleImageUpload(file);
      });

      // обработчик события добавления текста
      document.querySelector('.add-text_button').addEventListener('click', () => {
         const text = document.querySelector('.text-input-add').value;
         const color = document.querySelector('.text-color-input').value;
         const fontSize = document.querySelector('.text-size-input').value;
         this.handleAddText(text, color, fontSize);
      });

      // обработчик события сохранения мема
      document.querySelector('.save-button').addEventListener('click', () => {
         this.handleSaveMeme();
      });
   }

   handleImageUpload(file) {
      // создаем новый объект FileReader для чтения данных изображения
      const reader = new FileReader();
      // устанавливаем обработчик события который будет вызван когда завершится чтения файла
      reader.onload = () => {
         const image = new Image();
         //src делаем равным reader.result, там содержится DATA Url
         image.src = reader.result;

         image.onload = () => {
            this.model.setImage(image);
            this.view.renderMeme(this.model);
         };
      };

      // запускаем процесс чтения файла в формате Data URL. После завершения этого процесса, 
      //срабатывает обработчик onload, и код внутри него выполняется
      reader.readAsDataURL(file);
   }

   handleSaveMeme() {
      // получаем данные мема для сохранения
      const memeData = this.model.getMemeData();

      // создаем временный холст
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = memeData.image.width;
      tempCanvas.height = memeData.image.height;
      const tempContext = tempCanvas.getContext('2d');

      // рисуем изображение на временном холсте
      tempContext.drawImage(memeData.image, 0, 0, tempCanvas.width, tempCanvas.height);

      // рисуем тексты на временном холсте
      memeData.texts.forEach((text) => {
         tempContext.fillStyle = text.color;
         tempContext.font = `${text.fontSize}px Arial`;
         tempContext.fillText(text.text, text.x, text.y);
      });

      // создаем временную ссылку для скачивания
      const downloadLink = document.createElement('a');
      downloadLink.href = tempCanvas.toDataURL(); // получаем Data URL изображения с текстом
      downloadLink.download = 'meme.png';
      downloadLink.click();
   }
   handleAddText(text, color, fontSize) {
      // добавляем текст в модель
      this.model.addText(text, color, fontSize);
      const lastTextIndex = this.model.texts.length - 1;

      // обновляем текст на канвасе
      this.view.renderMeme(this.model);

      // обновляем слушатели только для последнего добавленного текста
      this.updateTextListeners(lastTextIndex);

      this.view.renderMeme(this.model);
   }

   updateTextListeners(textIndex, textElement) {
      // получаем текущие цвет и размер из модели
      const currentText = this.model.texts[textIndex];
      const textColorInput = document.querySelector('.text-color-input');
      const textSizeInput = document.querySelector('.text-size-input');

      // обновляем значение инпутов цвета и размера
      textColorInput.value = currentText.color;
      textSizeInput.value = currentText.fontSize;

      // удаляем старые слушатели, чтобы избежать их накопления
      textColorInput.removeEventListener('input', this.textColorInputHandler);
      textSizeInput.removeEventListener('input', this.textSizeInputHandler);

      // добавляем новые слушатели
      this.textColorInputHandler = () => {
         const color = textColorInput.value;
         this.model.texts[textIndex].color = color;
         this.view.renderMeme(this.model);
      };
      textColorInput.addEventListener('input', this.textColorInputHandler);

      this.textSizeInputHandler = () => {
         const fontSize = textSizeInput.value;
         this.model.texts[textIndex].fontSize = fontSize;
         this.view.renderMeme(this.model);
      };
      textSizeInput.addEventListener('input', this.textSizeInputHandler);

      // слушатели для кнопок перемещения текста
      const buttonsMoving = document.querySelector('.buttons-moving');
      buttonsMoving.removeEventListener('click', this.buttonsMovingHandler);
      this.buttonsMovingHandler = (event) => {
         const buttonClass = event.target.classList[1];

         switch (buttonClass) {
            case 'up':
               this.handleMoveText('up', textIndex);
               break;
            case 'right':
               this.handleMoveText('right', textIndex);
               break;
            case 'left':
               this.handleMoveText('left', textIndex);
               break;
            case 'down':
               this.handleMoveText('down', textIndex);
               break;
            default:
               break;
         }
      };
      buttonsMoving.addEventListener('click', this.buttonsMovingHandler);
   }
   handleMoveText(direction, textIndex) {
      const step = 10; // шаг перемещения 

      switch (direction) {
         case 'up':
            this.model.texts[textIndex].y -= step;
            break;
         case 'right':
            this.model.texts[textIndex].x += step;
            break;
         case 'left':
            this.model.texts[textIndex].x -= step;
            break;
         case 'down':
            this.model.texts[textIndex].y += step;
            break;
         default:
            break;
      }

      this.model.updateTextPosition(textIndex, this.model.texts[textIndex].x, this.model.texts[textIndex].y);
      this.view.renderMeme(this.model);
   }
}