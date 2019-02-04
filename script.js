const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
let numberGoblins = 0;
let castleHealth = 5;

//Intro
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. Your task is to defend the castle from 3 hordes of goblins. Good luck.`
  input.remove();
  button.remove();
  const buttonTwo = document.createElement('button');
  buttonTwo.setAttribute('class', 'second-button');
  buttonTwo.innerHTML = 'Start';
  form.appendChild(buttonTwo);
  buttonTwo.addEventListener('click', startGame);
})

//creates goblin with function it wants to stop as parameter
function createGoblin(bc){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    document.body.appendChild(goblins);
    numberGoblins += 1;
    checkHowMany(5, bc);
}

//checks how many number of goblins and stops running function when it reaches limit
function checkHowMany(limit, ab){
  if(numberGoblins === limit){
    window.clearInterval(ab);
  }
}

//starts the game every time start button is pressed
function startGame(ev){
  ev.preventDefault();
  let goblinAppear = setInterval(() => {
    createGoblin(goblinAppear)}, 1000);
}
