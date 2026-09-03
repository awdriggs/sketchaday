class Mover {
  constructor(sx, sy, bx, by, bw, bh, maxSpeed){
    this.loc = createVector(sx, sy);
    this.boundingBox = {x: bx, y: by, w: bw, h: bh};
    this.angle = createVector(random(TWO_PI), random(TWO_PI));
    this.speed = random(maxSpeed/10, maxSpeed);
    this.stepSize = 0.8;
    this.dia = 10;
  }

  update(){
    this.angle.x += random(-this.stepSize, this.stepSize);
    this.angle.y += random(-this.stepSize, this.stepSize);

    let bb = this.boundingBox;
    let r = this.dia / 2;

    let nx = this.loc.x + sin(this.angle.x) * this.speed;
    let ny = this.loc.y + sin(this.angle.y) * this.speed;

    if(nx - r < bb.x || nx + r > bb.x + bb.w){
      this.angle.x *= -1;
      nx = this.loc.x + sin(this.angle.x) * this.speed;
    }

    if(ny - r < bb.y || ny + r > bb.y + bb.h){
      this.angle.y *= -1;
      ny = this.loc.y + sin(this.angle.y) * this.speed;
    }

    this.loc.x = nx;
    this.loc.y = ny;
  }

  draw(){
    ellipse(this.loc.x, this.loc.y, this.dia, this.dia);
  }
}
