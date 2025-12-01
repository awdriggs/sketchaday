let corners = [];
let anchors = [];

let { Vec2D, Rect } = toxi.geom;
let { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;
let { GravityBehavior } = toxi.physics2d.behaviors;

let physics;

let grabbed;

let preview = true;

function setup() {
  createCanvas(800, 800);

  // Creating a toxiclibs Verlet physics world
  physics = new VerletPhysics2D();
  physics.setWorldBounds(new Rect(0, 0, width, height));
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  //square corners and anchors

  let l = width/4;
  let c = width/8;
  
  corners.push(new Particle(l,l, 20));
  corners.push(new Particle(width-l, l, 20));
  corners.push(new Particle(width-l, height-l, 20));
  corners.push(new Particle(width-l, height-l, 20));

  anchors.push(new Particle(c, c, 20));
  anchors.push(new Particle(width-c, c, 20));
  anchors.push(new Particle(width-c, height-c, 20));
  anchors.push(new Particle(c, height-c, 20));


  let spacing = dist(corners[0].x, corners[0].y, anchors[0].x, anchors[0].y);

  for(let i = 0; i < corners.length; i++){
    let c = corners[i];
    let a = anchors[i];
    physics.addParticle(c);
    physics.addParticle(a);

    // if(i > 0){
    //   let spring = new VerletSpring2D(
    //     c,
    //     corners[i-1],
    //     width/2,
    //     0.8
    //   );

    //   physics.addSpring(spring);
    // }

    let spring = new VerletSpring2D(
      c,
      a,
      spacing,
      0.1
    );

    physics.addSpring(spring);

    a.lock()


  }

  for(let i = 0; i < corners.length; i++){
    let spring = new VerletSpring2D(
      corners[i],
      corners[(i + 1) % corners.length],  // wraps around to connect last to first
      // dist(corners[i].x, corners[i].y, corners[(i + 1) % corners.length].x, corners[(i + 1) % corners.length].y),
      100,
      0.1
    );
    physics.addSpring(spring);
  }


}

function draw() {
  background(255);
  physics.update();

  fill(255, 0, 0, 100);
  beginShape();
  for(let c of corners){
    vertex(c.x, c.y);
  }
  endShape(CLOSE);

  if(preview){
    for(let i = 0; i < anchors.length; i++){
      let a = anchors[i]
      let c = corners[i]
      line(a.x, a.y, c.x, c.y);
      ellipse(a.x, a.y, 20, 20);
    }
  }

  if(grabbed){
    // debugger;
    grabbed.handleDrag(mouseX, mouseY)
  }

  if(frameCount < 300){
    text('press "s" to show/hide anchors', 20, 20);
  }


}

function mousePressed() {
  for(let a of anchors){
    if(a.mouseIn(mouseX, mouseY)){
      grabbed = a;
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


