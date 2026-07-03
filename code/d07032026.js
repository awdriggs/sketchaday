let numRows, numCols, gridSize;
let loc, dir
let prevLocs = [];
let visited = [];
let oldLines = [];
let currentColor;

function setup(){
  createCanvas(800, 800);

  numRows = 10;
  numCols = 10;
  gridSize = width/numRows;

  currentColor = color(random(255), random(255), random(255));

  reset();

  // console.log(loc, dir);
  strokeWeight(10 * width/800);
}

function draw(){
  background(255);

  fill(255);
  for(let l of oldLines){
    stroke(l.c);
    for(let i = 1; i < l.verts.length; i++){
      line(l.verts[i].x, l.verts[i].y, l.verts[i-1].x, l.verts[i-1].y);
    }

  }
  // draw grid for debug
  //  for(let i = 0; i < numRows; i++){
  //    for(let j = 0; j < numCols; j++){
  //      rect(j * gridSize, i * gridSize, gridSize, gridSize);
  //      ellipse(j * gridSize + gridSize/2, i * gridSize + gridSize/2, 10, 10);
  //    }
  //  }

  // fill("red");
  // ellipse(loc.x * gridSize + gridSize/2, loc.y * gridSize + gridSize/2, 20, 20);


  //draw the lines connection the history
  stroke(currentColor);
  for(let i = 1; i < prevLocs.length; i++){
    line(prevLocs[i].x, prevLocs[i].y, prevLocs[i-1].x, prevLocs[i-1].y);
  }

  if(frameCount % 10 == 0){
    move();
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
  reset();
}



function reset(){
  if(prevLocs.length > 0){
    oldLines.push({c: currentColor, verts: prevLocs});
    currentColor = color(random(255), random(255), random(255));

  }

  prevLocs = [];

  //keep track if a cell has been filled or not, this resets the fill status to false
  visited = [];
  for (let i = 0; i < numCols; i++) {
    let row = []
    for(let j = 0; j < numRows; j++){
      row.push(false);
    }
    visited.push(row);
  }

  loc = {x: floor(random(0, numCols)), y: floor(random(0, numRows))};
  visited[loc.y][loc.x] = true; //mark this loc as filled
  prevLocs.push({x: loc.x * gridSize + gridSize/2, y: loc.y * gridSize + gridSize/2}); //stash the loc before moving

  let dirs = ["NE", "NW", "SE", "SW"];
  dir = dirs[floor(random(0, dirs.length))];
}

function move(){
  // history.push({x: loc.x * gridSize + gridSize/2, y: loc.y * gridSize + gridSize/2}); //stash the loc before moving

  //set a new x and y position in loc
  let dirs = possibleTurns();
  dirs = shuffle(dirs);
  let possibleDirs = []; //only for dirs that stay in bounds

  //try the first direction
  for(let i = 0; i < dirs.length; i++){
    if(dirs[i] == "NE"){
      let nextX = loc.x + 1;
      let nextY = loc.y - 1;

      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !visited[nextY][nextX]){
        possibleDirs.push("NE");
      }
    } else if(dirs[i] == "NW"){
      let nextX = loc.x - 1;
      let nextY = loc.y - 1;

      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !visited[nextY][nextX]){
        possibleDirs.push("NW");
      }
    } else if(dirs[i] == "SW"){
      let nextX = loc.x - 1;
      let nextY = loc.y + 1;

      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !visited[nextY][nextX]){
        possibleDirs.push("SW");
      }
    } else if(dirs[i] == "SE"){
      let nextX = loc.x + 1;
      let nextY = loc.y + 1;

      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !visited[nextY][nextX]){
        possibleDirs.push("SE");
      }
    }
  }

  if(possibleDirs.length === 0) {
    noLoop();
    setTimeout(() => { reset(); loop(); }, 1000); // pause 1 second
    return;
  }

  let nextMove = possibleDirs[floor(random(0, possibleDirs.length))];

  //update the loc
  if(nextMove == "NE"){
    loc.x += 1;
    loc.y -= 1;
  } else if(nextMove == "NW"){
    loc.x -= 1;
    loc.y -= 1;
  } else if(nextMove == "SW"){
    loc.x -= 1;
    loc.y += 1;
  } else if(nextMove == "SE"){
    loc.x += 1;
    loc.y += 1;
  }

  //store the dir
  dir = nextMove
  visited[loc.y][loc.x] = true;  // mark new cell
  prevLocs.push({x: loc.x * gridSize + gridSize/2, y: loc.y * gridSize + gridSize/2}); //stash the loc before moving
}


//dirs, NE, NW, SE, SW
//if prev dir was NE, new dir can't be SW
//if prev dir was SW, new dir can't be NE
//if prev dir was NW, new dir can't be SE
//if prev dir was SE, new dir can't be NW
function possibleTurns(){
  if(dir == "NE"){
    let newDirs = ["NW", "SE", "NE"]
    return newDirs;
  } else if(dir == "SW"){
    let newDirs = ["SE", "SW", "NW"]
    return newDirs;
  } else if(dir == "SE"){
    let newDirs = ["SW", "NE", "SE"]
    return newDirs;
  } else if(dir == "NW"){
    let newDirs = ["SW", "NE", "NW"]
    return newDirs;
  }
}




class GridWalker {

}


//let movers = [];
//let turns = 10;
//let stepSize;

//function setup() {
//  createCanvas(800, 800);
//  // createCanvas(windowWidth, windowHeight);
//  // let numCols = 10;
//  // let numRows = 10;
//  // let cellWidth = width/numCols;
//  // let cellHeight = height/numRows;
//  stepSize = width/8; //used in the over class
//  let numMovers = 1;

//  for(let i = 0; i < numMovers; i++){
//    let sx = round(random(0, width) / (width/8)) * (width/8);
//    let margin = stepSize;
//    let mover = new Mover(sx, height - stepSize - margin, margin, margin, width - margin * 2, height - margin * 2);
//    movers.push(mover);
//  }

//  // noStroke();

//  for(let m of movers){
//    for(let i = 0; i < turns; i++){
//      m.update();
//    }
//  }


//}

//function draw() {
//  background(255);
//  for(let m of movers){
//    m.draw();
//  }
//}

//// function windowResized() {
////   resizeCanvas(windowWidth, windowHeight);
//// }

////mover
////has an inclination to move in the direction that it is already heading in
////when it get the boundry it turns
////mover knows its bounds

//class Mover {
//  constructor(sx, sy, bx, by, bw, bh){
//    this.loc = createVector(sx, sy);
//    this.boundingBox = {x: bx, y: by, w: bw, h: bh};
//    // this.heading = -HALF_PI;

//    this.dirIndex = 6; // starting heading: index 6 = -HALF_PI (up)
//    this.dirs = Array.from({length: 8}, (_, i) => (TWO_PI / 8) * i); //equivalent --> this.dirs = [0, QUARTER_PI, HALF_PI, HALF_PI + QUARTER_PI, PI, PI + QUARTER_PI, PI + HALF_PI, PI + HALF_PI + QUARTER_PI];

//    // this.speed = random(1, 3);
//    this.speed = stepSize;
//    this.gridSize = this.speed;
//    // this.maxTurn = 0.05; // max radians per frame — lower = straighter
//    this.dia = 10;
//    this.history = []
//  }

//  update(){
//    this.history.push(createVector(this.loc.x, this.loc.y));
//    // debugger;
//    if(this.history.length > turns) {
//      this.history.shift();
//    }

//    // this.heading += random(-this.maxTurn, this.maxTurn);
//    let reverse = (this.dirIndex + 4) % 8;
//    let choices = [];
//    for (let d = -1; d <= 1; d++) {
//      let candidate = (this.dirIndex + d + 8) % 8;
//      if (candidate !== reverse) {
//        choices.push(candidate);
//      }
//    }
//    this.dirIndex = int(random(choices));
//    this.heading = this.dirs[this.dirIndex];

//    let bb = this.boundingBox;
//    let r = this.dia / 2;

//    let nx = this.loc.x + cos(this.heading) * this.speed;
//    let ny = this.loc.y + sin(this.heading) * this.speed;

//    if(nx - r < bb.x || nx + r > bb.x + bb.w){
//      this.dirIndex = (4 - this.dirIndex + 8) % 8;
//      this.heading = this.dirs[this.dirIndex];
//      nx = this.loc.x + cos(this.heading) * this.speed;
//    }

//    if(ny - r < bb.y || ny + r > bb.y + bb.h){
//      this.dirIndex = (8 - this.dirIndex) % 8;
//      this.heading = this.dirs[this.dirIndex];
//      ny = this.loc.y + sin(this.heading) * this.speed;
//    }


//    this.loc.x = round(nx / this.gridSize) * this.gridSize;
//    this.loc.y = round(ny / this.gridSize) * this.gridSize;
//  }

//  draw(){
//    // this.update();
//    // rect(this.boundingBox.x, this.boundingBox.y, this.boundingBox.w, this.fboundingBox.h);
//    fill("red");
//    ellipse(this.loc.x, this.loc.y, this.dia, this.dia);

//    for(let i = 1; i < this.history.length; i++){
//      // let alpha = map(i, 0, this.history.length, 0, 255);
//      // fill(0, alpha);
//      // debugger;
//      line(this.history[i].x, this.history[i].y, this.history[i-1].x, this.history[i-1].y);
//    }
//  }
//}


