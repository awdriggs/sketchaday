//delenay with poisson points
let points =  [];
let triangles = [];
let cellWidth, cellHeight;
let tl, tr, bl, br;
let numRows, numCols;
let n = 0; //global noise value
let lineThickness = 10;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  reset();

  strokeWeight(lineThickness);
  strokeCap(SQUARE);
   
}

function draw() {
  background(255);

  for(let t of triangles){
    noFill();
    let hasCorner = false;
    for(let v of t){
      if(v == tl || v == tr || v == bl || v == br){
        hasCorner = true;
      }
    }

    if(hasCorner == false){
      // triangle(t[0].x, t[0].y, t[1].x, t[1].y, t[2].x, t[2].y);
      stroke(0);
      strokeWeight(lineThickness);
      line(t[0].x, t[0].y, t[1].x, t[1].y);
      line(t[1].x, t[1].y, t[2].x, t[2].y);
      line(t[2].x, t[2].y, t[0].x, t[0].y);
      
      noStroke();
      fill(0);
      ellipse(t[0].x, t[0].y, lineThickness, lineThickness);
      ellipse(t[1].x, t[1].y, lineThickness, lineThickness);
      ellipse(t[2].x, t[2].y, lineThickness, lineThickness);
    }
  }

  // for(let p of points){
  //   fill("blue");
  //   ellipse(p.x, p.y, 10, 10);
  // }

  if(frameCount % 30 == 0){
    //   reset();
    reset();
  }



}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }


function reset(){
  triangles = [];
  points = [];
  numRows = 10;
  numCols = 10;
  cellWidth = width/numCols;
  cellHeight = height/numRows;
  let radius = 266; //for poisson distribution

  //supertriangle
  // triangles.push([{x: width/2, y: -height * 2}, {x: -width * 2, y: height * 2}, {x: width * 3, y: height * 2}])
  tl = {x: 0, y: 0};
  tr = {x: width, y: 0};
  bl = {x: 0, y: height};
  br = {x: width, y: height};

  //two triangles difining the drawing space
  triangles.push([tl, tr, bl]);
  triangles.push([bl, br, tr]);

    //poisson points 
  points = poisson(width, height, radius);

  // noStroke();
  // addPoint(points[0])

  for(let p of points){
    addPoint(p);
  }
}

function getCircumCircle(triVerts){
  let a = triVerts[0]
  let b = triVerts[1]
  let c = triVerts[2]

  //common denonominator
  let d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y))

  //system of equation for finding center point
  let x = 1/d * ((a.x**2 + a.y**2)*(b.y - c.y) + (b.x**2 + b.y**2)*(c.y - a.y) + (c.x**2 + c.y**2)*(a.y - b.y))
  let y = 1/d * ((a.x**2 + a.y**2)*(c.x - b.x) + (b.x**2 + b.y**2)*(a.x - c.x) + (c.x**2 + c.y**2)*(b.x - a.x))

  let r = dist(x, y, a.x, a.y);

  return {x: x, y: y, r: r}
}

function isInCircumCircle(triangle, point) {
  let circumCircle = getCircumCircle(triangle);

  return dist(point.x, point.y, circumCircle.x, circumCircle.y) < circumCircle.r
}

function addPoint(p){
  let badTriangles = [];

  //get the bad triangless
  for(let tri of triangles){
    if(isInCircumCircle(tri, p)){
      badTriangles.push(tri);
    }
  }

  //get the boundry edges
  let boundaries = []

  for(let tri of badTriangles){
    let a = tri[0]
    let b = tri[1]
    let c = tri[2]

    boundaries.push(makeEdge(a, b));
    boundaries.push(makeEdge(a, c));
    boundaries.push(makeEdge(b, c));
  }

  //remove duplicate boundries
  let uniqueBounds = [];
  for(let e1 of boundaries){
    let shared = false;
    for(let e2 of boundaries){
      if(e1 != e2 && edgesMatch(e1, e2)){
        shared = true;
      }
    }
    if(!shared){
      uniqueBounds.push(e1);
    }
  }

  for(let b of uniqueBounds){
    triangles.push([p, b[0], b[1]]);
  }

  let goodTriangles = [];
  for(let t of triangles){
    if(badTriangles.indexOf(t) == -1){
      goodTriangles.push(t);
    }
  }

  //triangles.push([{x: width/2, y: -height * 2}, {x: -width * 2, y: height * 2}, {x: width * 3, y: height * 2}])
  triangles = goodTriangles
}

function makeEdge(a, b){
  return a.x < b.x ? [a, b] : [b, a];
}

function edgesMatch(e1, e2){
  return e1[0] == e2[0] && e1[1] == e2[1];
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}
 
// class Point {
//   constructor(x, y, drift)
// }


