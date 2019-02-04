const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
let numberGoblins = 0;
let castleHealth = 5;

//Creates second page with instructions and removes input and first button after submitting the name
function createSecondPage(evg){
  evg.preventDefault();
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. Your task is to defend the castle from 3 hordes of goblins. Good luck.`
  input.remove();
  button.remove();
}

//Creates start button to play the game after submitting name
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

//positions goblin at random position on the top of page
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * window.innerWidth + 'px';
}

//creates goblin with function it wants to stop as parameter
function createGoblin(bc){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    randomPos(goblins);
    document.body.appendChild(goblins);

    setInterval(() => {moveGoblin(goblins)}, 100);

    numberGoblins += 1;
    checkHowMany(20, bc);
}

function moveGoblin(goblinOb){
  goblinOb.style.top = '500px';
}

// setInterval(() => {goblins.classList.toggle('walk')}, 250);


//checks how many number of goblins and stops running function when it reaches limit
function checkHowMany(limit, ab){
  if(numberGoblins === limit){
    window.clearInterval(ab);
  }
}

//starts the game every time start button is pressed
function startGame(ev){
  ev.preventDefault();
  headerOne.remove();
  headerTwo.remove();
  addHealthScore();

  let goblinAppear = setInterval(() => {
  createGoblin(goblinAppear)}, 1000);
}

//displays the health score on upper right side
function addHealthScore(){
  let healthScore = document.createElement('div');
  healthScore.classList.add('health');
  healthScore.innerHTML = `Health: ${castleHealth}`;
  header.appendChild(healthScore);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}
