let bulbs = [];
let anchor;

let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let grabbed;

let preview = true;

function setup() {
  createCanvas(300, 300);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  anchor = new Particle(width/2, height/10, 20);

  let numBulbs = 10;

  //create the ends
  for(let i = 0; i < numBulbs; i++){
    bulbs.push(new Particle(random(0, width), random(0, height), 20));
  }

  let spacing = width/4;

  for(let i = 0; i < bulbs.length; i++){
    let b = bulbs[i];
    physics.addParticle(b);

    // let spring = new VerletSpring2D(
    //   b,
    //   anchor,
    //   spacing,
    //   0.1
    // );

    // physics.addSpring(spring);

  }

  physics.addParticle(anchor);
  anchor.lock()


  let spring = new VerletSpring2D(
    bulbs[0],
    anchor,
    spacing,
    0.1
  );

  physics.addSpring(spring);


  for(let i = 0; i < bulbs.length; i++){

    let spring = new VerletSpring2D(
      bulbs[i],
      bulbs[(i + 1) % bulbs.length],  // wraps around to connect last to first
      // dist(corners[i].x, corners[i].y, corners[(i + 1) % corners.length].x, corners[(i + 1) % corners.length].y),
      width/numBulbs,
      0.1
    );
    physics.addSpring(spring);
  }


}

function draw() {
  background(255);
  physics.update();

  fill(0, 0, 255, 100);

  beginShape();
  for(let b of bulbs){
    vertex(b.x, b.y);
  }
  endShape(CLOSE);

  if(preview){
    for(let i = 0; i < bulbs.length; i++){
      let b = bulbs[i]
      ellipse(anchor.x, anchor.y, 20, 20);
      ellipse(b.x, b.y, 10, 10);
    }


    line(anchor.x, anchor.y, bulbs[0].x, bulbs[0].y);
  }

  if(grabbed){
    // debugger;
    grabbed.handleDrag(mouseX, mouseY)
  }

  // if(frameCount < 300){
  //   text('press "s" to show/hide anchors', 20, 20);
  // }


}

function mousePressed() {
  if(anchor.mouseIn(mouseX, mouseY)){
    grabbed = anchor;
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


