let x1, y1, x2, y2, x3, y3, x4, y4;
// x1, first anchor point
// y1, first anchor point
// x2, x-coordinate of the first control point.
// y2, y-coordinate of the first control point.
// x3, x-coordinate of the second control point.
// y3, y-coordinate of the second control point.
// x4, x-coordinate of the anchor point.
// y4, y-coordinate of the anchor point. 

function setup() {
  createCanvas(800, 800);
  x1 = 0;
  y1 = height/2;
  // Create a slider and place it at the top of the canvas.
  x2 = createSlider(0, width);
  x2.position(10, 10);
  x2.size(100);

  y2 = createSlider(0, height)
  y2.position(10, 30);
  y2.size(100);

  x3 = createSlider(0, height)
  x3.position(10, 50);
  x3.size(100);

  y3 = createSlider(0, height)
  y3.position(10, 70);
  y3.size(100);

  x4 = width;
  y4 = height/2;
}

function draw() {
  background(255);
  text(x2.value(), 120, 25); 
  text(y2.value(), 120, 45); 
  text(x3.value(), 120, 65); 
  text(y3.value(), 120, 85); 

  beginShape();
  vertex(x1,y1)
  // bezierVertex(x2.value(), y2.value(), x3.value(), y3.value(), x4, y4);
  quadraticVertex(x2.value(), y2.value(), x4, y4);
  quadraticVertex(x3.value(), y3.value(), x1, y1);
  // vertex(x4, y4);
  endShape();

  fill("red");
  ellipse(x1, y1, 20, 20);
  ellipse(x4, y4, 20, 20);

  fill("blue"); 
  ellipse(x2.value(), y2.value(), 20, 20);
  ellipse(x3.value(), y3.value(), 20, 20);

  stroke(0);
  line(x1, y1, x2.value(), y2.value());
  line(x4, y4, x2.value(), y2.value());
  line(x1, y1, x3.value(), y3.value());
  line(x4, y4, x3.value(), y3.value());

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

