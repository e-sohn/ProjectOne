const desc = document.querySelector('.description');
const button = document.querySelector('#first-button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
const main = document.querySelector('main');
let numberGoblins = 0;
let castleHealth = 5;
let goblinTotal = 8; //how many goblins created
let goblinSeconds = 5000; //how long it takes goblin to reach wall
let secGob = 500; //how long for goblin to spawn
let howFarDownGobWalk = '700px'; //how far goblin walks down to the wall, may need to change based on screen size

//Intro with eventListener on first name submit button
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  createSecondPage();
  createButtonTwo();
})

// Creates second page with instructions and removes input and first button after submitting the name
function createSecondPage(){
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. There is a horde of goblins running to destroy the wall. Kill the goblins by clicking on them with the pointer before they reach the wall. Good luck.`
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

//starts the game when start button is pressed
function startGame(eve){
  eve.preventDefault();
  headerOne.remove();
  headerTwo.remove();

  castleHealth = 5;
  addHealthScore();

  let goblinAppear = setInterval(() => {
  createGoblin();
  let length = document.querySelectorAll('.green-goblins').length;
  let lastGoblin = document.querySelectorAll('.green-goblins')[length - 1];
  setInterval(() => {lastGoblin.classList.toggle('walk')}, 100);
  setInterval(() => {moveGoblin(lastGoblin)}, 50);
  let checkGobWall = setTimeout(() => {checkGobToWall(lastGoblin)}, goblinSeconds); //removes health by 1 and removes goblin after however long it takes to reach wall
  clickDeath(lastGoblin, checkGobWall); //attaches event listener on each goblin created so that when you click it removes

  //limits number of goblins
  numberGoblins += 1;
  checkHowMany(goblinTotal, goblinAppear);

  }, secGob);

}
// goblins.addEventListener('click', () => {
//   slayGoblin(goblins);
// });

//changes gobl div to slayed goblin
// function slayGoblin(gobl){
//     gobl.classList.add('slayed');
// }

//positions goblin at random position on the top of page
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * (window.innerWidth - 50) + 'px';
}

//creates goblin with function it wants to stop as parameter
function createGoblin(){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    randomPos(goblins);
    document.body.appendChild(goblins);
}

//checks how many number of goblins and stops running function when it reaches limit
function checkHowMany(limit, ab){
  if(numberGoblins === limit){
    window.clearInterval(ab);
  }
}

// function to add event listener on goblin so that every time you click on it, it removes goblin and clears timeout of health
function clickDeath(eachGob, removeHealth){
  eachGob.addEventListener('click', () => {
    setTimeout(() => {
      eachGob.remove();
      clearTimeout(removeHealth);
    }, 100);
  });
}

//subtracts 1 from health, removes gob from div, and checkswin
function checkGobToWall(specificGob){
  castleHealth -= 1;
  let healthBar = document.querySelector('.health');
  healthBar.innerHTML = `Health: ${castleHealth}`;
  specificGob.remove();

  let goblinLefter = document.querySelectorAll('.green-goblins');
  checkWin(goblinTotal, goblinLefter.length);
}

//moves goblin to the point where the wall is
function moveGoblin(goblinOb){
  goblinOb.style.top = howFarDownGobWalk;
}

//checks if player has won
function checkWin(limiter, goblinLeft){
  if(castleHealth === 0){
    createResultBox('lose');
    createReplayButton('lose');
    document.querySelector('header').firstElementChild.remove();

    let gobbsLeft = document.querySelectorAll('.green-goblins');
    gobbsLeft.forEach((gobbles) => {
      gobbles.remove()});
  }
  else if(numberGoblins === limiter && goblinLeft === 0){
    createResultBox('win');
    createReplayButton('win');
    document.querySelector('header').firstElementChild.remove();
  }
}

//displays the health score on upper right side
function addHealthScore(){
  let healthScore = document.createElement('div');
  healthScore.classList.add('health');
  healthScore.innerHTML = `Health: ${castleHealth}`;
  header.appendChild(healthScore);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}

//creates win or lose div after winning or losing
function createResultBox(winOrLoseCase){
  let results = document.createElement('div');
  results.classList.add('results');
  switch(winOrLoseCase){
    case 'win':
      results.innerHTML = 'YOU WIN';
      break;
    case 'lose':
      results.innerHTML = 'YOU LOSE';
      break;
  }
  main.appendChild(results);
}

//creates replay button for win or lose case
function createReplayButton(winOrLose){
  let tryAgain = document.createElement('button');
  tryAgain.type = 'button';
  tryAgain.id = 'replay-button';
  switch(winOrLose){
    case 'win':
      tryAgain.innerHTML = `Play Again`;
      break;
    case 'lose':
      tryAgain.innerHTML = `Try Again`;
      break;
  }
  main.appendChild(tryAgain);
  tryAgain.addEventListener('click', (ev) => {
    document.querySelector('#replay-button').remove();
    document.querySelector('.results').remove();
  });
}
