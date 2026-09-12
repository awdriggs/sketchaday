let loopers = [];
let targets = [];
let numRows, numCols;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(5 * width/800);

  numRows = 4;
  numCols = 4;

  let margin = width/4;

  let boundsW = (width- margin)/numCols;
  let boundsH = (height- margin)/numRows;;
  for(let i = 0; i < numRows; i++){
    let boundsY = i * boundsH + margin/2;

    for(let j = 0; j < numCols; j++){
      let boundsX = j * boundsW + margin/2;
      let x = random(boundsX, boundsX + boundsW);
      let y = random(boundsY, boundsY + boundsH);

      let target = new Mover(x, y, boundsX, boundsY, boundsW, boundsH, 5);
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
    this.k = 0.005; //spring stiffness
    this.d = 0.95; //damping
    // this.d = 1;
    this.history = [];
    this.color = color(random(255), random(255), random(255));
  }

  update(){
    //     // spring force toward target
    let force = p5.Vector.sub(this.t.loc, this.pos); //confused by this line.
    force.mult(this.k);

    let jitter = p5.Vector.random2D().mult(0.5); // 0.5 = jitter strength
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

// agent has:
//     pos = starting position (vector)
//     vel = (0, 0) (vector)
//     target = slowly drifting point (vector)

//     k = 0.05        // spring stiffness — higher = snappier
//     damping = 0.95  // < 1 causes overshoot, closer to 1 = more oscillation

//   each frame:
//     // move the target slowly on a noise path
//     target.x = map(noise(nX, t), 0, 1, minX, maxX)
//     target.y = map(noise(nY, t), 0, 1, minY, maxY)
//     t += 0.005

//     // spring force toward target
//     force = target - pos    // vector subtraction
//     force.mult(k)

//     // apply force and damping
//     vel.add(force)
//     vel.mult(damping)
//     pos.add(vel)

//     // store pos in positions array for drawing

//   Key tuning relationships:
//   - k high + damping low → tight loops, snappy
//   - k low + damping high → lazy drifting, barely overshoots
//   - k low + damping ~0.95 → the sweet spot for loopy scribble — enough overshoot to feel organic, slow enough to look like drawing

//   The target drift speed (t += 0.005) controls how often the loop shape changes. Slower = more consistent loops, faster = constantly morphing.

