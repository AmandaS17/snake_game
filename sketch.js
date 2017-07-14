var cnv;
var sillySnake;
var food;
var blockSize = 15;
var speed = 1;
var oppKey = 0;
var lose = false;
var backColorR = 100, backColorG = 140, backColorB = 255, backChangeR = -10, backChangeG = 10;
var highScore = 0;

/*function centerCanvas() {
  var x = ((windowWidth - width) / 2) ;
  var y = (windowHeight - height) / 2 + 100;
  cnv.position(x, y);
}*/

function setup(){
  cnv = createCanvas(450, 450);
  //centerCanvas();
  frameRate(10);

  sillySnake = new Snake();
  food = new Food();
  food.pickLocation();
}

/*function windowResized() {
  centerCanvas();
}*/


function keyPressed() {
  if(keyCode != oppKey && !lose){
    if(keyCode == 40){
      oppKey = 38;
      sillySnake.movement(0,speed);
    }
    else if(keyCode == 37){
      oppKey = 39;
      sillySnake.movement(-speed,0);
    }
    else if(keyCode == 38){
      oppKey = 40;
      sillySnake.movement(0,-speed);
    }
    else if(keyCode == 39){
      oppKey = 37;
      sillySnake.movement(speed,0);
    }
  }
  else if((keyCode == RETURN) && lose){
    sillySnake.newGame();
  }
}

function draw() {
  background(color(backColorR, backColorG, backColorB), 50);
  sillySnake.update();
  sillySnake.show();
  sillySnake.eatFood(food);
  food.show();
  sillySnake.death();

}
