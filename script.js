const canvasContainer = document.querySelector('.canvasContainer');
let pixels = document.querySelectorAll('.pixelDiv');
const slider = document.querySelector('.slider');
const userColor = document.querySelector('#canvasColor');
const clearCanvas = document.querySelector('.clear');
const removeLines = document.querySelector('.removeLines');
const randomColor = document.querySelector('.random');
const opacityMode = document.querySelector('.opacityMode');
// console.log(clearCanvas);

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

function getUserColor() {
  return userColor.value;
}

clearCanvas.addEventListener('click', () => {
  createCanvas();
});

//Changes the pixels color while holding mouse click down rather then always on hover
function changeDefaultColorOnHover() {
  let isMouseDown = false;

  canvasContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isMouseDown = true;
    if (e.target.classList.contains('pixelDiv')) {
      let color = 'black';
      if (getUserColor()) {
        color = getUserColor();
      }
      e.target.style.backgroundColor = color;
    }
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
        if (getUserColor()) {
          color = getUserColor();
        }
        pixel.style.backgroundColor = color;
      }
    });
  });
}
getUserColor();
createCanvas();
changeDefaultColorOnHover();

removeLines.addEventListener('click', () => {
  pixels.forEach((pixel) => {
    if (pixel.style.border === 'none') {
      pixel.style.border = pixel.dataset.previousBorder;
      removeLines.textContent = 'Remove Lines';
    } else {
      removeLines.textContent = 'Add Lines';
      pixel.dataset.previousBorder = pixel.style.border;
      pixel.style.border = 'none';
    }
  });
});

let isRandomColorActive = false;

randomColor.addEventListener('click', () => {
  isRandomColorActive = !isRandomColorActive;
  randomColor.style.border = isRandomColorActive ? '2px solid red' : 'none';

  if (isRandomColorActive) {
    pixels.forEach((pixel) => {
      pixel.addEventListener('mouseover', applyRandomColor);
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', applyRandomColor);
    });
  }
});

function applyRandomColor(e) {
  e.preventDefault();
  if (e.buttons === 1) {
    // Check if the left mouse button is pressed
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    e.target.style.backgroundColor = randomColor;
  }
}

let isOpacityModeActive = false;

opacityMode.addEventListener('click', () => {
  isOpacityModeActive = !isOpacityModeActive;
  opacityMode.style.backgroundColor = isOpacityModeActive ? 'black' : '';
  opacityMode.style.color = isOpacityModeActive ? 'white' : '';

  if (isOpacityModeActive) {
    pixels.forEach((pixel) => {
      pixel.addEventListener('mouseover', incrementOpacity);
    });
    pixels.forEach((pixel) => {
      pixel.addEventListener('mousedown', incrementOpacity);
    });
  } else {
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mouseover', incrementOpacity);
    });
    pixels.forEach((pixel) => {
      pixel.removeEventListener('mousedown', incrementOpacity);
    });
  }
});

function incrementOpacity(e) {
  e.preventDefault();
  if (e.buttons === 1) {
    if (!e.target.style.backgroundColor) {
      e.target.style.backgroundColor = getUserColor() || 'black';
    }
    let currentOpacity = parseFloat(e.target.style.opacity) || 0;
    if (currentOpacity < 1) {
      currentOpacity += 0.1;
      e.target.style.opacity = currentOpacity;
    }
  }
}
