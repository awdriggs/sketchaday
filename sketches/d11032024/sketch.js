//inspired by Oude Kerk floor map
let center;
function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  // noStroke();
  // noLoop();
  frameRate(10);
  containerWidth = 800;
  containerHeight = 800;
  containerX = width/2 - containerWidth/2;
  containerY = height/2 - containerHeight/2;
  center = createVector(width/2, height/2);
}

function draw() {
  background(255);

  let rectangleWidth = 25;
  let numCols = floor(containerWidth/rectangleWidth); //see how many cols can fit
  rectangleWidth = containerWidth/numCols; //exact width, always slightly wider than original 
  let rectangleHeight = 25; //roughly, the size you want
  let numRows = floor(containerHeight/rectangleHeight); //see how many rows can fit
  rectangleHeight = containerHeight/numRows; //exact height, always slightly taller than original height
  //console.log(numRows);

  //irregular grid, circular
  for(let i = 0; i < numRows; i++){
    // print(i * rectangleHeight);
    // debugger;
    let startX = width/2 - (i+1)*rectangleWidth/2; 
    // for(let j = 0; j < i + 1; j++){
    //   let x = startX + j * rectangleWidth;
    //   rect(x, i * rectangleHeight, rectangleWidth, rectangleHeight);
    // }

    let x = 0;
    while(x < containerWidth){
      console.log("looping");
      let w;
      let r = random();

      if(r < 0.1 && x + rectangleWidth * 2 < containerWidth){
        w = rectangleWidth * 2;
      } else {
        w = rectangleWidth;
      }
      
      let rectCoord = createVector( containerX + x, containerY + i * rectangleHeight);
      let d = dist(center.x, center.y, rectCoord.x, rectCoord.y); 

      if(d < 400){
        rect(containerX + x, containerY + i * rectangleHeight, w, rectangleHeight);
      }
      x += w;
    }
  }

  //let columnGap = rectangleWidth * 4;
  //let numCols = floor(width/columnGap);
  ////columns
  //for(let i = 1; i < numRows; i++){
  //  for(let j = 0; j < numCols; j++){
  //    ellipse(j * columnGap + columnGap, i * rectangleHeight, 25, 25);
  //  }
  //}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
