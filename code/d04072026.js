//bauhaus color wheel 2
let slider;
let maxSize;
let angle, speed;
// let colors = ["black", "red", "yellow", "white"]
let circs = [];

function setup() {
  createCanvas(800, 800);
  maxSize = width * 0.8;
  angle = 0;
  speed = 0.2;

  let prevRadius = maxSize/2;
  let cx = 0, cy = 0;

  for(let i = 1; i < 30; i++){
    let ownRadius = prevRadius * random(0.8, 1);
    let maxOffset = prevRadius - ownRadius;

    // pick a random position within the parent circle
    let r = random(0, maxOffset);
    let a = random(TWO_PI);
    cx += r * cos(a);
    cy += r * sin(a);

    circs.push({color: "white", x: cx, y: cy, size: ownRadius * 2});

    prevRadius = ownRadius;
  }

  slider = createSlider(0, 1, 0.2, 0.1);
  slider.position(10, 10);
  slider.size(80);
  // noStroke();
}

function draw() {
  background(255);
  speed = slider.value();

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
