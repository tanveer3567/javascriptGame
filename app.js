/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score,activePlayer,roundScore,dice,gameStatus;

init();

function init(){
  score = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gameStatus = true;

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-roll").addEventListener("click",function(){
  if(gameStatus){
    dice = Math.floor(Math.random()*6)+1;
    document.querySelector(".dice").src = "dice-"+dice+".png";
    document.querySelector(".dice").style.display = "block";
    roundScore += dice;
    if(dice !== 1){
      document.querySelector("#current-"+activePlayer).textContent = roundScore;
    }else{
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click",function(){
  if(gameStatus){
    document.querySelector(".dice").style.display = "none";
    score[activePlayer] += roundScore;
    document.querySelector("#score-"+activePlayer).textContent = score[activePlayer];
    if(score[activePlayer] >= 100){
      document.querySelector(".player-"+activePlayer+"-panel").classList.add("winner");
      document.querySelector(".player-"+activePlayer+"-panel").classList.remove("active");
      document.querySelector("#name-"+activePlayer).textContent = "Winner";
      document.querySelector("#current-"+activePlayer).textContent = 0;
      gameStatus = false;
    }else{
      nextPlayer();
    }
  }
});

function nextPlayer(){
  if(gameStatus){
    roundScore = 0;
    document.querySelector("#current-"+activePlayer).textContent = roundScore;
    if(activePlayer === 0){
      document.querySelector(".player-0-panel").classList.remove("active");
      document.querySelector(".player-1-panel").classList.add("active");
      activePlayer = 1;
    }else{
      document.querySelector(".player-1-panel").classList.remove("active");
      document.querySelector(".player-0-panel").classList.add("active");
      activePlayer = 0;
    }
  }
}

document.querySelector(".btn-new").addEventListener("click",init);
