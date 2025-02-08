let angle1, angle2, radius1, radius2, angle3, radius3;
let x1, y1, x2, y2;
let c1, c2;

function setup() {
  createCanvas(800, 800);
  angle1 = 0;
  angle2 = random(0, TWO_PI);
  angle3 = 1;
  angle4 = 0;

  radius1 = 180;
  radius2 = 180;
  radius3 = width/4;
  
  c1 = createVector(width/4, height/4 * 3);
  c2 = createVector(width/4 * 3, height/4);
  

}

function draw() {
  background(255, 75);
 
  let x1 = cos(angle1) * radius1;
  let y1 = sin(angle1) * radius1;

  let x2 = cos(angle2) * radius2;
  let y2 = sin(angle2) * radius2;

  c1.x = width/2 + cos(angle3) * radius3;
  c1.y = height/2 + sin(angle3) * radius3;
  c2.x = width/2 + cos(angle4 + PI) * radius3;
  c2.y = height/2 + sin(angle4 + PI) * radius3;


  line(c1.x + x1, c1.y + y1, c2.x + x2, c2.y + y2);
   
  angle1 += 0.05;
  angle2 -= 0.025;
  angle3 += 0.001;
  angle4 -= 0.002;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
