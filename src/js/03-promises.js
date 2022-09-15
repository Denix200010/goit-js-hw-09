import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onFormSubmit);

let delayInputValue = null;
let stepInputValue = null;
let amountInputValue = null;



function onFormSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount },
  } = e.currentTarget;

  delayInputValue = Number(delay.value);
  stepInputValue = Number(step.value);
  amountInputValue = Number(amount.value);

  for (let i = 1; i <= amountInputValue; i += 1) {
    createPromise(i, delayInputValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInputValue += stepInputValue;
  }
  formRef.reset();
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
