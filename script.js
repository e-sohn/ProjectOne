const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');

//Intro
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. Your task is to defend the castle from 3 hordes of goblins. Good luck.`
  input.remove();
  button.remove();
  const buttonTwo = document.createElement('button');
  buttonTwo.setAttribute('class', 'secondButton');
  buttonTwo.innerHTML = 'Start';
  form.appendChild(buttonTwo);
})

buttonTwo.addEventListener('click', (ev) => {
  ev.preventDefault();
  console.log('hello');
})


let castleHealth = 0;
