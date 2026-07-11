let numRows, numCols, gridSize;
let loc, dir
let prevLocs = [];
let cells = [];
let filledCells = new Set();
let edges = new Set();
let oldLines = [];
let currentColor;
// let toggle = 1;

function setup(){
  createCanvas(800, 800);

  numRows = floor(10 * width/800);
  numCols = floor(10 * height/800);
  gridSize = width/numRows;

  // currentColor = color("RED");

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      cells.push({x: j, y: i});
    }
  }

  reset();

    // noLoop();

  // console.log(loc, dir);
  strokeCap(PROJECT);
  strokeWeight(30 * width/800);
}

function draw(){
  background(255);

  if(filledCells.size < 5000 && frameCount % 10 == 0){
    move();
  }

  fill(255);
  for(let l of oldLines){
    for(let i = 1; i < l.verts.length; i++){
      // stroke(l.c);
      line(l.verts[i].x, l.verts[i].y, l.verts[i-1].x, l.verts[i-1].y);
    }
  }
  
  //draw the lines connection the history
  // stroke(currentColor);
  for(let i = 1; i < prevLocs.length; i++){
    line(prevLocs[i].x, prevLocs[i].y, prevLocs[i-1].x, prevLocs[i-1].y);
  }

  // if(frameCount % 10 == 0){
  //   move();
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



function reset(){
  if(prevLocs.length > 0){
    oldLines.push({c: currentColor, verts: prevLocs});
    // toggle *= -1;
    
    // currentColor = toggle == 1 ? "red" : "blue";
  }

  prevLocs = [];

  let available = cells.filter(c => !filledCells.has(`${c.x},${c.y}`));
  if (available.length === 0) { noLoop(); return; }
  loc = available[floor(random(available.length))];
  filledCells.add(`${loc.x},${loc.y}`);
  prevLocs.push({x: loc.x * gridSize + gridSize/2, y: loc.y * gridSize + gridSize/2});

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
      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !filledCells.has(`${nextX},${nextY}`) && !edges.has(edgeKey(loc.x, loc.y-1, loc.x+1, loc.y))){
        possibleDirs.push("NE");
      }
    } else if(dirs[i] == "NW"){
      let nextX = loc.x - 1;
      let nextY = loc.y - 1;
      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !filledCells.has(`${nextX},${nextY}`) && !edges.has(edgeKey(loc.x-1, loc.y, loc.x, loc.y-1))){
        possibleDirs.push("NW");
      }
    } else if(dirs[i] == "SW"){
      let nextX = loc.x - 1;
      let nextY = loc.y + 1;
      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !filledCells.has(`${nextX},${nextY}`) && !edges.has(edgeKey(loc.x-1, loc.y, loc.x, loc.y+1))){
        possibleDirs.push("SW");
      }
    } else if(dirs[i] == "SE"){
      let nextX = loc.x + 1;
      let nextY = loc.y + 1;
      if(nextX >= 0 && nextX < numCols && nextY >= 0 && nextY < numRows && !filledCells.has(`${nextX},${nextY}`) && !edges.has(edgeKey(loc.x, loc.y+1, loc.x+1, loc.y))){
        possibleDirs.push("SE");
      }
    }
  }

  if(possibleDirs.length === 0) {
    // noLoop();
    // setTimeout(() => { reset(); loop(); }, 1000); // pause 1 second
    reset();
    return;
  }

  let nextMove = possibleDirs[floor(random(0, possibleDirs.length))];

  //store the dir
  dir = nextMove
  let prevX = loc.x, prevY = loc.y;

  //update the loc
  if(nextMove == "NE"){ loc.x += 1; loc.y -= 1; }
  else if(nextMove == "NW"){ loc.x -= 1; loc.y -= 1; }
  else if(nextMove == "SW"){ loc.x -= 1; loc.y += 1; }
  else if(nextMove == "SE"){ loc.x += 1; loc.y += 1; }

  edges.add(edgeKey(prevX, prevY, loc.x, loc.y));
  filledCells.add(`${loc.x},${loc.y}`);
  prevLocs.push({x: loc.x * gridSize + gridSize/2, y: loc.y * gridSize + gridSize/2}); //stash the loc before moving
}


//dirs, NE, NW, SE, SW
//if prev dir was NE, new dir can't be SW
//if prev dir was SW, new dir can't be NE
//if prev dir was NW, new dir can't be SE
//if prev dir was SE, new dir can't be NW
function edgeKey(x1, y1, x2, y2) {
  if (x1 < x2 || (x1 === x2 && y1 < y2)) return `${x1},${y1}|${x2},${y2}`;
  return `${x2},${y2}|${x1},${y1}`;
}

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


