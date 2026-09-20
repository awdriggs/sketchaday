let loopers = [];
let targets = [];
let numCols, numRows;

function setup() {
  createCanvas(300, 800);
  // createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(5 * width/800);

  numCols = 2;
  numRows = 2;

  let margin = width/2;

  let boundsW = (width- margin)/numCols;
  let boundsH = (height- margin)/numRows;;

  for(let i = 0; i < numRows; i++){
    let boundsY = i * boundsH + margin/2;

    for(let j = 0; j < numCols; j++){
      let boundsX = j * boundsW + margin/2;
      let x = random(boundsX, boundsX + boundsW);
      let y = random(boundsY, boundsY + boundsH);

      target = new Rotator(x, y, boundsW/2, random(0.01, 0.02));
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

class Rotator {
  // target = new Bouncer(x, y, boundsX, boundsY, boundsW, boundsH, 2);
  constructor(cx, cy, r, speed){
    this.center = createVector(cx, cy);
    this.r = r;
    this.a = random(TWO_PI);
    this.dir = random() > 0.5 ? -1 : 1;
    this.speed = speed;

    let x = this.center.x + cos(this.a) * this.r
    let y = this.center.y + sin(this.a) * this.r


    this.loc = createVector(x, y);
  }

  update(){
    this.a += this.speed * this.dir;
    this.loc.x = this.center.x + cos(this.a) * this.r
    this.loc.y = this.center.y + sin(this.a) * this.r
  }

  draw(){
    ellipse(this.loc.x, this.loc.y, 20, 20);
  }

}

