import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const inputDateRef = document.querySelector('#datetime-picker');
const btnStartRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');  
let currentTime = null;
const DELAY = 1000;

btnStartRef.addEventListener('click', onBtnClick);
btnStartRef.addEventListener('click', onBtnClick);
btnSetDisabled();

const timer = {
    start() {
    const interval = setInterval(() => {
      const startTime = new Date();
      const deltaTime = currentTime - startTime;
      
      const { days, hours, minutes, seconds } = convertMs(deltaTime);
    
      daysRef.textContent = days;
      hoursRef.textContent = hours;
      minutesRef.textContent = minutes;
      secondsRef.textContent = seconds;

      if (days == '00' && hours == '00' && minutes == '00' && seconds == '00') {
        clearInterval(interval);
      }
        }, 1000)
    }
}

function btnSetDisabled() {
    btnStartRef.setAttribute('disabled', 'disabled');
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}
function onBtnClick() {
  timer.start();
  btnSetDisabled();
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
flatpickr(inputDateRef, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
      if (dateNow.getTime() >= selectedDates[0].getTime()) {
          Notify.failure('Please choose a date in the future');
          btnSetDisabled();
          return;
      } else (btnStartRef.removeAttribute('disabled', 'disabled'),
        Notify.success('Thank you! The current date is valid!'));
    currentTime = selectedDates[0].getTime();
    
  },
})