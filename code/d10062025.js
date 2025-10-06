let rects = [];
let boundingRect;
let margin;

function setup() {
  createCanvas(800, 800);
  // boundingRect = {x: width/2, y: height/2, w: width - width/10, h: height - height/10}

  let numRects = 20;
  margin = width/10;
  for(let i = 0; i < numRects; i++){
    //ranom
    let x = random(margin, width - margin);
    let y = random(margin, height - margin)
    let w = floor(random(10, 30))
    let h = floor(random(10, 30))
    rects.push(new Rectangle(x, y, w, h, 1));
  }

  rectMode(CENTER);
  noStroke();

}

function draw() {

  background(255);
  //shuffle rects to one doesn't have growing priority.
  for(let r of rects){
    r.update();
  }

  if(frameCount == 1){
    // saveGif('thumb', floor(random(3, 8)));
  }

}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

//helper function
function rectsOverlap(r1, r2) {
  return Math.abs(r1.x - r2.x) < (r1.w + r2.w) / 2 &&
    Math.abs(r1.y - r2.y) < (r1.h + r2.h) / 2;
}

class Rectangle {
  constructor(x, y, w, h, step){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.stepSize = step;
    this.growX = true;
    this.growY = true;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
  }

  grow() {
    console.log("growing");
    //has acces to global rect array
    //if you are still able to grow in the horizontal direction
    //see if  x + w/2 + stepSize is within the bounds of any other rects
    //if yes, set growX to false
    //if no, grow the width by the step size

    //grow the width, see if you are are ok
    //if no, reset height back to previous value
    this.w += this.stepSize;
    for(let r of rects){
      if(r != this){
        let xOverlap = rectsOverlap(this, r);
        if(xOverlap == true){
          // this.w -= this.stepSize;
          this.growX = false;
          break;
        }
      }
    }

    this.h += this.stepSize;
    for(let r of rects){
      if(r != this){
        let yOverlap = rectsOverlap(this, r);
        if(yOverlap == true){
          this.h -= this.stepSize;
          this.growY = false;
          break;
        }
      }
    }

    //grow the height, see if you are ok,
    //if no, reset hieght back to previous value

    //if you are still able to grow in the vertical direction
    //see if y + h/2 + stepSize is within the boudns of any other rects
    //if yes, set growY to false
    //if no, grow the height by the step size
  }

  draw() {
    //rectmode is center
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  bounds(){
    if(this.x - this.w/2 < margin/2 || this.x + this.w/2 > width - margin/2 || this.y + this.h/2 > height - margin/2 || this.y - this.h/2 < margin/2){
      //ob!
      this.growX = false;
      this.growY = false;
    }
    
  }


  update() {
    if(this.growX || this.growY){
      this.grow();
      this.bounds();
    }

    this.draw();
  }


}
