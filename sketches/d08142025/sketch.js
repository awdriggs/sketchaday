let rowHeight, distBeforeCurl, numRows;
let colors = []
let flippy = 1;
let dir = 1;


function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  numRows = 40;
  // rowHeight = height/numRows;

  distBeforeCurl = width * 0.15;
  rowHeight = distBeforeCurl /2
  // numRows = floor(height/rowHeight);
  print(numRows);

  strokeWeight(4);

  // for(let i = 0; i < numRows * 2; i++){
  //   let r = random(0, 255);
  //   let g = random(0, 255);
  //   let b = random(0, 255);

  //   colors.push(color(r,g,b));
  // }
}

function draw() {
  background(255);

  let offset = -width/4;

  for(let i = -numRows; i < numRows; i++){ 
    let y = i * rowHeight * (1 + 1/3);
     // if((i+numRows + flippy) % 2 == 0 ){
      for(let x = offset; x < width; x+= distBeforeCurl - rowHeight * 2/3){
        // stroke(colors[i + numRows]);
        stroke(0);
        line(x, y, x + distBeforeCurl, y);
        curl(x + distBeforeCurl, y, rowHeight);
        y += rowHeight;
      }

    // }
  }

  // if(frameCount % 60 == 0){
  //   if(flippy == 1){
  //     flippy = 0;
  //   } else {
  //     flippy = 1;
  //   }
  // }
  // console.log(flippy);

  distBeforeCurl += 0.5 * dir;
  rowHeight = distBeforeCurl /2

  if(distBeforeCurl > width/2){
    dir = -1;
  } else if(distBeforeCurl < width * 0.15){
    dir = 1;
  }


}

function curl(x, y, h){
  let o1 = h * 1/3
  let o2 = h * 2/3

  line(x, y, x, y + o2);
  line(x, y + o2, x - o1, y + o2);
  line(x - o1, y + o2, x - o1, y + o1);
  line(x - o1, y + o1, x - o2, y + o1);
  line(x - o2, y + o1, x - o2, y + h);
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 7);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

