const desc = document.querySelector('.description');
const button = document.querySelector('#first-button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
const main = document.querySelector('main');
let numberGoblins = 0;
let castleHealthBeginning = 20; //how much health to start off with
let castleHealth = castleHealthBeginning;
let goblinTotal = 50; //how many goblins created in easy
let milliSecondsToWall = 10000; //how long it takes goblin to reach wall
let secondsToWall = milliSecondsToWall/1000;
let timeGoblinSpawnEasy = 800; //how long for goblin spawn in easy mode
let timeGoblinSpawnUnlimited = 700; //how long goblin spawn in unlimited
let howFarDownGobWalk = '700px'; //how far goblin walks down to the wall, may need to change based on screen size
let scoreCounter = 0; //how many goblins killed or clicked on
let whatGame = 0; //switch that indicates whether game is in unlimited (0) or easy mode(1)

//Intro with eventListener on first name submit button
button.addEventListener('click', (ev) => {
  ev.preventDefault();
  createSecondPage();
  createButton('easy');
  createButton('unlimited');
});

// Creates second page with instructions and removes input and first button after submitting the name
function createSecondPage(){
  const playName = input.value;
  const instructions = document.createElement('div');
  instructions.setAttribute('class', 'instructions');
  instructions.innerHTML = `Welcome, ${playName}. There is a horde of goblins coming to destroy the wall. Kill the goblins by clicking on them with your pointer before they reach the wall. Choose one of two game modes below. Good luck.`
  headerTwo.appendChild(instructions);
  form.remove();
  desc.remove();
};

//create button for each game mode
function createButton(gameMode){
  const gameTypeButton = document.createElement('button');
  gameTypeButton.setAttribute('class', 'game-button');
  switch(gameMode){
    case 'unlimited':
      gameTypeButton.innerHTML = 'Unlimited Mode';
      break;
    case 'easy':
      gameTypeButton.innerHTML = 'Easy Mode';
      break;
  }
  main.appendChild(gameTypeButton);
  addEventToButton(gameTypeButton, gameMode);
};

//attach eventListener to each button on the game modes
function addEventToButton(gameButton, specificMode){
  gameButton.addEventListener('click', (ev) => {
    let mainNodes = document.querySelector('main').childNodes;
    mainNodes.forEach((x) => {x.remove()});
    mainNodes[0].remove();
    switch(specificMode){
      case 'unlimited':
        startUnlimitedMode(ev);
        break;
      case 'easy':
        startEasyGame(ev);
        break;
    };
  });
};

//resets castleHealth to beginning and scoreCounter to 0, also displays health
function reset(){
  headerOne.remove();
  headerTwo.remove();
  castleHealth = castleHealthBeginning;
  showHealthOrScore('health');
  scoreCounter = 0;
};

//creates goblin div and attaches intervals to animate and move them. also an interval that subtracts health by 1 after goblin reaches wall and add event listener to the goblin
function createGoblinAddIntAndEventList(){
  createGoblin();
  let lengthOfGoblinList = document.querySelectorAll('.green-goblins').length;
  let lastGoblin = document.querySelectorAll('.green-goblins')[lengthOfGoblinList - 1];
  setInterval(() => {lastGoblin.classList.toggle('walk')}, 100); //toggles the class of the lastGoblin that was just created to walk
  setTimeout(() => {moveGoblin(lastGoblin)}, 50); //sets lastgoblin position after 50 milisecond
  let intervalToSubtractHealthGobToWall = setTimeout(() => {subtractHealthGobToWall(lastGoblin)}, milliSecondsToWall); //removes health by 1 and removes goblin after however long it takes to reach wall
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
  showHealthOrScore('score');
  whatGame = 0;

  let goblinAppear = setInterval(() => {
    createGoblinAddIntAndEventList();
  }, timeGoblinSpawnUnlimited);
};

//positions goblin at random position on the top of page and also gives duration of movement
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * (window.innerWidth - 50) + 'px';
  goblinObjects.style.transition = `top ${secondsToWall}s`;
  goblinObjects.style.transitionTimingFunction = 'linear';
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
  });
};

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

//action taken after player wins or loses
function afterResults(end){
  switch(end){
    case 'winning':
      createResultBox('win')
      break;
    case 'losing':
      createResultBox('lose')
      break;
  };
  createButton('unlimited');
  createButton('easy');
  document.querySelectorAll('span').forEach((allButtons) => {allButtons.remove()});
};

//checks if player has won or lost
function checkWin(limiter, goblinLeft){
  if(castleHealth === 0){
    afterResults('losing');

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
    afterResults('winning');
  }
};

//displays either health or score
function showHealthOrScore(healthOrScore){
  let displays = document.createElement('span');
  switch(healthOrScore){
    case 'health':
      displays.classList.add('health');
      displays.innerHTML = `Health: ${castleHealth}`;
      break;
    case 'score':
      displays.classList.add('score');
      displays.innerHTML = `Score: ${scoreCounter}`;
      break;
  }
  header.appendChild(displays);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
};

//creates win or lose description after winning or losing
function createResultBox(winOrLoseCase){
  let results = document.createElement('div');
  results.classList.add('results');
  switch(winOrLoseCase){
    case 'win':
      results.innerHTML = 'YOU WIN';
      break;
    case 'lose':
      if(whatGame === 0){
        results.innerHTML = `Your Score is ${scoreCounter}`;
      }
      else if(whatGame === 1){
        results.innerHTML = 'YOU LOSE';
      }
      break;
  }
  main.appendChild(results);
};
