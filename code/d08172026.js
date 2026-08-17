let shadowRects = [];

function setup() {
  createCanvas(800, 800);

  reset();
  // createCanvas(windowWidth, windowHeight);
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
  let numRects = 3;
  let margin = width * 0.1; //
  let dir = floor(random(0, 3));

  for(let i = 0; i < numRects; i++){
    console.log("make");
    let x = random(margin, width - margin);
    let y = random(margin, height - margin);
    let w = random(width * 0.1, width * 0.5);
    let h = random(height * 0.1, height * 0.5);
    let offset = random(width * 0.1, width * 0.3);
    shadowRects.push(new Shadowed(x, y, w, h, offset, dir));
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

