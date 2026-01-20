let squares = [];
let toggler = false;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let w = width/2;
  let h = height/2;
  let numLoops = 10;
  let offset = w/2/numLoops;

  let totalWidth = w + offset * (numLoops - 1);
  let totalHeight = h + offset * (numLoops - 1);

  let cornerX = width/2 - totalWidth/2;
  let cornerY = height/2 - totalHeight/2;

  for(let i = 0; i < numLoops; i++){
    squares.push(new Rectangle(cornerX + offset * i, cornerY + offset * i, w, h));
  }

  strokeCap(SQUARE);
}

function draw() {
  background(255);

  for(let s of squares){
    s.draw();      
  }

  if(frameCount % 60 == 0){
    toggler = !toggler; //toggle  
    print(toggler);
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

class Rectangle {
  constructor(x, y, w, h){
    this.points = [];

    this.points.push(createVector(x, y), createVector(x + w, y), createVector(x + w, y + h), createVector(x, y + h), createVector(x, y));
  }

  draw(){
    for(let i = 1; i < this.points.length; i++){
      let currentP = this.points[i];
      let prevP = this.points[i-1];
      let stroke1 = toggler ? 1 : 4;
      let stroke2 = toggler ? 4 : 1;;
      

      if(i == 1 || i == 4){ //vertical line
        strokeWeight(stroke1);
      } else {
        strokeWeight(stroke2);
      }

      line(currentP.x, currentP.y, prevP.x, prevP.y);
    }
  }
}



