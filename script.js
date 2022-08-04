import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
const ball = new Ball(document.getElementById("ball"));
const Player = new Paddle(document.getElementById("player-paddle"));
const Computer = new Paddle(document.getElementById("computer-paddle"));
const PlayerScore = document.getElementById("playerscore");
const ComputerScore = document.getElementById("computerscore");
let lasttime;
function Update(time) {
  if (lasttime != null) {
    const delta = time - lasttime;
    ball.update(delta, [Player.rect(), Computer.rect()]);
    Computer.Update(delta, ball.y);
    if (isLoose()) {
      handleLoose();
    }
  }
  lasttime = time;
  window.requestAnimationFrame(Update);
}
function isLoose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
function handleLoose() {
  const rect = ball.rect();
  if (rect.right > window.innerWidth) {
    PlayerScore.textContent = parseInt(PlayerScore.textContent) + 1;
  } else {
    ComputerScore.textContent = parseInt(ComputerScore.textContent) + 1;
  }
  ball.reset();
  Computer.reset();
}
document.addEventListener("mousemove", (e) => {
  Player.position = (e.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(Update);
