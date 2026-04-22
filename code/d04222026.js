//mistake, but keeping it!
//bouncer that traces lines
let ball;
let vertices = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  ball = new Ball(width/2, height/2);

  while(vertices.length < 20){

    ball.move();
  }

  strokeWeight(5);

}

function draw() {
  background(255);

  // ball.move();
  // ball.draw();

  for(let i = 1; i < vertices.length; i+=1){
    line(vertices[i].x, vertices[i].y, vertices[i-1].x, vertices[i-1].y);
  }

  if(frameCount % 60 == 0){
    vertices = [];
    ball = new Ball(width/2, height/2);

    while(vertices.length < 20){

      ball.move();
    }
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

class Ball{
  constructor(sx, sy){
    this.x = sx;
    this.y = sy;
    this.hSpeed = random() * 5 * (random() > 0.5 ? -1 : 1);
    this.vSpeed = random() * 5 * (random() > 0.5 ? -1 : 1);
    this.hitCount = 0;
  }

  move(){
    this.x += this.hSpeed;
    this.y += this.vSpeed;

    this.checkBounds();
  }

  checkBounds(){
    if(this.x < 0){
      //left hit
      this.x = 0;
      this.hSpeed *= -1;
      vertices.push(createVector(this.x, this.y))
    } else if(this.x > width){
      //right hit
      this.x = width;
      this.hSpeed *= -1;
      vertices.push(createVector(this.x, this.y))
    } else if(this.y < 0){
      this.y = 0;
      this.vSpeed *= -1;
      vertices.push(createVector(this.x, this.y));
    } else if(this.y > height){
      this.y = height;
      this.vSpeed *= -1;
      vertices.push(createVector(this.x, this.y));
    }
  }

  draw() {
    ellipse(this.x, this.y, 10, 10)
  }

}



