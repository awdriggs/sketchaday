//remix of some Nature of Code stuff by Dan Shiffman. Thanks Dan!
let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let wires = [];
let limb;
let grabbed;

function setup() {
  createCanvas(800, 800);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  let spacing = 10;
  let total = 20;

  wires.push(new Wire(100, 100, spacing, total))
  // wires.push(new Wire(200, 100, spacing, total))

  //connect the last particle of two wires?
  let wire1 = wires[0].particles[wires[0].particles.length-1];
  // let wire2 = wires[1].particles[wires[1].particles.length-1];

  limb = new Limb(wire1.x, wire1.y, 3, 100);

  let spring = new VerletSpring2D(
    wire1,
    limb.particles[0],
    spacing,
    0.8
  );
  physics.addSpring(spring);

}

function draw() {
  //{!1} Must update the physics
  physics.update();

  background(255);

  stroke(0);
  noFill();

  for(let wire of wires){
    wire.draw();
  }

  limb.draw();

  if(grabbed){
    // debugger;
    grabbed.handleDrag(mouseX, mouseY)
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed() {
  for(let wire of wires){
    if(wire.particles[0].mouseIn(mouseX, mouseY)){
      grabbed = wire.particles[0]
    }
  }
}

function mouseReleased(){
  if(grabbed){
    grabbed.dragging = false;
    grabbed = null;
  }
}

class Limb {
  constructor(x, y, total, spacing){
    this.particles = [];

    for (let i = 0; i < total; i++) {
      //{!1} Spacing them out along the x-axis
      let particle = new Particle(x + i * spacing, y, 16);
      //{!1} Add the particle to the physics world.
      physics.addParticle(particle);
      //{!1} Add the particle to the array.
      this.particles.push(particle);
    }

    for (let i = 0; i < total - 1; i++) {
      let spring = new VerletSpring2D(
        this.particles[i],
        this.particles[i + 1],
        spacing,
        0.9
      );
      physics.addSpring(spring);
    }

    this.particles[this.particles.length-1].lock();

  }

  draw(){
    noFill();
    stroke(0);
    beginShape();
    for (let particle of this.particles) {
      //{!1} Each particle is one point in the line.
      vertex(particle.x, particle.y);
    }
    endShape();
    //{!1} This draws the last particle as a circle.
    // particles[0].show();

    //{!4} Move particle according to mouse
    // this.particles[0].show()
  }
}

//wire class
class Wire {
  constructor(x, y, total, spacing){
    this.particles = [];

    //assign the particles
    for (let i = 0; i < total; i++) {
      //{!1} Spacing them out along the x-axis
      let particle = new Particle(x, y + i * spacing, 16);
      //{!1} Add the particle to the physics world.
      physics.addParticle(particle);
      //{!1} Add the particle to the array.
      this.particles.push(particle);
    }

    for (let i = 0; i < total - 1; i++) {
      let spring = new VerletSpring2D(
        this.particles[i],
        this.particles[i + 1],
        spacing,
        0.8
      );
      physics.addSpring(spring);
    }

    this.particles[0].lock();
  }

  draw(){
    noFill();
    stroke(0);
    beginShape();
    for (let particle of this.particles) {
      //{!1} Each particle is one point in the line.
      vertex(particle.x, particle.y);
    }
    endShape();
    //{!1} This draws the last particle as a circle.
    // particles[0].show();

    //{!4} Move particle according to mouse
    this.particles[0].show()
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

