let shades = [];
let moireStep = 5;

function setup() {
  createCanvas(800, 800);
  maxSquareSize = width / sqrt(2) * 0.95; //≈ boundingBox * 0.7071
  // createCanvas(windowWidth, windowHeight);
  let numShades = 4;
  let verticalSpacing = height/numShades;
  let horiziontalSpacing = width/numShades;
  for(let j = 0; j < numShades + 1; j++){
    for(let i = 0; i < numShades + 1; i++){
      let w = random(maxSquareSize/4, maxSquareSize);
      let h = random(maxSquareSize/4, maxSquareSize);
      // let w = width;
      // let h = height;
      let startAngle = random(0, TWO_PI);
      // shades.push(new RotatedBlock(random(width * 0.25, width * 0.75), random(height * 0.25, height * 0.75), w, h, startAngle, random(QUARTER_PI/4, QUARTER_PI)));
      shades.push(new RotatedBlock(j * horiziontalSpacing, i * verticalSpacing, w, h, startAngle, random(QUARTER_PI/4, QUARTER_PI)));
      // shades.push(new RotatedBlock(width/2, height/2, w, h, random(0, TWO_PI), random(QUARTER_PI/4, QUARTER_PI)));
    }
  }
  rectMode(CENTER)
}

function draw() {
  background(255);

  //draw base moire
  stroke(0);
  strokeWeight(2);

  // for(let i = 0; i < height; i += moireStep){
  //   line(0, i, width, i);
  // }

  for(let s of shades){
    s.draw();
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

class RotatedBlock {
  constructor(cx, cy, w, h, angle, sweep){
    this.cx = cx;
    this.cy = cy;
    this.w = w;
    this.h = h;
    this.angle = angle;
    this.fill = color(4, 55, 242)
    this.sweepRight = angle + sweep;
    this.sweepLeft = angle - sweep;
    this.dir = random() > 0.5 ? -1 : 1;
    this.speed = random(0.0005, 0.001);
    // this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.color = 0;
    this.displacementSpeed = random(0.05, 0.15);
    this.displacementDir = random() > 0.5 ? -1 : 1;

    this.type = floor(random(5)); //0 is horiziontal bands, 1 is vertical
    // this.type = 4;

  }

  draw(){
    this.updateAngle();
    this.updateCenter();
    stroke(this.color);
    strokeWeight(2);

    if(this.type == 0){
      this.drawHoriziontal();
    } else if(this.type == 1){
      this.drawVertical();
    } else if(this.type == 2){
      this.drawCirc();
    } else if(this.type == 3){
      this.drawTri();
    } else if(this.type == 4){
      this.drawOval();
    }

  }

  drawHoriziontal(){
    push();
    translate(this.cx,this.cy);
    rotate(this.angle);
    fill(this.fill);

    //rect(0, 0, this.w, this.h);
    for(let i = 0; i < this.h; i+=moireStep){
      line(-this.w/2, -this.h/2 + i, this.w/2, -this.h/2 + i);
    }

    pop();
  }

  drawVertical(){
    push();
    translate(this.cx,this.cy);
    rotate(this.angle);
    fill(this.fill);

    //rect(0, 0, this.w, this.h);
    for(let i = 0; i < this.w; i+=moireStep){
      line(-this.w/2 + i, -this.h/2, -this.w/2 + i, this.h/2);
    }

    pop();
  }

  drawCirc(){
    push();
    translate(this.cx, this.cy);
    rotate(this.angle);

    let radius = min(this.w, this.h) / 2;

    // Draw horizontal lines that form a circle
    for(let y = -radius; y <= radius; y += moireStep){
      // Using circle formula: x² + y² = r²
      // Width at height y is: 2 * sqrt(r² - y²)
      const distanceFromCenter = abs(y);

      if(distanceFromCenter <= radius) {
        const halfWidth = sqrt(radius * radius - distanceFromCenter * distanceFromCenter);
        line(-halfWidth, y, halfWidth, y);
      }
    }

    pop();
  }

  drawOval(){
    push();
    translate(this.cx, this.cy);
    rotate(this.angle);

    let radiusX = this.w / 2;  // horizontal semi-axis
    let radiusY = this.h / 2;  // vertical semi-axis

    // Draw horizontal lines that form an ellipse
    for(let y = -radiusY; y <= radiusY; y += moireStep){
      // Using ellipse formula: (x/a)² + (y/b)² = 1
      // Rearranged to: x = a * sqrt(1 - (y/b)²)
      const distanceFromCenter = abs(y);

      if(distanceFromCenter <= radiusY) {
        const halfWidth = radiusX * sqrt(1 - (distanceFromCenter * distanceFromCenter) / (radiusY * radiusY));
        line(-halfWidth, y, halfWidth, y);
      }
    }

    pop();
  }

  drawTri(){
    push();
    translate(this.cx, this.cy);
    rotate(this.angle);

    // Draw horizontal lines forming a triangle
    for(let y = -this.h/2; y <= this.h/2; y += moireStep){
      // Calculate width at this height
      // progress goes from 0 (top) to 1 (bottom)
      let progress = (y + this.h/2) / this.h;
      let lineWidth = this.w * progress;
      line(-lineWidth/2, y, lineWidth/2, y);
    }

    pop();
  }

  updateAngle(){
    this.angle += this.speed * this.dir;

    if(this.angle < this.sweepLeft){
      this.speed = random(0.0005, 0.001);
      this.angle = this.sweepLeft
      this.dir *= -1;
    } else if(this.angle > this.sweepRight){
      this.speed = random(0.0005, 0.001);
      this.angle = this.sweepRight;
      this.dir *= -1;
    }
  }

  updateCenter(){ //vertical osicilation
    this.cy+= this.displacementSpeed * this.displacementDir;

    if(this.cy < 0){
      this.displacementSpeed = random(0.05, 0.15);
      this.cy = 0;
      this.displacementDir  *= -1;
    } else if(this.cy > height){
      this.displacementSpeed = random(0.05, 0.15);
      this.cy = height;
      this.displacementDir  *= -1;
    }
  }
}

