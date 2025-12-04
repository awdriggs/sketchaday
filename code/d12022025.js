let bulbs = [];
let anchors = [];

let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let grabbed;

let preview = false;

function setup() {
  createCanvas(800, 800);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.0001)));

  //one anchor only
  anchors.push(new Particle(width/2, height/2, 20));
  physics.addParticle(anchors[0]);
  anchors[0].lock()


  let numBulbs = 360;

  let radius = width/2;
  let angleStep = TWO_PI/numBulbs;
  //create the ends

  for(let i = 0; i < numBulbs; i++){
    //from center, distance
    let angle = angleStep * i;
    let x = cos(angle);
    let y = sin(angle);

    let bx = x * radius + width/2;
    let by = y * radius + height/2;

    bulbs.push(new Particle(bx, by, 20));
    physics.addParticle(bulbs[i]);

    // let ax = x * (radius + 100) + width/2;
    // let ay = y * (radius + 100) + height/2;

    // anchors.push(new Particle(ax, ay, 20));
  }

  // let spacing = 100;

  // for(let i = 0; i < bulbs.length; i++){
  //   let b = bulbs[i];
  //   physics.addParticle(b);

  //   b.lock()

  //   let a = anchors[0];

  //   let spring = new verletspring2d(
  //     b,
  //     a,
  //     radius,
  //     0.1
  //   );

  //   physics.addspring(spring);

  // }


  let length = 2 * PI * radius / bulbs.length;

  for(let i = 0; i < bulbs.length; i++){

    let spring = new VerletSpring2D(
      bulbs[i],
      bulbs[(i + 1) % bulbs.length],  // wraps around to connect last to first
      // dist(corners[i].x, corners[i].y, corners[(i + 1) % corners.length].x, corners[(i + 1) % corners.length].y),
      length/2,
      0.1
    );
    physics.addSpring(spring);
  }

  noStroke();

}

function draw() {
  background(255);
  physics.update();

  text("fail", 20, 20);

  fill(0, 0, 255, 100);

  beginShape();
  for(let b of bulbs){
    vertex(b.x, b.y);
  }
  endShape(CLOSE);

  if(preview){
    let a = anchors[0]
    ellipse(a.x, a.y, 20, 20);
    for(let i = 0; i < bulbs.length; i++){
      let b = bulbs[i]
      // let a = anchors[i]
      // ellipse(a.x, a.y, 20, 20);
      ellipse(b.x, b.y, 10, 10);
    }


    // line(anchor.x, anchor.y, bulbs[0].x, bulbs[0].y);
  }

  if(grabbed){
    // debugger;
    grabbed.handleDrag(mouseX, mouseY)
  }

  if(frameCount == 1){
    // saveGif('thumb', 8);
  }


}

function mousePressed() {
  for(let anchor of anchors){
    if(anchor.mouseIn(mouseX, mouseY)){
      grabbed = anchor;
    }
  }
}

function mouseReleased(){
  if(grabbed){
    grabbed.dragging = false;
    grabbed = null;
  }
}




// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if (key == "s"){
    preview = !preview;
  } else if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


// How cute is this simple Particle class?!
class Particle extends VerletParticle2D {
  constructor(x, y, r) {
    super(x, y);
    this.r = r;
    this.dragging = false;
  }

  show() {
    fill(127);
    stroke(0);
    strokeWeight(1);
    circle(this.x, this.y, this.r * 2);
  }

  mouseIn(mx, my) {
    let d = dist(mx, my, this.x, this.y);

    if(d < this.r){
      this.dragging = true;
      this.x = mx;
      this.y = my;
      return true;
    } else {
      return false;
    }
  }

  handleDrag(mx, my){
    if(this.dragging){
      this.x = mx;
      this.y = my;
    }
  }
}


