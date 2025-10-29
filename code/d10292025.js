//sol lewitt, all comintiosn of rectangle, triangle and circle

let tris, quads;
let triIndex = 0;
let quadIndex = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  quads = generatePolys(width/10, height/10, width - 2 * width/10, height - 2 * height/10);
  tris = generateTris(width/10, height/10, width - 2 * width/10, height - 2 * height/10);
  // points = generatePoints(0, 0, width, height);

  // frameRate(1);
}

function draw() {
  background(255);
  drawShape(tris[triIndex]);
  drawShape(quads[quadIndex]);

  if(frameCount % 60 == 0){
    updateIndexes();
  }
}

function generatePolys(x, y, w, h){
  //x and y are the top left corner points
  //w and h are the width and height of the bounding square

  let a = createVector(x, y)
  let b = createVector(x + w * 0.25, y)
  let c = createVector(x + w * 0.5, y)
  let d = createVector(x + w * 0.75, y)
  let e = createVector(x + w, y)
  let f = createVector(x, y + h)
  let g = createVector(x + w * 0.25, y + h)
  let i = createVector(x + w * 0.5, y + h)
  let j = createVector(x + w * 0.75, y + h)
  let k = createVector(x + w, y + h)

  let polys = [];

  polys.push([a, e, k, f]);
  polys.push([b, e, k, f]);
  polys.push([b, d, k, f]);
  polys.push([a, d, k, f]);
  polys.push([a, e, j, f]);
  polys.push([a, e, j, g]);
  polys.push([a, e, k, g]);
  polys.push([b, e, k, g]);
  polys.push([a, d, j, f]);
  polys.push([b, d, j, g]);
  polys.push([a, d, k, g]);
  polys.push([b, e, j, f]);

  return polys
}


function drawShape(arr){
  noFill();

  beginShape();
  for(let i = 0; i < arr.length; i++){
    vertex(arr[i].x, arr[i].y);
  }
  endShape(CLOSE);

}

function generateTris(x, y, w, h){
  //x and y are the top left corner points
  //w and h are the width and height of the bounding square

  let a = createVector(x, y)
  let b = createVector(x + w * 0.25, y)
  let c = createVector(x + w * 0.5, y)
  let d = createVector(x + w * 0.75, y)
  let e = createVector(x + w, y)
  let f = createVector(x, y + h)
  let g = createVector(x + w * 0.25, y + h)
  let i = createVector(x + w * 0.5, y + h)
  let j = createVector(x + w * 0.75, y + h)
  let k = createVector(x + w, y + h)

  let polys = [];

  polys.push([a, c, f]);
  polys.push([a, i, f]);
  polys.push([c, i, f]);
  polys.push([c, k, i]);
  polys.push([c, e, k]);
  polys.push([c, e, i]);
  polys.push([a, c, i]);
  polys.push([c, k, f]);
  polys.push([a, i, e]);

  return polys
}

function updateIndexes(){
  triIndex++;
  if(triIndex > tris.length - 1){
    triIndex = 0; //reset tri index

    quadIndex++;

    if(quadIndex > quads.length - 1){
      quadIndex = 0;
    }
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

