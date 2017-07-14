function Snake(){
  var x1 = "x1";
  var y1 = "y1"
  this.x = 0;
  this.y = 0;
  this.xSpeed = speed;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];

  this.movement = function(xDir, yDir){
    this.xSpeed = xDir;
    this.ySpeed = yDir;
  }

  this.eatFood = function(food){
    if(dist(this.x, this.y, food.x, food.y) < 2){
      food.pickLocation();
      this.total++;
      var theScore = document.getElementById("scores");
      theScore.innerHTML = "Score: " + this.total;
    }
  }

  this.newGame = function(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = speed;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    oppKey = 0;
    lose = false;

    backColorR += backChangeR;
    backColorG += backChangeG;

    while(Math.abs(backColorR - 19) < 30 && Math.abs(255 - backColorG) < 30){
      backColorR += backChangeR;
      backColorG += backChangeG;
      if(backColorR >= 255 - backChangeR || backColorR <= 0){
        backChangeR = -backChangeR;
      }
      if(backColorG >= 255 - backChangeG || backColorG <= 0){
        backChangeG = -backChangeG;
      }
    }

    if(backColorR >= 255 - backChangeR || backColorR <= 0){
      backChangeR = -backChangeR;
    }
    if(backColorG >= 255 - backChangeG || backColorG <= 0){
      backChangeG = -backChangeG;
    }
  }

  this.update = function(){

    for(var c = 0; c < this.tail.length - 1; c++){
      this.tail[c] = this.tail[c+1];
    }

    if(this.total > 0){
      this.tail[this.total-1] = createVector(this.x, this.y);
    }

    this.x += this.xSpeed * blockSize;
    this.y += this.ySpeed * blockSize;

    this.x = constrain(this.x, -1, (cnv.width-blockSize+1));
    this.y = constrain(this.y, -1, cnv.height-blockSize+1);

  }

  this.show = function(){
    fill(0, 100, 255);
    noStroke();
    rect(this.x, this.y, blockSize, blockSize);

    for(var c = 0; c < this.tail.length; c++){
      fill(19, 255, 255);
      rect(this.tail[c].x, this.tail[c].y, blockSize, blockSize);
    }

  }

  this.deathScreen = function(){
    lose = true;
    fill('#EAE8EE');
    rect(0, 0, cnv.width, cnv.height);
    textSize(20);
    textAlign(CENTER);
    fill('#5E46FF');
    text("You lose! Press ENTER for a new game.", cnv.width/2 - 100, cnv.height/2 -50, 200, 100)
    if(this.total > highScore){
      highScore = this.total;
      var theScore = document.getElementById("highscore");
      theScore.innerHTML = "Highscore: " + this.total;
    }
  }

  this.death = function(){
    if(this.x > cnv.width - blockSize || this.x < 0){
      this.deathScreen();
    }
    if(this.y > cnv.height - blockSize || this.y < 0){
      this.deathScreen();
    }

    for(var c = 0; c < this.tail.length - 1; c++){
        if(this.tail[c].x == this.x){
          if(this.tail[c].y == this.y){
            this.deathScreen();
          }
        }
    }
  }
}
