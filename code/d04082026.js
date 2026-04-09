//bauhaus color wheel 2
let slider;
let maxSize;
let angle, speed;
// let colors = ["black", "red", "yellow", "white"]
let circs = [];
let maxDistance, mouseDistance, maxSpeed;

function setup() {
  createCanvas(800, 800);
  maxSize = width * 0.8;
  angle = 0;
  speed = 0.05;

  let prevRadius = maxSize/2;
  let cx = 0, cy = 0;

  let ownRadius = prevRadius
  // for(let i = 1; i < 50; i++){
  while(ownRadius > width/200 && ownRadius > 20){
    ownRadius = prevRadius - random(10, 20);
    let maxOffset = prevRadius - ownRadius;

    // pick a random position within the parent circle
    let r = random(0, maxOffset);
    let a = random(TWO_PI);
    cx += r * cos(a);
    cy += r * sin(a);

    circs.push({color: "white", x: cx, y: cy, size: ownRadius * 2});

    prevRadius = ownRadius;
    // print(prevRadius)
  }
  
  maxDistance = dist(0, 0, width, height); //calculate just once
  maxSpeed = 0.2;
  print(maxDistance)
  // noStroke();
}

function draw() {
  background(255);
  mouseDistance = dist(0, 0, mouseX, mouseY);
  speed = map(mouseDistance, 0, maxDistance, 0, maxSpeed);

  // fill(colors[0]);
  // ellipse(width/2, height/2, maxSize, maxSize);

  push();
  translate(width/2, height/2);
  rotate(angle);
  for(let c of circs){
    fill(c.color);
    ellipse(c.x, c.y, c.size, c.size);
  }
  pop();

  angle += speed;
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}
