let waves = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numWaves = 100;
  let rowHeight = height/numWaves
  for(let i = 0; i < numWaves; i++){
    waves.push(new straightWave(i * rowHeight + rowHeight/2, width, height))
  }

  strokeWeight(10);
}

function draw() {
  background(255);

  for(let w of waves){
    w.draw()
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

class straightWave {
  constructor(cy, w, h){
    this.angle = random(0, TWO_PI);
    this.h = h;
    this.w = w;
    //this is a mistake, but you are keeping it for today! later change the height cy - this.h/2 and cy + this.h/2
    this.p1 = createVector(sin(this.angle) * this.w/2 + this.w/2, cy);
    this.p2 = createVector(cos(this.angle) * this.w/2 + this.w/2, cy);
    this.speed = random(0.01 , 0.04)
  }

  draw(){
    this.angle += this.speed;
    this.p1.x = sin(this.angle) * this.w/2 + this.w/2;
    this.p2.x = cos(this.angle) * this.w/2 + this.w/2;
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    if(random() < 0.0001){
      console.log('changing speed');
      this.speed = random(0.01 , 0.04)
    }
  }
}

