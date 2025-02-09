let dir = -1;
let h = 12;
function setup() {
  createCanvas(600, 600);
  // createCanvas(windowWidth, windowHeight);
  textSize(60);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(220);
  drawFace();
  drawTime();
}

function mouseReleased() {
  dir = dir * -1; //flip it and reverse it
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function getTime(){
  //some thanks to chatgpt for this func
  const now = Date.now(); // Get current timestamp in milliseconds
  let hours = now / (1000 * 60 * 60) % 12; // Convert to hours
  const minutes = now / (1000 * 60) % 60; // Convert to minutes
  const seconds = now / 1000 % 60;        // Convert to seconds

  // console.log(`Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`);
  return {h: hours, m: minutes, s: seconds}
}

function drawTime(){

  let time = getTime();
  //hours, 12 should be at the top
  // h = 2;
  let radius = width/4;


  let hourAngle = dir * (map(time.h, 0, 12, 0, TWO_PI) - HALF_PI)
  let minAngle = dir * (map(time.m, 0, 60, 0, TWO_PI) - HALF_PI)
  let secAngle = dir * (map(time.s, 0, 60, 0, TWO_PI) - HALF_PI)

  stroke(0);
  strokeWeight(12);
  let hx = width/2 + cos(hourAngle) * radius;
  let hy = width/2 + sin(hourAngle) * radius;
  line(width/2, height/2, hx, hy);


  strokeWeight(8);
  let mx = width/2 + cos(minAngle) * (radius * 1.1);
  let my = width/2 + sin(minAngle) * (radius * 1.1);
  line(width/2, height/2, mx, my);

  strokeWeight(4);
  let sx = width/2 + cos(secAngle) * (radius * 1.2);
  let sy = width/2 + sin(secAngle) * (radius * 1.2);
  line(width/2, height/2, sx, sy);

}

function drawFace(){
  let radius = width/2 * 0.9;
  stroke(0);
  ellipse(width/2, height/2, radius * 2, radius * 2);
  for(let i = 1; i < 13; i++){
    let hourAngle = dir * (map(i, 0, 12, 0, TWO_PI) - HALF_PI)
    let x1 = width/2 + cos(hourAngle) * 0.85 * radius;
    let y1 = width/2 + sin(hourAngle) * 0.85 * radius;
    let x2 = width/2 + cos(hourAngle) * 0.75 * radius;
    let y2 = width/2 + sin(hourAngle) * 0.75 * radius;

    // stroke(120);
    //strokeWeight(10);
    // line(x1, y1, x2, y2);
    stroke(0);
    strokeWeight(1);
    text(i, x1, y1);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 10);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

