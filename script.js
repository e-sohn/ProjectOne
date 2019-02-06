const desc = document.querySelector('.description');
const button = document.querySelector('#first-button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
const main = document.querySelector('main');
let numberGoblins = 0;
let castleHealthBeginning = 3; //how much health to start off with
let castleHealth = castleHealthBeginning;
let goblinTotal = 5; //how many goblins created
let secondsToWall = 5000; //how long it takes goblin to reach wall, must change css transition of green-goblin to match
let timeGoblinSpawn = 500; //how long for goblin to spawn
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
  buttonTwo.addEventListener('click', gameUnlimitedGoblins);
}

//resets castleHealth to beginning
function reset(){
  headerOne.remove();
  headerTwo.remove();
  castleHealth = castleHealthBeginning;
  addHealthScore();
}

function createGoblinAddIntAndEventList(){
  createGoblin();
  let lengthOfGoblinList = document.querySelectorAll('.green-goblins').length;
  let lastGoblin = document.querySelectorAll('.green-goblins')[lengthOfGoblinList - 1];

  setInterval(() => {lastGoblin.classList.toggle('walk')}, 100); //toggles the class of the lastGoblin that was just created to walk

  setTimeout(() => {moveGoblin(lastGoblin)}, 50); //sets lastgoblin position after 50 milisecond

  let intervalToSubtractHealthGobToWall = setTimeout(() => {subtractHealthGobToWall(lastGoblin)}, secondsToWall); //removes health by 1 and removes goblin after however long it takes to reach wall

  clickDeath(lastGoblin, intervalToSubtractHealthGobToWall); //attaches event listener on each goblin created so that when you click it removes
};

//starts the game when start button is pressed
function startGame(eve){
  eve.preventDefault();
  reset();
  numberGoblins = 0; //resets numberGoblins

  let goblinAppear = setInterval(() => {
    createGoblinAddIntAndEventList();
    numberGoblins += 1;
    checkHowMany(goblinTotal, goblinAppear); //limits number of goblins
  }, timeGoblinSpawn);

}

function gameUnlimitedGoblins(eve){
  eve.preventDefault();
  reset();
  let goblinAppear = setInterval(() => {
    createGoblinAddIntAndEventList();
  }, timeGoblinSpawn);
}

//positions goblin at random position on the top of page
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * (window.innerWidth - 50) + 'px';
}

//creates goblin div
function createGoblin(){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    randomPos(goblins);
    document.body.appendChild(goblins);
}

//checks how many number of goblins were created and stops running setInterval when it reaches limit of goblins that you want to create
function checkHowMany(limit, setIntervalStop){
  if(numberGoblins === limit){
    window.clearInterval(setIntervalStop);
  }
}

// function to add event listener on goblin so that every time you click on it, it removes goblin and clears timeout of health, also checks win
function clickDeath(eachGoblin, healthInterval){
  eachGoblin.addEventListener('click', () => {
    eachGoblin.remove();
    clearTimeout(healthInterval);
    let goblinsLeft = document.querySelectorAll('.green-goblins');
    checkWin(goblinTotal, goblinsLeft.length);
    //if I add slayGoblin function add function inside setTimeout with the above 4 lines
    // setTimeout(() => {
    // }, 100);
  });
}

// goblins.addEventListener('click', () => {
//   slayGoblin(goblins);
// });

//changes gobl div to slayed goblin
// function slayGoblin(gobl){
//     gobl.classList.add('slayed');
// }

//subtracts 1 from health, removes gob from div, and checks if player lost
function subtractHealthGobToWall(specificGob){
  castleHealth -= 1;
  let healthBar = document.querySelector('.health');
  healthBar.innerHTML = `Health: ${castleHealth}`;
  specificGob.remove();

  let goblinLeftover = document.querySelectorAll('.green-goblins');
  checkWin(goblinTotal, goblinLeftover.length);
}

//moves goblin to the point where the wall is
function moveGoblin(eachGoblinElement){
  eachGoblinElement.style.top = howFarDownGobWalk;
}

//checks if player has won or lost
function checkWin(limiter, goblinLeft){
  if(castleHealth === 0){
    createResultBox('lose');
    createReplayButton('lose');
    document.querySelector('header').firstElementChild.remove();

    //removes all setInterval and setTimeout created, taken from stackOverflow, need this for lose case because some goblins that are created still have setTimeout methods
    let highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
      clearTimeout(i);
    };

    //removes all goblins that are left
    let goblinsLeftover = document.querySelectorAll('.green-goblins');
    goblinsLeftover.forEach((goblinEach) => {
      goblinEach.remove()});
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

//creates win or lose description after winning or losing
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

//creates replay button for win or lose case, and add eventListener to those buttons to restart the game
function createReplayButton(winOrLose){
  let tryAgain = document.createElement('button');
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
    startGame(ev);
  });
}
