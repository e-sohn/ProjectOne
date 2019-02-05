const desc = document.querySelector('.description');
const button = document.querySelector('button');
const input = document.querySelector('input');
const form = document.querySelector('form');
const headerOne = document.querySelector('.header-one');
const headerTwo = document.querySelector('.header-two');
const header = document.querySelector('header');
let numberGoblins = 0;
let castleHealth = 3;
let goblinTotal = 5; //how many goblins created
let goblinSeconds = 5000; //how long it takes goblin to reach wall
let secGob = 500;

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

    // goblins.addEventListener('click', () => {
    //   slayGoblin(goblins);
    // });

    setInterval(() => {goblins.classList.toggle('walk')}, 100);
    setInterval(() => {moveGoblin(goblins)}, 50);
    let checkGobWall = setTimeout(() => {checkGobToWall(goblins)}, goblinSeconds); //removes health by 1 after 5 seconds
    setTimeout(() => {removeGoblin(goblins)}, goblinSeconds); //removes goblin after 5 seconds

    clickDeath(goblins, checkGobWall);

    numberGoblins += 1;
    checkHowMany(goblinTotal, bc);
}

// function to add event listener on goblin so that every time you click on it, it removes goblin and clears timeout of health
function clickDeath(eachGob, removeHealth){
  eachGob.addEventListener('click', () => {
    setTimeout(() => {
      removeGoblin(eachGob);
      clearTimeout(removeHealth);
    }, 100);
  });
}

//checks to see if gob div reaches the wall and will subtract 1 from health
function checkGobToWall(specificGob){
  if(specificGob.style.top === '500px'){
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
  goblinOb.style.top = '500px';
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
    alert('player has won');
  }
}

//starts the game every time start button is pressed
function startGame(ev){
  ev.preventDefault();
  headerOne.remove();
  headerTwo.remove();
  addHealthScore();

  let goblinAppear = setInterval(() => {
  createGoblin(goblinAppear)}, secGob);
}

//displays the health score on upper right side
function addHealthScore(){
  let healthScore = document.createElement('div');
  healthScore.classList.add('health');
  healthScore.innerHTML = `Health: ${castleHealth}`;
  header.appendChild(healthScore);
  header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
}

//heatlh deteriorates when goblin reaches end;
function deleteHealth(){
  castleHealth -= 1;
  checkHealth();
}

//checks whether health is at 0
function checkHealth(){
  if(castleHealth === 0){
    alert('You lose');
  }
}
