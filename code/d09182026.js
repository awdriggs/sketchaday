let loopers = [];
let targets = [];
let numCols, numRows;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(5 * width/800);

  numCols = 6;
  numRows = 1;

  let margin = width/4;

  let boundsW = (width- margin)/numCols;
  let boundsH = (height- margin)/numRows;;

  for(let i = 0; i < numRows; i++){
    let boundsY = i * boundsH + margin/2;

    for(let j = 0; j < numCols; j++){
      let boundsX = j * boundsW + margin/2;
      let x = random(boundsX, boundsX + boundsW);
      let y = random(boundsY, boundsY + boundsH);

      let target = new Bouncer(x, y, boundsX, boundsY, boundsW, boundsH, 2);
      targets.push(target);

      loopers.push(new Looper(random(boundsX, boundsX + boundsW), random(boundsY, boundsY + boundsH), target));
    }
  }
}

function draw() {
  background(255);

  //move target
  for(let t of targets){
    t.update();
    // t.draw();
  }


  for(let l of loopers){
    l.update();
    l.draw();
  }

  // target.draw(); //debug, see the target move around
}

function mousePressed(){
  for(let l of loopers){
    l.history = [];
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

class Looper {

  constructor(x, y, target){
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.t = target; //also a vector
    this.k = 0.0005; //spring stiffness
    this.d = 0.99; //damping
    // this.d = 1;
    this.history = [];
    this.color = color(random(255), random(255), random(255));
  }

  update(){
    //     // spring force toward target
    let force = p5.Vector.sub(this.t.loc, this.pos); //confused by this line.
    force.mult(this.k);

    let jitter = p5.Vector.random2D().mult(0.1); // 0.5 = jitter strength
    this.vel.add(jitter);

    this.vel.add(force);
    this.vel.mult(this.d);
    this.pos.add(this.vel);

    this.history.push(this.pos.copy());
  }

  draw(){
    beginShape();
    stroke(this.color);
    for(let v of this.history){
      curveVertex(v.x, v.y);
    }
    endShape();

    // ellipse(this.pos.x, this.pos.y, 10, 10); //for debug
  }

}

class Bouncer {
  // target = new Bouncer(x, y, boundsX, boundsY, boundsW, boundsH, 2);
  constructor(x, y, bx, by, bw, bh, s){
    this.loc = createVector(x, y);
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
    this.speedX = random(s * 0.5, s * 1.5);
    this.speedY = random(s * 0.5, s * 1.5);
    // this.speedY = 0;
    this.dirX = random() > 0.5 ? 1 : -1;
    this.dirY = random() > 0.5 ? 1 : -1;
  }

  update(){
    //1d x back and forth movement
    this.loc.x += this.speedX * this.dirX;
    this.loc.y += this.speedY * this.dirY;

    if(this.loc.x < this.bx){
      this.loc.x = this.bx;
      this.dirX *= -1;
    } else if(this.loc.x > this.bx + this.bw){
      this.loc.x = this.bx + this.bw;
      this.dirX *= -1;
    }

    if(this.loc.y < this.by){
      this.loc.y = this.by;
      this.dirY *= -1;
    } else if(this.loc.y > this.by + this.bh){
      this.loc.y = this.by + this.bh;
      this.dirY *= -1;
    }

  }

  draw(){
    ellipse(this.loc.x, this.loc.y, 20, 20);
  }

}

