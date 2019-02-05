const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
const main = document.querySelector('main');
let numberGoblins = 0;
let castleHealth = 5;
let goblinTotal = 10; //how many goblins created
let goblinSeconds = 5000; //how long it takes goblin to reach wall
let secGob = 500; //how long for goblin to spawn
let howFarDownGobWalk = '700px';

//Creates second page with instructions and removes input and first button after submitting the name
function createSecondPage(evg){
  evg.preventDefault();
  const playName = input.value;
  desc.innerHTML = `Welcome, ${playName}. Your task is to defend the castle from hordes of goblins. Good luck.`
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

//starts the game every time start button is pressed
function startGame(ev){
  ev.preventDefault();
  headerOne.remove();
  headerTwo.remove();

  // let mainStuff = document.querySelector('main');
  // mainStuff.children.remove();

  castleHealth = 5;
  addHealthScore();

  let goblinAppear = setInterval(() => {
  createGoblin(goblinAppear)}, secGob);
}

//positions goblin at random position on the top of page
function randomPos(goblinObjects){
  goblinObjects.style.top = '-20px';
  goblinObjects.style.left = Math.random() * (window.innerWidth - 50) + 'px';
}

//creates goblin with function it wants to stop as parameter
function createGoblin(bc){
    let goblins = document.createElement('div');
    goblins.setAttribute('class', 'green-goblins');
    randomPos(goblins);
    document.body.appendChild(goblins);

    // goblins.addEventListener('click', () => {
    //   slayGoblin(goblins);
    // });

    setInterval(() => {goblins.classList.toggle('walk')}, 100);
    setInterval(() => {moveGoblin(goblins)}, 50);
    let checkGobWall = setTimeout(() => {checkGobToWall(goblins)}, goblinSeconds); //removes health by 1 after 5 seconds
    let removeGoblinAtWall = setTimeout(() => {removeGoblin(goblins)}, goblinSeconds); //removes goblin after 5 seconds
    clickDeath(goblins, checkGobWall, removeGoblinAtWall); //attaches event listener on each goblin created so that when you click it removes

    //limits number of goblins
    numberGoblins += 1;
    checkHowMany(goblinTotal, bc);
}

// function to add event listener on goblin so that every time you click on it, it removes goblin and clears timeout of health
function clickDeath(eachGob, removeHealth, removeGoblinWall){
  eachGob.addEventListener('click', () => {
    setTimeout(() => {
      removeGoblin(eachGob);
      clearTimeout(removeHealth);
      clearTimeout(removeGoblinWall);
    }, 100);
  });
}

//checks to see if gob div reaches the wall and will subtract 1 from health
function checkGobToWall(specificGob){
  if(specificGob.style.top === howFarDownGobWalk){
    deleteHealth();
    let healthBar = document.querySelector('.health');
    healthBar.innerHTML = `Health: ${castleHealth}`;
  }
}

//changes gobl div to slayed goblin
// function slayGoblin(gobl){
//     gobl.classList.add('slayed');
// }

//removes gob div and checks win after removing gob div
function removeGoblin(gob){
  gob.remove();
  let goblinLefter = document.querySelectorAll('.green-goblins');
  checkWin(goblinTotal, goblinLefter.length);
}

//moves goblin to the point where the wall is
function moveGoblin(goblinOb){
  goblinOb.style.top = howFarDownGobWalk;
}

//checks how many number of goblins and stops running function when it reaches limit
function checkHowMany(limit, ab){
  if(numberGoblins === limit){
    window.clearInterval(ab);
  }
}
//checks if player has won
function checkWin(limiter, goblinLeft){
  if(numberGoblins === limiter && goblinLeft === 0 && castleHealth > 0){
    createResultBox('win');
    createReplayButton('win');
    // clearInterval(goblinAppear);
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

//checks whether health is at 0
function checkHealth(){
  if(castleHealth === 0){
    createResultBox('lose');
    createReplayButton('lose');
    // clearInterval(goblinAppear);
  }
}

//heatlh deteriorates when goblin reaches end;
function deleteHealth(){
  castleHealth -= 1;
  checkHealth();
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
      tryAgain.innerHTML = `Try Again`;
      break;
    case 'lose':
      tryAgain.innerHTML = `Play Again`;
      break;
  }
  main.appendChild(tryAgain);
  tryAgain.addEventListener('click', startGame);
}
