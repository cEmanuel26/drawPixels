const canvasContainer = document.querySelector('.canvasContainer');
let pixels = document.querySelectorAll('.pixelDiv');
const slider = document.querySelector('.slider');

function createCanvas() {
  slider.addEventListener('input', function () {
    canvasContainer.innerHTML = ''; // Clear existing pixels
    for (let i = 0; i < this.value; i++) {
      for (let y = 0; y < this.value; y++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixelDiv');
        canvasContainer.appendChild(pixel);
        pixel.style.height = 100 / this.value + '%';
        pixel.style.width = 100 / this.value + '%';
      }
    }
    pixels = document.querySelectorAll('.pixelDiv'); // Update pixels variable
    changeDefaultColorOnHover(); // Re-apply event listeners
  });

  // Set default starting value for the slider
  slider.value = 16; // You can set this to any default value you want
  slider.dispatchEvent(new Event('input')); // Trigger the input event to create the initial canvas
}

//Changes the pixels color while holding mouse click down rather then always on hover
function changeDefaultColorOnHover() {
  let isMouseDown = false;

  canvasContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMouseDown = true;
  });

  canvasContainer.addEventListener('mouseup', (e) => {
    e.preventDefault();
    isMouseDown = false;
  });

  canvasContainer.addEventListener('mouseleave', (e) => {
    e.preventDefault();
    isMouseDown = false;
  });

  pixels.forEach((pixel) => {
    pixel.addEventListener('mouseover', (e) => {
      e.preventDefault();
      if (isMouseDown) {
        pixel.style.backgroundColor = 'black';
      }
    });
  });
}

createCanvas();
changeDefaultColorOnHover();
