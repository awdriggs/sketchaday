//inspired by lines on manhole covers not be replaced right

let i = 1.16;
let j = 17.69; //do the math later!

function setup() {
  createCanvas(300, 300);
  strokeWeight(10);
  // createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  stroke(0);
  line(width * 0.6, 0, width * 0.6, height);

  noStroke();
  ellipse(width/2, height/2, width/2, height/2);

  stroke(0);
  // line(width * 0.75, 0, width * 0.75, height);
  // line(width * 0.6, cos(x), width * 0.6, height);
  let x1= width/2 + cos(i) * width/4;
  let y1 = height/2 + sin(i) * height/4;
  // let x2= width/2 + cos(i + PI) * 200; //this does opposite ends
  // let y2 = height/2 + sin(i + PI) * 200;
  let x2= width/2 + cos(j) * width/4;
  let y2 = height/2 + sin(j) * height/4;
  // ellipse(x1, y1, 20, 20);
  // ellipse(x2, y2, 20, 20);



  //to lazy to do the math
  // if(x1 < width * 0.6 + 0.5 && x1 > width * 0.6 - 0.5){
  //   print(i);
  // }

  line(x1, y1, x2, y2);
  print(dist(x1, y1, x2, y2));
  

  i += 0.01;
  j += 0.01;
  // print(i);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 10.5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

