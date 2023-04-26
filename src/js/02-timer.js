import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
 width: '290px',
 position: 'right-top',
 cssAnimationStyle: 'zoom',
 cssAnimationDuration: 450,
 distance: '40px',
 opacity: 0.7,
});

const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let chosenDate = null;
let intervalId = null;

startBtn.disabled = true;

const options = {
 enableTime: true,
 time_24hr: true,
 defaultDate: new Date(),
 minuteIncrement: 1,
 onClose(selectedDates) {
   chosenDate = selectedDates[0].getTime();
   const currentDateInOptions = new Date();

   if (chosenDate - currentDateInOptions <= 0) {
     startBtn.disabled = true;
     Notiflix.Notify.failure('Please choose a date in the future');
   } else {
     startBtn.disabled = false;
     Notiflix.Notify.success(
       "Great! Click on 'Start' button"
     );
   }
  clearInterval(intervalId);
  },
};

flatpickr('#datetime-picker', options);

function leftTimes() {
 const currentDate = new Date().getTime();
 const leftMs = chosenDate - currentDate;

 if (leftMs > 0) {
   days.innerHTML = addLeadingZero(convertMs(leftMs).days);
   hours.innerHTML = addLeadingZero(convertMs(leftMs).hours);
   minutes.innerHTML = addLeadingZero(convertMs(leftMs).minutes);
   seconds.innerHTML = addLeadingZero(convertMs(leftMs).seconds);
  } else {
   Notiflix.Notify.info('Time is off');
   clearInterval(intervalId);
  }
}
startBtn.addEventListener('click', intervalTimes);

function addLeadingZero(value) {
 return String(value).padStart(2, 0);
}

function intervalTimes() {
 intervalId = setInterval(leftTimes, 1000);
 startBtn.disabled = true;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}