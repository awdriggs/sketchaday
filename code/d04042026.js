//bahaus color wheel 1
//small fail! 
let slider;
let maxSize;
let angle, speed;
let colors = ["black", "red", "yellow", "white"]
let circs = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  maxSize = width * 0.8
  angle = 0;
  speed = 0.2;

  for(let i = 0; i < colors.length; i++){
    let circSize = maxSize - maxSize * i/colors.length;
    let nextSize = maxSize - maxSize * (i+1)/colors.length;
    circs.push({color: colors[i], xoffset: random(0, nextSize/2), yoffset: random(0, nextSize/2), size: circSize});
  }


  slider = createSlider(0, 1, 0.2, 0.1);
  slider.position(10, 10);
  slider.size(80);

  noStroke();

}

function draw() {

  background(255);
  
  speed = slider.value();
  fill("blue");
  ellipse(width/2, height/2, maxSize, maxSize);

  push()
  translate(width/2, height/2)
  rotate(angle);
  // ellipse(0,0, maxSize, maxSize);
  for(let c of circs){
    fill(c.color);
    ellipse(0 + c.xoffset, 0 + c.yoffset, c.size, c.size);
  }
  pop();
  angle += speed;
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

