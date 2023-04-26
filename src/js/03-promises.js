import Notiflix from 'notiflix';

Notiflix.Notify.init({
 width: '270px',
 position: 'right-top',
 cssAnimationStyle: 'zoom',
 cssAnimationDuration: 450,
 distance: '45px',
 opacity: 0.7,
});

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delay = Number(event.currentTarget.delay.value);
  const step = Number(event.currentTarget.step.value);
  const amount = Number(event.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
   createPromise(position, delay)
     .then(({ position, delay }) => {
       setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
            useIcon: false,
         });
       }, delay);
     })
     .catch(({ position, delay }) => {
       setTimeout(() => {
         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
           useIcon: false,
         });
       }, delay);
     });
   delay += step;
 }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(objectPromise);
    }
    reject(objectPromise);
  });
}