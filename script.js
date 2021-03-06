let canvas, context;
let img
let background
let defeat_logo
let victory_logo
let replay_btn
let x = 0
let y = 0
let score = 1000
let jump_interval = 1000
let hit_snd
let defeat_snd
let miss_snd
let victory_snd
window.onload = init;
function init(){
  canvas = document.getElementById('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  context = canvas.getContext('2d');
  victory_snd = new Audio("victory.wav")
  victory_snd.volume = 0.2;
  hit_snd = new Audio("hit.wav")
  hit_snd.volume = 0.2;
  defeat_snd = new Audio("defeat.mp3")
  defeat_snd.volume = 0.2;
  miss_snd = new Audio("miss.wav")
  miss_snd.volume = 0.2;
  img = document.getElementById("money_bag_img");
  replay_btn = document.getElementById("replay_btn");
  background = document.getElementById("background");
  defeat_logo = document.getElementById("defeat_logo");
  victory_logo = document.getElementById("victory_logo")
  window.requestAnimationFrame(game_loop);
  setInterval(function(){
    jump_interval -= 3;
  }, 1000);
  setTimeout(function(){
    jump()
  }, jump_interval)
}

function jump(){
  if(score > 0 && score < 5000){
    x = getRandomInt(0, canvas.width - img.width);
    y = getRandomInt(0, canvas.height - img.height);
    score -= 25;
    if(score <= 0){
      defeat_snd.play()
    }
     setTimeout(function(){
      jump()
    }, jump_interval)
  }
}

function game_loop(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(background, 0, 0);
  context.drawImage(img, x, y);
  if(score >= 5000){
    context.drawImage(victory_logo, canvas.width / 2 - victory_logo.width / 2, canvas.height / 2 - victory_logo.height / 2);
  }

  if(score <= 0){
    context.drawImage(defeat_logo, canvas.width / 2 - defeat_logo.width / 2, canvas.height / 2 - defeat_logo.height / 2);
  }

  context.font = "80px Arial";

  if(score < 1000){
    context.fillStyle = 'red';
  }
  else{
    context.fillStyle = 'blue';
  }
  context.fillText(`score: ${score} / 5000`, 0, 75);
  if(score <= 0 || score >= 5000){
    context.fillStyle = 'darkgreen';
    context.fillText('coded by Silvia!', 0, canvas.height - 20);
    context.drawImage(replay_btn, canvas.width - replay_btn.width, canvas.height - replay_btn.height);
  }
  window.requestAnimationFrame(game_loop);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //min and max included
}

document.addEventListener("click", function(event){
  if(score > 0 && score < 5000){
    if(event.clientX > x && event.clientY > y  && event.clientX < x + img.width && event.clientY < y + img.height ){
      score += 125;
      hit_snd.play();
      if(score >= 5000){
        victory_snd.play();
      }
    }
    else{
      score -= 100;
      miss_snd.play();
      if(score <= 0){
        defeat_snd.play()
      }
    }
  }
  else{
    if(event.clientX > canvas.width - replay_btn.width && event.clientY > canvas.height - replay_btn.height){
      document.location.reload();
    }
  }
});
