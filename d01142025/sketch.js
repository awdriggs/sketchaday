let points = [];
let tris = [];
let dragging = false;
let pointBeingDragged;
let margin = 50;

function setup() {
  createCanvas(800, 800);
  // points.push(new Point(margin, margin)); //left top
  // points.push(new Point(width - margin, margin)); //right top
  // points.push(new Point(width/2, height/2));
  // points.push(new Point(margin, height - margin)); //left bottom
  // points.push(new Point(width - margin, height - margin)); //right bottom

  // tris.push(new Tri([points[0], points[1], points[2]]));


  //right tri
  //top tri
  //bottom tri

  createPoints();
  createTris();
  noFill();
  console.log(points.length);
}

function createPoints(){
  let numCols = 10;
  let xOffset = width/numCols;
  let numRows = 20;
  let yOffset = height/numRows;


  for(let i = 0; i < numRows; i++){
    let row = [];
    if(i % 2 == 0){
      for(let j = 0; j < numCols; j++){
        row.push(new Point(j * xOffset + xOffset/4, i * yOffset + yOffset/4));
      }
    } else { //odd rows
      for(let j = 0; j < numCols; j++){
        row.push(new Point(j * xOffset + xOffset/2 + xOffset/4, i * yOffset + yOffset/4));
      }
    }

    points.push(row);
    console.log(row.length);
  }

  console.log(points);
}

function createTris(){
  for(let i = 0; i < points.length - 2; i++){
    //i is the row number
    for(let j = 0; j < points[i].length - 1; j++){
      //j is the col number
      if(i % 2== 0){
        tris.push(new Tri([points[i][j], points[i + 1][j], points[i][j+1]]));
        tris.push(new Tri([points[i][j], points[i+1][j], points[i+2][j]]));
      } else {
        if(j < points[i].length - 1){
          tris.push(new Tri([points[i][j], points[i + 1][j], points[i+1][j + 1]]));
        } else {

        }
      }

    }
  }
  // tris.push(new Tri([points[0][0], points[0][1], points[1][0]]));
}

function draw() {
  background(255);

  // drawTris();

  for(let row of points){
    for(let p of row){
      p.draw();
    }
  }


  for(let t of tris){
    t.draw();
  }
}


function mousePressed() {
  for(let row of points){
    for(let p of row){
      if(p.in()){
        pointBeingDragged = p;
      }
    }
  }
}

function mouseDragged(){
  if(pointBeingDragged){
    pointBeingDragged.x = mouseX;
    pointBeingDragged.y = mouseY;
  }
}

function mouseReleased(){
  pointBeingDragged = null;
}

class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.size = 30;
  }

  draw(){
    fill(255);
    ellipse(this.x, this.y, this.size/2, this.size/2);
  }

  in(){
    if(dist(mouseX, mouseY, this.x, this.y) < this.size/2){
      return true;
    } else {
      return false;
    }
  }
}

class Tri {
  constructor(points){
    this.points = points;
  }

  draw(){
    noFill();
    triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
  }
}

// function drawTris(){
//   noFill();
//   triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
//   triangle(points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y);
//   triangle(points[1].x, points[1].y, points[4].x, points[4].y, points[2].x, points[2].y);
//   triangle(points[3].x, points[3].y, points[4].x, points[4].y, points[2].x, points[2].y);
// }
