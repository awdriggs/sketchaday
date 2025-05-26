let angle = 0;
let n = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  fill(0);
  // stroke()
  // strokeWeight(30);
}

function draw() {
  angle = map(noise(n), 0, 1, -TWO_PI, TWO_PI); 
  // i = map(i, 0, 1, -1, 1)
  background(255);
  let cx = cos(angle) * width/2 + width/2;  
  let cy = sin(angle) * height/2 + height/2;  

  ellipse(cx, cy, width * 1.5, height *1.5);

  n +=0.01;
  // angle += 0.1;
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

// let angle = 0;
// let k;           // skew amount
// let a;           // base loop size

// function setup() {
//   createCanvas(800, 800);
//   a = width / 4;
//   // pick a skew between -0.4 and +0.4
//   k = random(0.4, 0.8);
//   k *= random() < 0.5 ? -1:1;

//   strokeWeight(30);
//   stroke(255);
//   fill(0);
// }

// function draw() {
//   background(0);

//   let t = angle;
//   // Bernoulli’s lemniscate denom
//   let denom = 1 + sq(sin(t));
//   // base points on a perfect ∞
//   let baseX =  a * sqrt(2) * cos(t) / denom;
//   let baseY =  a * sqrt(2) * cos(t) * sin(t) / denom;

//   // smooth scale: sin(t) is +1 on one loop, -1 on the other
//   let m = 1 + k * sin(t);

//   // apply skew
//   let x = baseX * m;
//   let y = baseY * m;

//   // center
//   let cx = x + width/2;
//   let cy = y + height/2;

//   ellipse(cx, cy, width * 1.5, height *1.5);

//   angle += 0.01;
// }


