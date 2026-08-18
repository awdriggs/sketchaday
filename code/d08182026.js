let shadowRects = [];

function setup() {
  createCanvas(800, 800);

  reset();
}

function draw() {
  background(255);

  for(let s of shadowRects){
    s.draw();
  }

  if(frameCount % 60 == 0){
    reset();
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

function mousePressed(){
  reset();
}

function reset(){
  shadowRects = [];
  let numRects = floor(random(6, 13));
  let margin = width * 0.1;
  let gap = width * 0.02;
  let dir = floor(random(0, 4));

  let maxSize = (width - 2 * margin) / sqrt(numRects);
  let rects = [];
  for(let i = 0; i < numRects; i++){
    let offset = random(maxSize * 0.1, maxSize * 0.25);
    let w = random(maxSize * 0.3, maxSize * 0.7);
    let h = random(maxSize * 0.3, maxSize * 0.7);
    rects.push({ w, h, offset });
  }

  rects.sort((a, b) => (b.h + b.offset) - (a.h + a.offset));

  let dx = (dir == 0 || dir == 1) ? -1 : 1;
  let dy = (dir == 0 || dir == 2) ? -1 : 1;
  let cx = margin, cy = margin, shelfH = 0;

  // first pass: collect placements
  let placements = [];
  for(let r of rects) {
    let totalW = r.w + r.offset + gap;
    let totalH = r.h + r.offset + gap;

    if(cx + totalW > width - margin) {
      cx = margin;
      cy += shelfH + gap;
      shelfH = 0;
    }

    if(cy + totalH > height - margin) break;

    let fx = cx + (dx < 0 ? r.offset : 0);
    let fy = cy + (dy < 0 ? r.offset : 0);

    placements.push({ fx, fy, w: r.w, h: r.h, offset: r.offset });
    cx += totalW + gap;
    shelfH = max(shelfH, totalH);
  }

  // find actual used extent relative to margin
  let maxX = 0, maxY = 0;
  for(let p of placements) {
    maxX = max(maxX, p.fx + p.w + (dx > 0 ? p.offset : 0) - margin);
    maxY = max(maxY, p.fy + p.h + (dy > 0 ? p.offset : 0) - margin);
  }

  // scale to fill canvas
  let scale = min((width - 2 * margin) / maxX, (height - 2 * margin) / maxY);

  // second pass: construct with scaled values
  for(let p of placements) {
    let sx = (p.fx - margin) * scale + margin;
    let sy = (p.fy - margin) * scale + margin;
    shadowRects.push(new Shadowed(sx, sy, p.w * scale, p.h * scale, p.offset * scale, dir));
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

