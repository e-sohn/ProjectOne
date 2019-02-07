
## Instructions
Goblins are created from the top of the page and make their way to the bottom of the page to the wall. Players will click on the goblins to kill them.

## Wireframe
Open Folder on top

## Purpose
Wall Defense is a game where the goal is to protect the wall from incoming goblins. Players will click on the goblin to kill them, before they reach the wall. If the goblin reaches the wall, player's health will reduce by one and the goblin will disappear. If player's health reaches 0, the player loses and the game will give the option to replay the game.

## Technologies
Javascript, HTML, and css

## Game Mechanics
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

## Code Snippet
```
goblinTotal = 10;

let goblinAppear = setInterval(() => {
  createGoblin();
  checkHowMany(goblinTotal, goblinAppear);
}, timeGoblinSpawnEasy);

function checkHowMany(limit, setIntervalStop){
  if(numberGoblins === limit){
    window.clearInterval(setIntervalStop);
  }
};
```
I chose this code to show how to create each goblin separately at different times and how to stop creating a goblin. I first create a counter which keeps track of how many goblins I created and a limit which tells me how many goblins I want created in total. Then, I ran a set interval which runs the function createGoblin which creates a new element and adds that element into the main body. After creating the goblin, I add one to the counter and compare that number to the limit I set earlier. If the counter equals the original limit, I clear the interval which created the goblins. In order to create an infinite amount of goblins, I simply removed this check function.

## Roadblocks
When navigating to the next page of my game, I would remove the original elements inside the header and main. At the end of the game, I would then add the elements back inside the header and main. It was difficult to change the position of each element for each page because I had already added them into the page using Javascript.

## Solutions
Next time, the solution is to create the entire header and main and removing them to navigate to the next page.

## Link to page
https://grieving-expert.surge.sh

## Post MVP
1. Create rounds in easy mode and keep track of round # on the bottom right screen.
2. Different types of enemies with different speed and different health.
3. Change cursor of the mouse to a sword.  
4. Animation of enemies attacking the wall.
5. Add objects to the board.
6. Animation when castle health lowers.
