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

      // создаем временную ссылку для скачивания
      const downloadLink = document.createElement('a');
      downloadLink.href = memeData.image.src;
      downloadLink.download = 'meme.png';
      downloadLink.click();
   }
   handleAddText(text, color, fontSize) {
      this.model.addText(text, color, fontSize);
      const lastTextIndex = this.model.texts.length - 1;

      this.view.renderMeme(this.model);

      // изменение цвета текста
      const textColorInput = document.querySelector('.text-color-input');
      textColorInput.addEventListener('input', () => {
         const color = textColorInput.value;
         this.model.texts[lastTextIndex].color = color;
         this.view.renderMeme(this.model);
      });

      // изменение размера шрифта
      const textSizeInput = document.querySelector('.text-size-input');
      textSizeInput.addEventListener('input', () => {
         const fontSize = textSizeInput.value;
         this.model.texts[lastTextIndex].fontSize = fontSize;
         this.view.renderMeme(this.model);
      });

      // слушатели для кнопок перемещения текста
      const buttonsMoving = document.querySelector('.buttons-moving');
      buttonsMoving.addEventListener('click', (event) => {
         const buttonClass = event.target.classList[1];

         switch (buttonClass) {
            case 'up':
               this.handleMoveText('up', lastTextIndex);
               break;
            case 'right':
               this.handleMoveText('right', lastTextIndex);
               break;
            case 'left':
               this.handleMoveText('left', lastTextIndex);
               break;
            case 'down':
               this.handleMoveText('down', lastTextIndex);
               break;
            default:
               break;
         }
      });
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