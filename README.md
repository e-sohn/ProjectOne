# Project Overview

## Link to page
https://grieving-expert.surge.sh

## Instructions
Wall Defense is a game where the goal is to protect the wall from incoming goblins. Players will click on the goblin to kill them, before they reach the wall. There are two game modes to choose from: unlimited mode and easy mode. In unlimited mode, the player's objective is to kill as many goblins as they can and the score will keep track of how many goblins killed. In easy mode, there are only a limited amount of goblins which show up on screen. In both game modes, when the goblin reaches the wall, player's health will reduce by one and the goblin will disappear. If the player's health reaches 0, the player loses and the game will give the option to replay the game.

## Wireframe
Open Folder on top

## Technologies
Javascript, HTML, and css

## MVP
1. Initial page where player inputs Name.
2. Next page shows instructions.
3. Actual game starts with goblins hidden on the top of the page.
4. Each goblin will appear one by one and make their way to the bottom of the page.
5. When each goblin reaches the wall, they disappear.
6. Create eventlisteners so that when player clicks on the goblin, the goblin is killed.
7. Create health variable which shows up on the center top of the screen.
8. Health is reduced by one when a goblin reaches the finish line.
9. Add images and animations of the goblins.
10. When player has killed all the goblins before player's health reaches 0, player wins.
11. Create two game modes, one with only limited goblins appearing and another with unlimited goblins.
12. In the unlimited goblins mode, create a counter that keeps track of how many goblins were clicked on. Then display that score when player's health reaches 0 and the game ends.

## Post MVP
1. Create rounds in easy mode and keep track of round # on the bottom right screen.
2. Change cursor of the mouse to a sword.  
3. Have the enemies stop when reaching the wall. Add animation of enemies attacking the wall.
4. Animation when castle health lowers.
5. Different types of enemies with different speed and different health.

## Code Snippet
The code below shows how to create each goblin separately at different times and when to stop creating goblins. I first made a counter (numberGoblins) which keeps track of how many goblins I created and a limit variable (goblinTotal) which tells me how many goblins I want created. Then, I ran a set interval which runs the functions createGoblin and checkHowmany. createGoblin function creates a new goblin element and adds that element into the main body. After creating the goblin, I add one to the counter and compare that number to the limit in the checkHowMany function. When the counter reaches the limit, I then clear the set interval which creates the goblins. In order to create an infinite amount of goblins, I simply removed this check function.

```
let numberGoblins = 0;
let goblinTotal = 10;

let goblinAppear = setInterval(() => {
  createGoblin();
  numberGoblins += 1;
  checkHowMany(goblinTotal, goblinAppear);
}, timeGoblinSpawnEasy);

function checkHowMany(limit, setIntervalStop){
  if(numberGoblins === limit){
    window.clearInterval(setIntervalStop);
  }
};
```

## Issues and Resolution
1. Nested setIntervals or setTimeouts can become disastrous. I found a workaround solution that cleared all setIntervals and setTimeouts but learned that it is best to keep setIntervals to a minimum and only when necessary.

2. Changing elements of HTML using DOM can be tricky when you have multiple pages. More specifically, I ran into an issue where I removed elements inside my header and replaced it with new elements. However, I wanted the new elements to have a different display (flex or grid). Since the new elements were still in the old header, I cannot simply change the css style of header as it would affect both the old and new elements. I was able to fix the issue manually but it was a very tedious process. 
