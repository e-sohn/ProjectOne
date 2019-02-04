const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.headerOne');
const headerTwo = document.querySelector('.headerTwo');
const header = document.querySelector('header');
let numberGoblins = 0;
let castleHealth = 5;

function createSecondPage(evg){
  evg.preventDefault();
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. Your task is to defend the castle from 3 hordes of goblins. Good luck.`
  input.remove();
  button.remove();
}
//Creates second button to play the game after submitting name
function createButtonTwo(){
  const buttonTwo = document.createElement('button');
  buttonTwo.setAttribute('class', 'second-button');
  buttonTwo.innerHTML = 'Start';
  form.appendChild(buttonTwo);
  buttonTwo.addEventListener('click', startGame);
}

//Intro with eventListener on first name submit button
button.addEventListener('click', (ev) => {
  createSecondPage(ev);
  createButtonTwo();
})

//creates goblin with function it wants to stop as parameter
function createGoblin(bc){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    document.body.appendChild(goblins);
    randomPos(goblins);
    numberGoblins += 1;
    checkHowMany(5, bc);
}

//checks how many number of goblins and stops running function when it reaches limit
function checkHowMany(limit, ab){
  if(numberGoblins === limit){
    window.clearInterval(ab);
  }
}

function addHealthScore(){
  let healthScore = document.createElement('div');
  healthScore.classList.add('health');
  healthScore.innerHTML = `Health: ${castleHealth}`;
  header.appendChild(healthScore);
  header.style.fontSize = '50px';
  header.style.textAlign = 'left';
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  header.style.color = '#fff';
  header.style.padding = '20px';
}

// function randomPos(goblinObjects){
//     goblinObjects.style.top = window.innerHeight + 'px';
//     goblinObjects.style.left = Math.random() * window.innerWidth + 'px';
//   }

//starts the game every time start button is pressed
function startGame(ev){
  ev.preventDefault();
  headerOne.remove();
  headerTwo.remove();
  addHealthScore();
  let goblinAppear = setInterval(() => {
    createGoblin(goblinAppear)}, 1000);
}
