let waves = [];
let space;
let lineThickness;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numCols = 10;
  let numRows = 10;

  let rowHeight = height/numRows
  let colWidth = width/numCols

  lineThickness = width/80;
  // space =  lineThickness * 1.75;
  space = 0;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      // let angle = PI/100 * i * j
      // let angle = PI/100 * (i * numCols + j); //+ random(0, 0.5)
      let angle = 0;
      waves.push(new straightWave(j * colWidth, i * rowHeight, colWidth, rowHeight, angle, 0.025))
    }
  }

  strokeCap(SQUARE);
  strokeWeight(lineThickness);
}

function draw() {
  background(255);

  for(let w of waves){
    w.draw()
  }


  // fill(200);
  // ellipse(mouseX, mouseY, 10, 10);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 4.18 * 2);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class straightWave {
  constructor(cx, cy, w, h, a, s){
    this.cx = cx;
    this.cy = cy;
    // this.angle = random(0, TWO_PI);
    this.angle = a;
    this.h = h;
    this.w = w;
    print(space);
    //this is a mistake, but you are keeping it for today! later change the height cy - this.h/2 and cy + this.h/2
    this.p1 = createVector(this.cx + cos(this.angle) * (this.w/2 - space) + this.w/2, this.cy + sin(this.angle) * (this.h/2 - space) + this.h/2);
    this.p2 = createVector(this.cx + cos(PI + this.angle) * (this.w/2 - space)  + this.w/2, this.cy + sin(PI + this.angle) * (this.h/2 - space) + this.h/2);
    // this.speed = random(0.01 , 0.04)
    this.speed = s;
  }

  draw(){
    let mouseIn = mouseX > this.cx && mouseX < this.cx + this.w && mouseY > this.cy && mouseY < this.cy + this.h;
    let mouseOut = !mouseIn

    // stroke(0)
    // fill(255)
    // noFill();
    // rect(this.cx, this.cy, this.w, this.h);

    if(random() > 0.9){
      this.speed = random(0.01 , 0.02)
    }

    this.angle += this.speed;

    this.p1.x = this.cx + cos(this.angle) * (this.w/2-space) + this.w/2;
    this.p1.y = this.cy + sin(this.angle) * (this.h/2-space) + this.h/2;
    this.p2.x = this.cx + cos(PI + this.angle) * (this.w/2-space) + this.w/2;
    this.p2.y = this.cy + sin(PI + this.angle) * (this.h/2-space) + this.h/2;

    // this.p2.x = this.cx + cos(this.angle) * (this.w/2-space) + this.w/2;
    // line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
    // fill(0);
    // noStroke();
    // ellipse(this.p1.x, this.p1.y, lineThickness*2, lineThickness*2);
    // ellipse(this.p2.x, this.p2.y, lineThickness*2, lineThickness*2);
    stroke(0);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    // if(random() < 0.0001){
    //   console.log('changing speed');
    //   this.speed = random(0.01 , 0.04)
    // }

    // fill(255, 0, 0);
    // ellipse(this.cx, this.cy, 10, 10);
  }
}

