//inspired by marble blocks at olivetti showroom venice, carlo molino

//seem, alternating square blocks, either a sawtooth look or a solid block on one side and a blank on the other

let numRows, blockSize;


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 20;
  blockSize = height/numRows;

  // noLoop();
  frameRate(1);
  noStroke();
}


function draw() {
  background(255);

  let y = 0;
  let x = width/2 - blockSize;
  let threshold = 0.5;

  noStroke();
  while(y < height){
    
    console.log(threshold);
    let growth = 0;
    //choose to draw a block or not
    let patternNum = floor(random(10));

    if(patternNum < 5){
      //type 1, sawtooth
      if(random() > threshold){
        fill("black")
        rect(x, y, blockSize, blockSize);
        rect(x + blockSize, y+blockSize, blockSize, blockSize);
        threshold += 0.1;
        growth += 2*blockSize;
      } else {
        threshold -= 0.1;
      }
    }

    //type 2, single column
    if(patternNum >= 5 && patternNum < 7){
      fill("black");
      let h = floor(random(1, 5));

      rect(x, y, blockSize, blockSize * h);
      growth += blockSize * h;
    }

    //type 3, a gap
    if(patternNum >= 7){
      fill("white");
      let h = floor(random(1, 5));

      rect(x, y, blockSize, blockSize * h);
      growth += blockSize * h;
    }


    y += growth;
  }
  stroke(0);
  line(x + blockSize, 0, x + blockSize, height);


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

class seem {

}
