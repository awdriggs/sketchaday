//grid with jitter
let points =  [];
let triangles = [];
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  let numRows = 10;
  let numCols = 10;
  cellWidth = width/numCols;
  cellHeight = height/numRows;

  //supertriangle
  triangles.push([{x: width/2, y: -height * 2}, {x: -width * 2, y: height * 2}, {x: width * 3, y: height * 2}])
  // triangles.push([{x: width/2, y: width/2 - width * 0.25}, {x:width/2 - width * 0.25, y:height/2 + height * 0.25 }, {x:width/2+ width * 0.25 , y: height/2 + height * 0.25}])

  for(let i = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let xOffset = random(-cellWidth * 0.25, cellWidth * 0.25);
      let yOffset = random(-cellHeight * 0.25, cellHeight * 0.25);
      let p = createVector(j * cellWidth + cellWidth/2 + xOffset, i * cellHeight + cellHeight/2 + yOffset);
      points.push(p);
    }
  }

  noLoop();
  // noStroke();

  // addPoint(points[0])
                                                                                                                                                                                     
  for(let p of points){                                                                                                                                                              
    addPoint(p);                                                                                                                                                                     
  } 
}

function draw() {
  background(255);
  // fill("red");
  // ellipse(width/2, height/2, 10, 10);

  //for debuggin
  // fill(255);
  // for(let t of triangles){
  //   for(let v of t){

  //     ellipse(v.x, v.y, 10, 10);
  //   }
  // }

  // let boundingCirc = getCircumCenter(triangles[0]);
  // ellipse(boundingCirc.x, boundingCirc.y, boundingCirc.r * 2, boundingCirc.r * 2);

  for(let t of triangles){
    triangle(t[0].x, t[0].y, t[1].x, t[1].y, t[2].x, t[2].y);
  }


}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

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


