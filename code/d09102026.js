let loopers = [];
let target;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(5 * width/800);

  //define target
  let boundsW = width/2;
  let boundsH = height/2;
  let boundsX = width/2 - boundsW/2;
  let boundsY = height/2 - boundsH/2;
  let x = random(boundsX, boundsX + boundsW);
  let y = random(boundsY, boundsY + boundsH);
  target = new Mover(x, y, boundsX, boundsY, boundsW, boundsH, 20);

  loopers.push(new Looper(random(boundsX, boundsX + boundsW), random(boundsY, boundsY + boundsH), target.loc));
}

function draw() {
  background(255);

  //move target
  target.update();


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
  }

  update(){
    //     // spring force toward target
    let force = p5.Vector.sub(this.t, this.pos); //confused by this line.
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

