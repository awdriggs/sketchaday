//fucked!

// much help from The Nature of Code, Daniel Shiffman, http://natureofcode.com

// Mover object
let bobs = [];

// Spring object
let springs = [];

let gravity

function setup() {
  createCanvas(800, 800);

  gravity = createVector(0, 2);

  let numBobs = 3;
  //first bob and spring
  bobs.push(new Bob(width / 2, 100))
  let springLoc = createVector(width/2, 10)
  springs.push(new Spring(springLoc, 100, bobs[0])); //spring must contain a blob

  for(let i = 1; i < numBobs; i++){

  // // Create objects at starting position
  // // Note tsecond argument in Spring constructor is "rest length"
  bobs.push(new Bob(width / 2, (i + 1) * 100));

  let springLoc = bobs[i - 1].position;
  springs.push(new Spring(springLoc, 100, bobs[i])); //spring must contain a blob
  }
}

function draw() {
  background(255);

  for(let bob of bobs){

    // Apply a gravity force to the bob
    bob.applyForce(gravity);


    // Update bob
    bob.update();
    // bob.handleDrag(mouseX, mouseY);

    bob.show();
  }


  springs[0].handleDrag(mouseX, mouseY);
  for(let spring of springs){
    // Connect the bob to the spring (this calculates the force)
    spring.connect();

    // Constrain spring distance between min and max
    spring.constrainLength(30, 400);

    // Draw everything
    spring.showLine(); // Draw a line between spring and bob
    spring.show();
  }
}

function mousePressed() {
  for(let bob of bobs){
    bob.handleClick(mouseX, mouseY);
  }

  for(let spring of springs){
    spring.handleClick(mouseX, mouseY);
  }
}

function mouseReleased() {
  for(let bob of bobs){
    bob.stopDragging();
  }
  for(let spring of springs){
    spring.stopDragging();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


// Bob object, just like our regular Mover (location, velocity, acceleration, mass)
class Bob {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 24;
    // Arbitrary damping to simulate friction / drag
    this.damping = 0.98;
    // For user interaction
    this.dragOffset = createVector();
    this.dragging = false;
  }

  // Standard Euler integration
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Newton's law: F = M * A
  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  // Draw the bob
  show() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    if (this.dragging) {
      fill(200);
    }
    // circle(this.position.x, this.position.y, this.mass * 2);
    circle(this.position.x, this.position.y, 10);
  }

  handleClick(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x - mx;
      this.dragOffset.y = this.position.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  }
}


// Remix of  Nature of Codde, Daniel Shiffman, Chapter 3: Oscillation
// Object to describe an anchor point that can connect to "Bob" objects via a spring
// Thank you: http://www.myphysicslab.com/spring2d.html
class Spring {
  constructor(loc, length, bob) {
    this.anchor = loc;
    this.restLength = length;
    this.k = 0.2;
    this.dragOffset = createVector();
    this.dragging = false;
    this.bob = bob
  }
  // Calculate and apply spring force
  connect() {
    // Vector pointing from anchor to bob location
    let force = p5.Vector.sub(this.bob.position, this.anchor);
    // What is distance
    let currentLength = force.mag();
    // Stretch is difference between current distance and rest length
    let stretch = currentLength - this.restLength;

    //{!2 .bold} Direction and magnitude together!
    force.setMag(-1 * this.k * stretch);

    //{!1} Call applyForce() right here!
    this.bob.applyForce(force);
  }

  constrainLength(minlen, maxlen) {
    //{!1} Vector pointing from Bob to Anchor
    let direction = p5.Vector.sub(this.bob.position, this.anchor);
    let length = direction.mag();

    //{!1} Is it too short?
    if (length < minlen) {
      direction.setMag(minlen);
      //{!1} Keep position within constraint.
      this.bob.position = p5.Vector.add(this.anchor, direction);
      this.bob.velocity.mult(0);
      //{!1} Is it too long?
    } else if (length > maxlen) {
      direction.setMag(maxlen);
      //{!1} Keep position within constraint.
      this.bob.position = p5.Vector.add(this.anchor, direction);
      this.bob.velocity.mult(0);
    }
  }

  //{!5} Draw the anchor.
  show() {
    fill(127);
    circle(this.anchor.x, this.anchor.y, 10);
  }

  //{!4} Draw the spring connection between Bob position and anchor.
  showLine() {
    stroke(0);
    line(this.bob.position.x, this.bob.position.y, this.anchor.x, this.anchor.y);
  }

  handleClick(mx, my) {
    let d = dist(mx, my, this.anchor.x, this.anchor.y);
    if (d < 20) {
      this.dragging = true;
      this.dragOffset.x = this.anchor.x - mx;
      this.dragOffset.y = this.anchor.y - my;
    }
  }

  stopDragging() {
    this.dragging = false;
  }

  handleDrag(mx, my) {
    if (this.dragging) {
      this.anchor.x = mx + this.dragOffset.x;
      this.anchor.y = my + this.dragOffset.y;
    }
  }
}

