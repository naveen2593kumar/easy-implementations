class ColorMe {

  hexToRGB(hex = '') {
    const hexNumber = hex.replace('#', '');

    return {
      r: parseInt(hexNumber.substr(0, 2), 16),
      g: parseInt(hexNumber.substr(2, 2), 16),
      b: parseInt(hexNumber.substr(4, 2), 16),
    };
  }

  rgbToHex({ r, g, b } = {}) {
    return `${(+r).toString(16).padStart(2, '0')}${(+g).toString(16).padStart(2, '0')}${(+b).toString(16).padStart(2, '0')}`;
  }

  generateRandomColorCodes() {
    const r = Math.floor((Math.random() * 256));
    const g = Math.floor((Math.random() * 256));
    const b = Math.floor((Math.random() * 256));
    const hexNumber = this.rgbToHex({ r, g, b });

    return {
      hex: `#${hexNumber}`.toUpperCase(),
      rgb: { r, g, b },
      invert: { r: 255 - r, g: 255 - g, b: 255 - b }
    };
  }
}

const colorMe = new ColorMe();

const randomColorButton = document.getElementById('randomColorButton');
const hexCodeElement = document.getElementById('hexCodeInput');
const rCodeElement = document.getElementById('rCodeInput');
const gCodeElement = document.getElementById('gCodeInput');
const bCodeElement = document.getElementById('bCodeInput');
const rgbElement = [rCodeElement, gCodeElement, bCodeElement];

hexCodeElement.addEventListener('input', ({ target }) => {
  const hexInput = target.innerText;
  const formatHexCode = hexInput.padEnd(6, '0').substr(0, 6);

  document.body.style.backgroundColor = `#${formatHexCode}`;
});

hexCodeElement.addEventListener('blur', ({ target }) => {
  const hexInput = target.innerText;
  const formatHexCode = hexInput.padEnd(6, '0').substr(0, 6);
  const rgb = colorMe.hexToRGB(formatHexCode);

  loadUI({ hex: `#${formatHexCode}`, rgb, invert: { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } });
});

rgbElement.forEach((colorElement) => {
  colorElement.addEventListener('input', ({ target }) => {
    const rCode = rCodeElement.innerText;
    const gCode = gCodeElement.innerText;
    const bCode = bCodeElement.innerText;

    document.body.style.backgroundColor = `rgb(${rCode.padStart(3, '0')}, ${gCode.padStart(3, '0')}, ${bCode.padStart(3, '0')})`;
  });

  colorElement.addEventListener('blur', ({ target }) => {
    const rCode = rCodeElement.innerText;
    const gCode = gCodeElement.innerText;
    const bCode = bCodeElement.innerText;

    const rgb = {
      r: parseInt(rCode.padStart(3, '0'), 10), g: parseInt(gCode.padStart(3, '0'), 10), b: parseInt(bCode.padStart(3, '0'), 10)
    };

    loadUI({ hex: colorMe.rgbToHex(rgb), rgb, invert: { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b } });
  });
});


const loadUI = ({ hex, rgb, invert }) => {
  document.body.style.backgroundColor = hex;
  document.body.style.color = `rgb(${`${invert.r}`.padStart(3, '0')}, ${`${invert.g}`.padStart(3, '0')}, ${`${invert.b}`.padStart(3, '0')})`;;

  rCodeElement.innerText = `${rgb.r}`.padStart(3, '0');
  gCodeElement.innerText = `${rgb.g}`.padStart(3, '0');
  bCodeElement.innerText = `${rgb.b}`.padStart(3, '0');

  hexCodeElement.innerText = hex.replace('#', '');
};


document.body.onload = () => {
  const colorCodes = colorMe.generateRandomColorCodes();

  loadUI(colorCodes);
};

randomColorButton.addEventListener('click', () => {
  const colorCodes = colorMe.generateRandomColorCodes();

  loadUI(colorCodes);
});


