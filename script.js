const desc = document.querySelector('.description');
const button = document.querySelector('#first-button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
const main = document.querySelector('main');
let numberGoblins = 0;
let castleHealthBeginning = 10; //how much health to start off with
let castleHealth = castleHealthBeginning;
let goblinTotal = 20; //how many goblins created in easy
let secondsToWall = 3000; //how long it takes goblin to reach wall, must change css transition of green-goblin to match
let timeGoblinSpawnEasy = 500; //how long for goblin spawn in easy mode
let timeGoblinSpawnUnlimited = 300; //how long goblin spawn in unlimited
let howFarDownGobWalk = '700px'; //how far goblin walks down to the wall, may need to change based on screen size
let scoreCounter = 0; //how many goblins killed or clicked on
let whatGame = 0; //switch that indicates whether game is in unlimited (0) or at easy game(1)

//Intro with eventListener on first name submit button
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  createSecondPage();
  createUnlimitedButton();
  createEasyGameButton();
});

// Creates second page with instructions and removes input and first button after submitting the name
function createSecondPage(){
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. There is a horde of goblins coming to destroy the wall. Kill the goblins by clicking on them with your pointer before they reach the wall. Good luck.`
  input.remove();
  button.remove();
};

//Creates unlimited game button to play the game after submitting name
function createUnlimitedButton(){
  const buttonUnlimited = document.createElement('button');
  buttonUnlimited.setAttribute('class', 'unlimited-button');
  buttonUnlimited.innerHTML = 'Unlimited Mode';
  main.appendChild(buttonUnlimited);
  buttonUnlimited.addEventListener('click', (ev) => {
    let mainNodes = document.querySelector('main').childNodes;
    mainNodes.forEach((x) => {x.remove()});
    mainNodes[0].remove();
    startUnlimitedMode(ev);
  });
};

//creates easy game button
function createEasyGameButton(){
  const buttonEasy = document.createElement('button');
  buttonEasy.setAttribute('class', 'easy-button');
  buttonEasy.innerHTML = 'Easy Mode';
  main.appendChild(buttonEasy);
  buttonEasy.addEventListener('click', (ev) => {
    let mainNodes = document.querySelector('main').childNodes;
    mainNodes.forEach((x) => {x.remove()});
    mainNodes[0].remove();
    startEasyGame(ev);
  });
};

//resets castleHealth to beginning and scoreCounter to 0, also displays health
function reset(){
  headerOne.remove();
  headerTwo.remove();
  castleHealth = castleHealthBeginning;
  addHealthScore();
  scoreCounter = 0;
};

//creates goblin div and attaches intervals to animate and move them. also an interval that subtracts health by 1 after goblin reaches wall and add event listener to the goblin
function createGoblinAddIntAndEventList(){
  createGoblin();
  let lengthOfGoblinList = document.querySelectorAll('.green-goblins').length;
  let lastGoblin = document.querySelectorAll('.green-goblins')[lengthOfGoblinList - 1];

  setInterval(() => {lastGoblin.classList.toggle('walk')}, 100); //toggles the class of the lastGoblin that was just created to walk

  setTimeout(() => {moveGoblin(lastGoblin)}, 50); //sets lastgoblin position after 50 milisecond

  let intervalToSubtractHealthGobToWall = setTimeout(() => {subtractHealthGobToWall(lastGoblin)}, secondsToWall); //removes health by 1 and removes goblin after however long it takes to reach wall

  clickDeath(lastGoblin, intervalToSubtractHealthGobToWall); //attaches event listener on each goblin created so that when you click it removes
};

//starts the game on easy mode
function startEasyGame(eve){
  eve.preventDefault();
  reset();
  numberGoblins = 0; //resets numberGoblins
  whatGame = 1;

  let goblinAppear = setInterval(() => {
    createGoblinAddIntAndEventList();
    numberGoblins += 1;
    checkHowMany(goblinTotal, goblinAppear); //limits number of goblins
  }, timeGoblinSpawnEasy);
};

//starts the game on unlimited mode
function startUnlimitedMode(eve){
  eve.preventDefault();
  reset();
  showScore();
  whatGame = 0;

  let goblinAppear = setInterval(() => {
    createGoblinAddIntAndEventList();
  }, timeGoblinSpawnUnlimited);
};

//positions goblin at random position on the top of page
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * (window.innerWidth - 50) + 'px';
};

//creates goblin div
function createGoblin(){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    randomPos(goblins);
    document.body.appendChild(goblins);
};

//checks how many number of goblins were created and stops running setInterval when it reaches limit of goblins that you want to create
function checkHowMany(limit, setIntervalStop){
  if(numberGoblins === limit){
    window.clearInterval(setIntervalStop);
  }
};

// function to add event listener on goblin so that every time you click on it, it removes goblin and clears timeout of health, also checks win
function clickDeath(eachGoblin, healthInterval){
  eachGoblin.addEventListener('click', () => {
    //only add to scoreCounter and show on scoreCount if playing on unlimitedGoblin Mode
    if(whatGame === 0){
      scoreCounter += 1;
      let scoreCount = document.querySelector('.score');
      scoreCount.innerHTML = `Score: ${scoreCounter}`;
    }

    eachGoblin.remove();
    clearTimeout(healthInterval);
    let goblinsLeft = document.querySelectorAll('.green-goblins');
    checkWin(goblinTotal, goblinsLeft.length);
    //if I add slayGoblin function add function inside setTimeout with the above 4 lines
    // setTimeout(() => {
    // }, 100);
  });
};

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
};

//moves goblin to the point where the wall is
function moveGoblin(eachGoblinElement){
  eachGoblinElement.style.top = howFarDownGobWalk;
};

//checks if player has won or lost
function checkWin(limiter, goblinLeft){
  if(castleHealth === 0){
    createResultBox('lose');
    createUnlimitedButton();
    createEasyGameButton();
    document.querySelectorAll('span').forEach((allButtons) => {allButtons.remove()});

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
    createUnlimitedButton();
    createEasyGameButton();
    document.querySelectorAll('span').forEach((allButtons) => {allButtons.remove()});
  }
};

//displays the health score on upper left side
function addHealthScore(){
  let healthScore = document.createElement('span');
  healthScore.classList.add('health');
  healthScore.innerHTML = `Health: ${castleHealth}`;
  header.appendChild(healthScore);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
};

//displays score on the upper right side
function showScore(){
  let score = document.createElement('span');
  score.classList.add('score');
  score.innerHTML = `Score: ${scoreCounter}`;
  header.appendChild(score);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)'
};

//creates win or lose description after winning or losing
function createResultBox(winOrLoseCase){
  let results = document.createElement('div');
  results.classList.add('results');
  switch(winOrLoseCase){
    case 'win':
      results.innerHTML = 'YOU WIN. Play Again?';
      break;
    case 'lose':
      if(whatGame === 0){
        results.innerHTML = `Your Score is ${scoreCounter}`;
      }
      else if(whatGame === 1){
        results.innerHTML = 'YOU LOSE. Try Again?';
      }
      break;
  }
  main.appendChild(results);
};
