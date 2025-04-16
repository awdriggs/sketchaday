let cells = []

function setup() {
  createCanvas(800, 800);
  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);

  let numCols = 3;
  let numRows = 3;

  let w = width/numCols;
  let h = width/numRows;

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){

      let x = j * w;
      let y = i * h;

      // let o = "horiziontal";
      let o = random() > 0.5 ? "horiziontal" : "vertical";
      print(o);

      let c = floor(random(1, 10));
      cells.push(new Cell(x, y, w, h, o, c));
    }

  }

  fill(255);
  noStroke();
  // stroke("red")
}

function draw() {
  background(0);
  for(let c of cells){
    c.draw();
    // c.debugLines();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Cell {
  constructor(x, y, width, height, orientation, count){
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.orientation = orientation;
    this.count = count;
    this.offset = random(0.2, 0.8);

    this.stripeHeight = height/count;
    this.stripeWidth = width/count;

    //sometimes, don't draw all the stripes
    if(random() < 0.2){
      this.count = floor(random(1, count))
    }
  }


  draw(){
    for(let i = 0; i < this.count; i++){
      if(this.orientation == "horiziontal"){
        let x = this.x;
        let y = this.y + (i+1) * this.stripeHeight - this.stripeHeight/2;
        // let margin = this.stripeHeight * this.offset;


        // rect(x + this.stripeHeight/4, y - (this.stripeHeight * this.offset)/2, this.width - this.stripeHeight/2, this.stripeHeight * this.offset);
        rect(x + this.stripeHeight/4, y - (this.stripeHeight * this.offset)/2, this.width - this.stripeHeight/2, this.stripeHeight * this.offset);
        line(x, y, this.x + this.width, y);
      } else {
        let x = this.x + (i+1) * this.stripeWidth - this.stripeWidth/2;
        let y = this.y;

        rect(x - (this.stripeWidth * this.offset)/2, y + this.stripeWidth/4, this.stripeWidth * this.offset, this.height - this.stripeWidth/2);
        line(x, y, x, this.y + this.height)
      }
    }
  }
}


