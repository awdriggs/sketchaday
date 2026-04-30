//grid with jitter
let points =  [];
let triangles = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numRows = 10;
  let numCols = 10;
  let cellWidth = width/numCols;
  let cellHeight = height/numRows;

  //supertriangle
  // triangles.push([[width/2, -height * 2], [-width * 2, height * 2], [width * 3, height * 2]])
  triangles.push([{x: width/2, y: width/2 - width * 0.25}, {x:width/2 - width * 0.25, y:height/2 + height * 0.25 }, {x:width/2+ width * 0.25 , y: height/2 + height * 0.25}])


  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let xOffset = random(-cellWidth * 0.25, cellWidth * 0.25);
      let yOffset = random(-cellHeight * 0.25, cellHeight * 0.25);
      let p = createVector(j * cellWidth + cellWidth/2 + xOffset, i * cellHeight + cellHeight/2 + yOffset);
      points.push(p);
    }
  }

  noLoop();
}

function draw() {
  background(255);
  // fill("red");
  // ellipse(width/2, height/2, 10, 10);

  fill(255);
  for(let t of triangles){
    for(let v of t){

      ellipse(v.x, v.y, 10, 10);
    }
  }

  getCircumCenter(triangles[0]);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function getCircumCenter(triVerts){
  let a = triVerts[0]
  let b = triVerts[1]
  let c = triVerts[2]

  //common denonominator
  let d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) 
  
  //system of equation for finding center point
  let x = 1/d * ((a.x**2 + a.y**2)*(b.y - c.y) + (b.x**2 + b.y**2)*(c.y - a.y) + (c.x**2 + c.y**2)*(a.y - b.y))
  let y = 1/d * ((a.x**2 + a.y**2)*(c.x - b.x) + (b.x**2 + b.y**2)*(a.x - c.x) + (c.x**2 + c.y**2)*(b.x - a.x))

  //debug
  fill("blue");
  ellipse(x, y, 10, 10);

  // fill("yellow");
  noFill();
  let r = dist(x, y, a.x, a.y);
  ellipse(x, y, r * 2, r * 2); 

  return {x: x, y: y}
}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

// class Triange {
//   constructor(){

//   }
// }


