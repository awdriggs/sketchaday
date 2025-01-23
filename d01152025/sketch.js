let squares = [];

function setup() {
  // createCanvas(400, 400);
  createCanvas(800, 800);

  noStroke();
  createGrid();


}

function createGrid(){
  let numRows = 10;
  let numCols = 10;
  let sqSize = width/numCols;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      squares.push(new Square(i * sqSize, j * sqSize, sqSize));
    }
  }
}


function draw() {
  background(255);

  for(let s of squares){
    s.draw();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Square {
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.setup();
  }

  setup(){
    let dice = random();

    if(dice > 0.5){
      this.groundColor = "black";
      this.objectColor = "white";
    } else {
      this.groundColor = "white";
      this.objectColor = "black";
    }

    let decideCase = floor(random(0, 7)); //how many cases?
    print(decideCase);
    switch(decideCase){
      case 0:
        print("case 0");
        this.drawObject = function(){

          ellipse(this.x + this.size/2, this.y + this.size/2, this.size)
        }
        break;

      case 1:
        print("case 1");
        this.drawObject = function(){
          arc(this.x, this.y + this.size/2, this.size, this.size, TWO_PI - HALF_PI, HALF_PI);
        }
        break;

      case 2:
        this.drawObject = function(){
          arc(this.x + this.size, this.y + this.size/2, this.size, this.size, HALF_PI, TWO_PI - HALF_PI);
        }
        break;

      case 3:
        this.drawObject = function(){
          arc(this.x + this.size, this.y + this.size/2, this.size, this.size, HALF_PI, TWO_PI - HALF_PI);
          arc(this.x, this.y + this.size/2, this.size, this.size, TWO_PI - HALF_PI, HALF_PI);
        }
        break;

      case 4:
        this.drawObject = function(){
          arc(this.x + this.size/2, this.y, this.size, this.size, 0, PI);
        }
        break;

      case 5:
        this.drawObject = function(){
          arc(this.x + this.size/2, this.y + this.size, this.size, this.size, PI, TWO_PI);
        }
        break;

      case 6:
        this.drawObject = function(){
          arc(this.x + this.size/2, this.y, this.size, this.size, 0, PI);
          arc(this.x + this.size/2, this.y + this.size, this.size, this.size, PI, TWO_PI);
        }
        break;

    }

    print(this.drawObject.toString());

  }


  draw(){
    fill(this.groundColor);
    rect(this.x, this.y, this.size);

    fill(this.objectColor);
    this.drawObject();
  }
}
