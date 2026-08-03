let grid = [];
let numRows, numCols, cellWidth, cellHeight;
let brokenGrid = [];
let colorPairs = [['#035E7B', '#002E2C'], ['#FC7A57', '#FCD757'], ['#9CC4B2', '#8332AC'], ['#018E42', '#FF4B3E'], ['#F7D002', '#454E9E']]; 

function setup() {
  createCanvas(800, 800);

  numRows = floor(30 * width/800);
  numCols = floor(40 * height/800); //square grid
  cellWidth = round(width/numCols);
  cellHeight = round(height/numRows);

  reset(); //builds the square grid and calls arragne

  noFill();
  // strokeWeight(5 * width/800);
}

function draw() {
  background(255);

  //test the grid
  // stroke("red");
  // for(let i = 0; i < grid.length; i++){
  //   for(let j = 0; j < grid[i].length; j++){
  //     let cell = grid[i][j];
  //     rect(cell.x, cell.y, cellSize, cellSize);
  //   }
  // }

  stroke(0);
  for(let c of brokenGrid){
    c.update();
    c.draw();
  }

  // if(frameCount % 60 == 0){
  //   reset();
  // }
}

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

function arrange(){
  for(let i = 0; i < grid.length; i++){
    for(let j = 0; j < grid[i].length; j++){
      let cell = grid[i][j];
      if(!cell.free) continue;

      let canRight = j < numCols - 1 && grid[i][j+1].free;
      let canDown  = i < numRows - 1 && grid[i+1][j].free;

      if(canRight && canDown){
        let dir = random() < 0.5 ? "right" : "down";
        if(dir == "right"){
          // brokenGrid.push({x: cell.x, y: cell.y, w: cellWidth * 2, h: cellHeight});
          brokenGrid.push(new Cell(cell.x, cell.y, cellWidth * 2, cellHeight, "l"));
          cell.free = false; grid[i][j+1].free = false;
        } else {
          // brokenGrid.push({x: cell.x, y: cell.y, w: cellWidth, h: cellHeight * 2});
          brokenGrid.push(new Cell(cell.x, cell.y, cellWidth, cellHeight * 2, "p"));
          cell.free = false; grid[i+1][j].free = false;
        }
      } else if(canRight){
        brokenGrid.push(new Cell(cell.x, cell.y, cellWidth * 2, cellHeight, "l"));
        cell.free = false; grid[i][j+1].free = false;
      } else if(canDown){
        brokenGrid.push(new Cell(cell.x, cell.y, cellWidth, cellHeight * 2, "p"));
        cell.free = false; grid[i+1][j].free = false;
      } else {
        // brokenGrid.push({x: cell.x, y: cell.y, w: cellWidth, h: cellHeight});
        brokenGrid.push(new Cell(cell.x, cell.y, cellWidth, cellHeight, "s"));
        cell.free = false;
      }
    }
  }
}

function reset(){
  grid = [];

  for(let i = 0; i < numRows; i++){
    let row = [];
    let y = cellHeight * i;
    for(let j = 0; j < numCols; j++){
      let x = cellWidth * j
      row.push({x: x, y: y, free: true});
    }
    grid.push(row);
  }

  brokenGrid = [];
  arrange();
}

class Cell {
  constructor(x, y, w, h, o){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.orientation = o;
    // this.c1 = color(random(255), random(255), random(255));
    // this.c2 = color(random(255), random(255), random(255));

    // let rcolor = colorPairs[floor(random(0, colorPairs.length))];
    let rcolor = [0, 255];
    rcolor = shuffle(rcolor);
    this.c1 = rcolor[0];
    this.c2 = rcolor[1];

    this.speed = random(0.02, 0.08);
    this.dir = random() > 0.5 ? 1 : -1;

    //set the moving line point
    if(this.orientation == "l"){ //rect is landscape line is vertical
      this.lineX = random(this.x + this.w * 0.125, this.x + this.w * 0.875);
      this.lineY = this.y;
    } else if(this.orientation == "p"){ //rect is potraitline is horiziontal
      this.lineX = this.x;
      this.lineY = random(this.y + this.h * 0.125, this.y + this.h * 0.875);
    } else { //rect is square

    }
    // debugger;
  }

  updateColor() {
    // let rcolor = colorPairs[floor(random(0, colorPairs.length))];
    // this.c1 = rcolor[0];

    // this.c2 = rcolor[1];

    let temp = this.c2;
    this.c2 = this.c1;
    this.c1 = temp;

  }

  //setColor() {
    // let rcolor = colorPairs[floor(random(0, colorPairs.length))];
    // this.colorIndex++;
    
    // if(this.colorIndex >= this.colors.length){
    //   this.colorIndex = 0; //reset to 0
    // }

    // this.c2 = this.colors[this.colorIndex];
  //}


  draw(){
    noStroke();
    fill(this.c1);
    rect(this.x, this.y, this.w, this.h);

    fill(this.c2);
    if(this.orientation == "l"){ //line is vertical
      // line(this.lineX, this.lineY, this.lineX, this.lineY + this.h);
      rect(this.x, this.y, this.lineX - this.x, this.h);
      // debugger;
    } else if(this.orientation == "p"){ //line is horiziontal
      // line(this.lineX, this.lineY, this.lineX + this.w, this.lineY);
      rect(this.x, this.y, this.w, this.lineY - this.y);
    }
  }

  update(){ //move the line
    if(this.orientation == "l"){ //line is vertical
      this.lineX += this.speed * this.dir;
      if(this.lineX < this.x + this.w * 0.125){
        this.lineX = this.x + this.w * 0.125;
        this.dir *= -1;
        // this.updateColor();
      } else if(this.lineX > this.x + this.w * 0.875){
        this.lineX = this.x + this.w * 0.875;
        this.dir *= -1;
        // this.updateColor();
      }
    } else if(this.orientation == "p"){ //line is horiziontal
      this.lineY += this.speed * this.dir;
      if(this.lineY < this.y + this.h * 0.125) {
        this.lineY = this.y + this.h * 0.125;
        this.dir *= -1;
        // this.updateColor();
      } else if(this.lineY > this.y + this.h * 0.875){
        this.lineY = this.y + this.h * 0.875;
        this.dir *= -1;
        // this.updateColor();
      }
    }
  }
}

