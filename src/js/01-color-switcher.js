const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
let timeId = null;

btnStartRef.addEventListener('click', onStartClick);
btnStopRef.addEventListener('click', onStopClick);

function onStartClick(e) {
    const DELAY = 1000;
    btnStartRef.setAttribute('disabled', 'disabled');
    timeId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
        document.body.style.transition = '150ms';
    }, DELAY);
}

function onStopClick(e) {
    clearInterval(timeId);
    btnStartRef.removeAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}