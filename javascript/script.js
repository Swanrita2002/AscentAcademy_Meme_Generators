const form = document.getElementById('meme-form');
const imageInput = document.getElementById('image-input');
const topTextInput = document.getElementById('top-text');
const bottomTextInput = document.getElementById('bottom-text');
const memeContainer = document.getElementById('meme-container');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const image = imageInput.files[0];
  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  if (image && topText && bottomText) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        context.fillStyle = '#fff';
        context.font = 'bold 40px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillText(topText, canvas.width / 2, 10);
        context.fillText(bottomText, canvas.width / 2, canvas.height - 50);

        const memeImg = new Image();
        memeImg.src = canvas.toDataURL('image/png');

        memeContainer.innerHTML = '';
        memeContainer.appendChild(memeImg);
      }
    }
  } else {
    alert('Please fill all the fields!');
  }
});

