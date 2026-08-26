let shadowRects = [];

function setup() {
  createCanvas(800, 800);
  reset();
}

function reset() {
  shadowRects = [];
  let margin = 10;

  let numCols = 10;
  let numRows = 10;
  let rects = gridPack(width, height, numCols, numRows);
  let cellSize = width/numRows;

  //all share the same dir
  let dir = floor(random(0, 4));
  let dx = (dir == 0 || dir == 1) ? -1 : 1;
  let dy = (dir == 0 || dir == 2) ? -1 : 1;

  for (let r of rects) {
    //all have a different dir
    // let dir = floor(random(0, 4));
    // let dx = (dir == 0 || dir == 1) ? -1 : 1;
    // let dy = (dir == 0 || dir == 2) ? -1 : 1;

    let offset = min(r.w, r.h) * random(0.1, 0.2);
    let fw = r.w - 2 * margin - offset;
    let fh = r.h - 2 * margin - offset;
    let fx = r.x + margin + (dx < 0 ? offset : 0);
    let fy = r.y + margin + (dy < 0 ? offset : 0);

    if(r.w > cellSize && r.h > cellSize){
      if(r.w == r.h){ //square
        shadowRects.push(new ShadowedCirc(fx, fy, fw, fh, offset, dir));
      } else {
        shadowRects.push(new Shadowed(fx, fy, fw, fh, offset, dir));
      }
    }
  }
}

function draw() {
  background(255);
  for (let s of shadowRects) {
    s.draw();
  }

  if (frameCount % 60 == 0) {
    reset();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Shadowed {
  constructor(x, y, w, h, offset, dir){
    this.x = x; //top left corner
    this.y = y;
    this.w = w;
    this.h = h;
    this.offset = offset; //how far to cast the shadow.
    this.dir = this.setDir(dir);
    this.sides = this.calcSides();
  }

  setDir(dice){
    // let dice = floor(random(0, 4));

    if(dice == 0){
      return [-1, -1]; //shift left and up
    } else if(dice == 1){
      return [-1, 1] //shift left and down
    } else if(dice == 2){
      return [1, -1] //shift right and up
    } else {
      return [1, 1] //shift right and down
    }
  }

  calcSides(){
    let a = {x: this.x, y: this.y}
    let b = {x: this.x + this.w, y: this.y}
    let c = {x: this.x + this.w, y: this.y + this.h}
    let d = {x: this.x, y: this.y + this.h}

    //left corner of the shadow
    let shadowX = this.x + this.dir[0] * this.offset;
    let shadowY = this.y + this.dir[1] * this.offset;
    let e = {x: shadowX, y: shadowY}
    let f = {x: shadowX + this.w, y: shadowY}
    let g = {x: shadowX + this.w, y: shadowY + this.h}
    let h = {x: shadowX, y: shadowY + this.h}

    let sides = [];
    sides.push([a, b, c, d]); //front, white shapes
    sides.push([e, f, g, h]); //back, black shape
    sides.push([e, f, b, a]); //top, black shape
    sides.push([e, a, d, h]); //left side, black shape
    sides.push([h, g, c, d]); //bottom side, black shape
    sides.push([f, b, c, g]); //right side, black shape

    return sides;
  }


  draw(){
    for(let i = this.sides.length - 1; i >= 0; i--){
      if(i == 0){
        stroke(255);
        strokeWeight(3);
        fill(255);
      } else {
        stroke(0);
        strokeWeight(1);
        fill(0);
      }

      let face = this.sides[i];
      beginShape();
      for(let v of face){
        vertex(v.x, v.y);
      }
      endShape(CLOSE);
    }
  }
}

class ShadowedCirc {
  constructor(x, y, w, h, offset, dir){
    this.x = x; // center, h will get ignored because these will be circles
    this.y = y;
    this.w = w;
    this.h = h;
    this.offset = offset; //how far to cast the shadow.
    this.dir = this.setDir(dir);
  }

  setDir(dice){
    // let dice = floor(random(0, 4));
    if(dice == 0){
      return [-1, -1]; //shift left and up
    } else if(dice == 1){
      return [-1, 1] //shift left and down
    } else if(dice == 2){
      return [1, -1] //shift right and up
    } else {
      return [1, 1] //shift right and down
    }
  }

  draw(){
    let d = min(this.w, this.h);
    let fcx = this.x + this.w / 2;
    let fcy = this.y + this.h / 2;
    let dx = this.dir[0];
    let dy = this.dir[1];
    let scx = fcx + dx * this.offset;
    let scy = fcy + dy * this.offset;

    let r = d / 2;
    let angle = atan2(dy, dx);

    // capsule: two straight edges + shadow circle back arc, front circle covers the open left side
    fill(0);
    noStroke();
    push();
    translate(fcx, fcy);
    rotate(angle);
    beginShape();
    vertex(0, r);
    vertex(0, -r);
    for (let a = -HALF_PI; a <= HALF_PI; a += 0.05) {
      vertex(this.offset + cos(a) * r, sin(a) * r);
    }
    endShape(CLOSE);
    pop();

    // front circle on top
    fill(255);
    noStroke();
    ellipse(fcx, fcy, d, d);
  }
}
