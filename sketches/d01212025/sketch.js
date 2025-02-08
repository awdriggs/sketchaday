let particles = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(800, 800, WEBGL);
  
  // particles.push(new Particle(-400, 0, 0, 10, -1));
  // particles.push(new Particle(400, 0, 0, 10, 1));
  for(let i = 0; i < 100; i++){
    let x = random(-width/2 + 10, width/2 - 10);
    let y = random(-height/2 + 10, height/2 - 10);
    let z = random(-height/2 + 10, height/2 - 10);
    particles.push(new Particle(x, y, z, 10));
  }

}

function draw() {
  background(255);

  orbitControl();
  noFill();
  box(width, height, 800);

  for(let p of particles){
    p.move();
    p.draw();

    p.checkCollision(particles);

  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y, z, s, dir){
    this.loc = createVector(x, y, z);
    // this.vel = createVector(dir, 0, 0); //for testing
    this.vel = createVector(random(1, 4) * (random()>0.5 ? 1 : -1), random(1, 4) * (random()>0.5 ? 1 : -1), random(1, 4) * (random()>0.5 ? 1 : -1)); // Movement velocity
    print(this.vel);
    this.size = s;
  }

  draw(){
    push();
    translate(this.loc.x, this.loc.y, this.loc.z);
    sphere(this.size);
    pop();
  }

  move(){

    this.loc.add(this.vel);
    this.bounce();

    // if(this.x
  }

  bounce(){

    if(this.loc.x > width/2 || this.loc.x < -width/2){
      this.vel.x *= -1;
    }
    if(this.loc.y > height/2 || this.loc.y < -height/2){
      this.vel.y *= -1;
    }

    if(this.loc.z > 400 || this.loc.z < -400){
      this.vel.z *= -1;
    }
  }

  checkCollision(particles){
    for(let p of particles){
      if(p != this){ //can't collide with yourself bro
        let distance = this.loc.dist(p.loc);
        let radiiSum = this.size/2 + p.size/2;

        if(distance < radiiSum){
          print("boom");
          let temp = this.vel.copy();

          this.vel = p.vel;

          p.vel = temp;
        }
         
      }
    }
  }
}
