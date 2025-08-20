let lines = [];
let numLines;
let maxShift;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
 
  numLines = width; 
  maxShift = height/8;
  maxLength = height/4;
  minLength = height/32;

  for(let i = 0; i < numLines; i++){
    let x = i;
    let n = noise(x/100);

    // let y = height/2 + random(-maxShift, maxShift);
    let y = height/2 + map(n, 0, 1, -maxShift, maxShift);
    let l = random(minLength, maxLength);

    lines.push({x: x, y: y, l: l});

  }
  
}

function draw() {
  background(255);

  stroke(0);
  for(let i = 0; i < lines.length; i++){
    let c = lines[i]; //current line

    line(c.x, c.y - c.l, c.x, c.y + c.l);
  
    //updte for next loop
    c.y += random(-1, 1);
    c.l += random(-1, 1);

    if(c.l > maxLength){
      c.l = maxLength;
    } else if(c.l < minLength){
      c.l = minLength;
    }

    if(c.y > height * 0.75){
      c.y = height * 0.75;
    } else if(c.y < height * 0.25){
      c.y = height * 0.25;
    }
  }

  // stroke("red");
  // line(0, height/2, width, height/2);

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

