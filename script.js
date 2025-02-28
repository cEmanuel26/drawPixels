const canvasContainer = document.querySelector('.canvasContainer');
console.log(canvasContainer);

function createCanvas() {
  for (let i = 0; i < 16; i++) {
    for (let y = 0; y < 16; y++) {
      const pixel = document.createElement('div');
      pixel.classList.add('pixelDiv');
      canvasContainer.appendChild(pixel);
    }
  }
}

function changeDefaultColorOnHover() {
  const pixels = document.querySelectorAll('.pixelDiv');
  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', () => {
      pixel.style.backgroundColor = 'black';
    });
  });
}

createCanvas();
changeDefaultColorOnHover();
