let points = [];
let dragging = false;
let pointBeingDragged;
let margin = 50;

function setup() {
  createCanvas(800, 800);
  points.push(new Point(margin, margin)); //left top
  points.push(new Point(width - margin, margin)); //right top
  points.push(new Point(width/2, height/2)); 
  points.push(new Point(margin, height - margin)); //left bottom 
  points.push(new Point(width - margin, height - margin)); //right bottom 
   
  
  //right tri
  //top tri
  //bottom tri
noFill();
}

function draw() {
  background(255);

  drawTris();

  for(let p of points){
    p.draw();
  }
}


function mousePressed() {
  for(let p of points){
    if(p.in()){
      pointBeingDragged = p;
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


function drawTris(){
noFill();
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  triangle(points[0].x, points[0].y, points[3].x, points[3].y, points[2].x, points[2].y);
  triangle(points[1].x, points[1].y, points[4].x, points[4].y, points[2].x, points[2].y);
  triangle(points[3].x, points[3].y, points[4].x, points[4].y, points[2].x, points[2].y);
}
