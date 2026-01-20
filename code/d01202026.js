let rects; 
let stakes;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  build();

  strokeCap(SQUARE);
}

function draw() {
  background(255);
  // for(let r of rects){
  //   rect(r.x, r.y, r.w, r.h);
  // }
  let toggleState = frameCount % 60 == 0;


  for(let s of stakes){
    s.draw(toggleState);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function build(){
  let numStakes = floor(random(4, 8));
  rects = pack(width, height, numStakes, 100, 100); //runs the square packing tool with w, h, numRects, cellSize, cellSize
  stakes = [];
  for(let r of rects){
    stakes.push(new Stack(r.x, r.y, r.w, r.h));
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function mousePressed(){
  build();
}

class Stack {
  constructor(cx, cy, w, h){ //corner x and y now
    this.squares = [];

    console.log("init stack");
    this.build(cx, cy, w, h); //fills the squares array

  }

  build(cornerX, cornerY, totalWidth, totalHeight){
    console.log("building the squares for stack");

    // let numLoops = floor(random(3,10));
    let numLoops = floor((totalWidth * totalHeight) / (width * height) * 30)
    let offset = random(10,30)/(800/width); //for dynamic sizing

    let w = (totalWidth - offset * (numLoops + 1));
    let h = (totalHeight - offset * (numLoops + 1));
     
  // debugger;

    // let totalWidth = w + offset * (numLoops - 1);
    // let totalHeight = h + offset * (numLoops - 1);

    let toggler = random() > 0.5 ? true : false;

    for(let i = 0; i < numLoops; i++){
      this.squares.push(new Rectangle(cornerX + offset * i + offset, cornerY + offset * i + offset, w, h, toggler));
    }
  }

  draw(t){
    for(let s of this.squares){
      if(t){
        s.toggle();
      }
      s.draw();
    }
  }

}

class Rectangle {
  constructor(x, y, w, h, t){
    this.points = [];

    this.points.push(createVector(x, y), createVector(x + w, y), createVector(x + w, y + h), createVector(x, y + h), createVector(x, y));
    this.toggler = t;
  }

  draw(){
    for(let i = 1; i < this.points.length; i++){
      let currentP = this.points[i];
      let prevP = this.points[i-1];

      let stroke1 = this.toggler ? 1 : 4;
      let stroke2 = this.toggler ? 4 : 1;;

      if(i == 1 || i == 4){ //vertical line
        strokeWeight(stroke1);
      } else {
        strokeWeight(stroke2);
      }

      line(currentP.x, currentP.y, prevP.x, prevP.y);
    }
  }

  toggle(){
    this.toggler = !this.toggler; //toggle
  }
}



