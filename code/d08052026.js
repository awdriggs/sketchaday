let numCols = 10; //num divisions of the canvas
let spacing, rectWidth, rectHeight, nValue = 0, maxAngle;
let columns = [];
let speed = 4;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  spacing = width/numCols;
  rectWidth = spacing/10;
  rectHeight = height - height/4;
  rectMode(CENTER);
  maxAngle = asin(spacing / rectHeight);

  //build columns
  for(let i = 0; i < numCols + 1; i++){
    let x = i * spacing + spacing/2;

    columns.push(new Column(x, height/2, rectWidth, rectHeight, 0, i + 1));
  }


}

function draw() {
  background(255);

  for(let c of columns){
    c.move();
    c.draw();
  }

  nValue += 0.01;
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

class Column {
  constructor(sx, sy, w, h, a, ni){
    this.x = sx;
    this.y = sy;
    this.w = w;
    this.h = h;
    this.angle = a;
    this.noiseIndex = ni;
  }

  draw(){
    push();
    translate(this.x, this.y);
    // rotate(angle + i/100);
    this.angle = map(noise(nValue, this.noiseIndex/10), 0, 1, -maxAngle, maxAngle);
    rotate(this.angle);

    fill(0);
    rect(0, 0, this.w, this.h);
    // fill("red");
    // ellipse(0, 0, 20, 20);
    pop();
  }

  move(){
    this.x -= speed;

    if(this.x <= -spacing/2){
      this.x = width + spacing/2
      this.noiseIndex += columns.length
    }
  }
}

