let n = 0;
let brushes = [];

function setup() {
  createCanvas(800, 800);
  let scale = 1;
  // createCanvas(windowWidth, windowHeight);

  let numBrushes = 4
  let verticalSpace = height/numBrushes;
  //create multiple brushes
  for(let i = 0; i < numBrushes; i++){
    let x = random(50, width - 50)
    print(x);

    let yCenter = i * verticalSpace + verticalSpace/2;
    

    let rotation = random(-QUARTER_PI, QUARTER_PI);

    let xMin = 0;
    let yMin = yCenter - verticalSpace/4;
    let xMax = width;
    let yMax = yCenter + verticalSpace/4;

    let y = random(yMin, yMax);
     

    let noiseOffset = random(1, 100);

    let numPoints = 200 * scale;
    let lineLength = 200 * scale;
    let lineSpacing = lineLength/numPoints;
    
    let randomColor = color(random(0, 255), random(0, 255), random(0, 255));
    brushes.push(new Brush(x, y, rotation, xMin, xMax, yMin, yMax, noiseOffset, lineLength, numPoints, randomColor));

  }

  // brushes[0].color = color(255, 0, 0);
  // brushes[1].color = color(0, 0, 255);

  background(255);
}

function draw() {
  // background(255);
  for(let b of brushes){
    b.update();
    b.draw();
    b.checkBounds();
  }

  n += 0.1; //global noise value
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 5)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Brush {
  constructor(x,y, rotation, xMin, xMax, yMin, yMax, xNoiseOffset, lineLength, numPoints, colour){
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.xMax = xMax;
    this.yMax = yMax;
    this.xMin = xMin;
    this.yMin = yMin;
    this.noiseOffset  = xNoiseOffset;
    this.lineLength = lineLength;
    this.numPoints = numPoints;
    this.lineSpacing = lineLength/numPoints
    this.color = colour
    this.yDir = random() > 0.5 ? 1 : -1;
    console.log(this.yDir)
    this.xDir = random() > 0.5 ? 1 : -1;
    console.log(this.xDir)
    // this.xDir = 1;

    this.linePoints = [];
    this.init()//init the brush, builds the points list

  }

  init(){
    for(let i = 0; i < this.numPoints; i++){
      let xOffset = i * this.lineSpacing;
      xOffset += random(-this.lineSpacing/2, this.lineSpacing/2)

      // let yOffset = random(-height/8, height/8);
      let yOffset = random(-20, 20);
      this.linePoints.push({x: xOffset, y: yOffset});
    }
  }

  draw(){
    push();
    translate(this.x,this.y)
    rotate(this.rotation);
    // ellipse(0, 0, 2, 2);
    stroke(this.color);
    // line(-lineLength/2, 0, lineLength/2, 0);

    let start = this.lineLength/2

    for(let p of this.linePoints){
      ellipse(p.x - start, p.y, 2, 2);
    }

    pop();
  }

  checkBounds(){
    if(this.x > this.xMax){
      this.x = this.xMax;
      this.xDir *= -1;
      // rotation *= -1;
    } else if(this.x < this.xMin){
      this.x = this.xMin;
      this.xDir *= -1;
      // rotation *= -1;
    }
    if(this.y > this.yMax){
      this.y = this.yMax;
      this.yDir *= -1;
      this.rotation *= -1
      // rotation *= -1;
    } else if(this.y < this.yMin){
      this.y = this.yMin;
      this.yDir *= -1;
      this.rotation *= -1
      // rotation *= -1;
    }
  }

  update(){
    this.rotation += map(noise(n, this.noiseOffset), 0, 1, -0.01, 0.01);
    this.rotation = constrain(this.rotation, -QUARTER_PI/2, QUARTER_PI/2)

    this.x += map(noise(this.noiseOffset), 0, 1, -1, 1) * this.xDir;
    this.y += 1 * this.yDir;

    this.noiseOffset += 0.5;
  }
}
