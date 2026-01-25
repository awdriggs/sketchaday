let mover;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  mover = new DMover(width/2, height/2);
  strokeCap(SQUARE);
}

function draw() {
  background(255);
  mover.draw();

  if(frameCount % 30 == 0){
    mover.move();
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}
 
class DMover {
  constructor(sx, sy){
    this.verts = [createVector(sx, sy)];
    // this.verts.push(createVector(sx, sy)); //init the start location
    this.lastMove = null;
    this.padAmount = width/800 * 50;
    this.leftBounds =  this.padAmount
    this.rightBounds =  width - this.padAmount
    this.topBounds =  this.padAmount
    this.bottomBounds = height - this.padAmount
  }
   
  move(){
    let lastVert = this.verts[this.verts.length - 1];

    // Determine possible moves based on lastMove
    let possibleMoves;
    if(this.lastMove == "up" || this.lastMove == "down"){
      possibleMoves = ["left", "right"];
    } else if(this.lastMove == "left" || this.lastMove == "right"){
      possibleMoves = ["up", "down"];
    } else {
      possibleMoves = ["left", "right", "up", "down"];
    }

    // Filter to directions that have room
    let validMoves = possibleMoves.filter(dir => {
      if(dir == "left") return lastVert.x > this.leftBounds;
      if(dir == "right") return lastVert.x < this.rightBounds;
      if(dir == "up") return lastVert.y > this.topBounds;
      if(dir == "down") return lastVert.y < this.bottomBounds;
    });

    if(validMoves.length == 0) return; // completely stuck

    let nextMove = random(validMoves);

    // Get max distance for chosen direction
    let maxDist;
    if(nextMove == "left") maxDist = lastVert.x - this.leftBounds;
    else if(nextMove == "right") maxDist = this.rightBounds - lastVert.x;
    else if(nextMove == "up") maxDist = lastVert.y - this.topBounds;
    else if(nextMove == "down") maxDist = this.bottomBounds - lastVert.y;

    let moveDist = min(floor(random(1, 5)) * this.padAmount, maxDist);

    // Make direction
    let moveX = 0;
    let moveY = 0;
    if(nextMove == "left"){
      moveX = -moveDist;
    } else if(nextMove == "right"){
      moveX = moveDist;
    } else if(nextMove == "up"){
      moveY = -moveDist;
    } else if(nextMove == "down"){
      moveY = moveDist;
    }

    this.verts.push(createVector(lastVert.x + moveX, lastVert.y + moveY));
    this.lastMove = nextMove;
  }


  draw(){
    noFill();
    stroke(0);

    for(let i = 1; i < this.verts.length; i++){ 
      let v = this.verts[i];
      let lv = this.verts[i-1];

      if(lv.x == v.x){ //vertical line
        strokeWeight(4);
      } else {
        strokeWeight(1);
      }
      line(lv.x, lv.y, v.x, v.y);

    }

  }

}

