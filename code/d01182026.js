let stakes = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  stakes.push(new Stack(width/2, height/2));

  strokeCap(SQUARE);
}

function draw() {
  background(255);
  let toggleState = frameCount % 60 == 0;


  for(let s of stakes){
    s.draw(toggleState);
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
  stakes = []; 
  stakes.push(new Stack(width/2, height/2));
}

class Stack {
  constructor(cx, cy){
    this.squares = [];
    this.cx = cx;
    this.cy = cy;

    console.log("init stack");
    this.build(); //fills the squares array

  }

  build(){
    console.log("building the squares for stack");
    let w = random(width * 0.1, width * 0.75);
    let h = random(height * 0.1, height * 0.75);
    let numLoops = 5;
    let offset = w/2/numLoops;

    let totalWidth = w + offset * (numLoops - 1);
    let totalHeight = h + offset * (numLoops - 1);

    let cornerX = this.cx - totalWidth/2;
    let cornerY = this.cy - totalHeight/2;

    let toggler = random() > 0.5 ? true : false;

    for(let i = 0; i < numLoops; i++){
      this.squares.push(new Rectangle(cornerX + offset * i, cornerY + offset * i, w, h, toggler));
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



