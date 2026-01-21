let test;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  test = new DMover(width/2, height/2);
}

function draw() {
  background(255);
  test.draw();

  if(frameCount % 30 == 0){
    test.move();
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
  }
   
  move(){
    console.log("move");
    //choose direction to move!
    let nextMove;
    let moveDist = floor(random(1, 5)) * 50;
    let lastVert = this.verts[this.verts.length - 1];
    // let x = this.verts[this.verts.length - 1].x;
    // let y = this.verts[this.verts.length -1].y;
    let moveX = 0;
    let moveY = 0;

    //choose a move
    if(this.lastMove == "up" || this.lastMove == "down"){
      nextMove = random() > 0.5 ? "left" : "right";
    } else if(this.lastMove == "left" || this.lastMove == "right"){
      nextMove = random() > 0.5 ? "up" : "down";
      moveY = moveDist;
      if(nextMove == "up") moveY *= -1;
    } else { //no last move, means choose any move
      let moves = ["left", "right", "up", "down"]
      nextMove = moves[floor(random(0, moves.length))];
    }

    if(nextMove == "left"){
      moveX = -moveDist;
    } else if(nextMove == "right"){
      moveX = moveDist;
    } else if(nextMove == "up"){
      moveY = -moveDist;
    } else if(nextMove == "down"){
      moveY = moveDist;
    } else {
      console.log("invalid move", nextMove);
    }

    this.verts.push(createVector(lastVert.x + moveX, lastVert.y + moveY));

    console.log("moved", nextMove, moveDist);

    this.lastMove = nextMove; //store for next move
  }


  draw(){
    noFill();
    stroke(0);
    beginShape();

    for(let v of this.verts){
      vertex(v.x, v.y);
    }

    endShape();
  }

}

