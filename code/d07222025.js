let numCols, slantWidth;

let motionX = 0, motionY = 0;
let dir = 1;
let c1, c2;
let amt;
let nOffset = 0;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numCols =  10;
  numRows = 5;

  slantWidth = width/numCols;
  rowHeight = height/numRows;

  c1 = "black";
  c2 = "white";

  amt = random(0, 30);

  frameRate(2);
  // noLoop();
}

function draw() {
  background(255);

  // stroke('red');
  noStroke();




  // let r = random(10, 20);
  // let r = map(noise(i/10, nOffset), 0, 1, -10, 10);

  for(let i = -10; i < numRows * 4; i++){
    // let r = random(-0.1, 0.1); 
    let r = random(-0.1, 0.1); 
    for(let j = -10; j < numCols + 10; j++){

      push();

      translate(width/2, i * rowHeight/4);
      // rotate(random(0.1, 0.3));
      rotate(r);
      let offset = 0;

      // if(i % 2 == 0){
      //   offset = slantWidth;
      // }

      // offset += amt * i + r;

      let x = j * slantWidth - width/2;
      // let y = i * rowHeight - rowHeight/2;
      let y = rowHeight;

      if(j % 2 == 0){
        fill(c1);
      } else {
        fill(c2)
        // fill(252,225,1)
      }

      quad(x, y,  x + slantWidth, y, x, y + rowHeight, x - slantWidth, y + rowHeight);


      // quad(x, 0,  x - slantWidth, 0, x, height, x + slantWidth, height);
      // fill("red");
      // ellipse(0, 0, 20, 20);
      pop();
    }

  }



  // nOffset += 0.001



}


function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}