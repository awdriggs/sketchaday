// recreating the pain in the ass I was having with a raspberry pi screen as therapy

let glitch 
// 240x135
function setup() {
  createCanvas(135 * 4, 240 * 4);
  // createCanvas(300, 300);
  // createCanvas(windowWidth, windowHeight);
  glitch = createImage(width, height);
  noStroke();
}

function draw() {
  background(255);

  glitch.loadPixels();

  for(let i = 0; i < glitch.pixels.length; i+=4){
    let c = randomColor();
    // debugger;
    glitch.pixels[i] = c.r; 
    glitch.pixels[i+1] = c.g; 
    glitch.pixels[i+2] = c.b; 
    glitch.pixels[i+3] = 255; 
  }

  glitch.updatePixels();

  image(glitch, 0, 0, width, height);


  fill(255, 0, 0);
  rect(0, 0, width * 0.55, height * 0.75);

  rect(0, 0, width * 0.5, height * 0.125);
  fill(0, 255, 0);
  rect(width*0.5, 0, width * 0.5, height * 0.125);
  fill(0, 0, 255);
  rect(0, height * 0.125, width * 0.5, height * 0.25);
  fill(255, 255, 0);
  rect(width*0.5, height * 0.125, width * 0.5, height * 0.25);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function randomColor(){
  return {r: floor(random(255)), g: floor(random(255)), b: floor(random(255))} 
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(0, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

   


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function randomColor(){
  return {r: floor(random(255)), g: floor(random(255)), b: floor(random(255))} 
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(0, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "png");
  }
}

