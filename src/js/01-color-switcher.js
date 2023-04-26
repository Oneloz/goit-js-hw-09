
let intervalId = null;

const bgColor = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', event => {
 event.target.setAttribute('disabled', true);
 btnStop.removeAttribute('disabled');

 intervalId = setInterval(() => {
   bgColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.setAttribute('disabled', '');

btnStop.addEventListener('click', event => {
 event.target.setAttribute('disabled', true);
 btnStart.removeAttribute('disabled');

 clearInterval(intervalId);
});

function getRandomHexColor() {
 return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
