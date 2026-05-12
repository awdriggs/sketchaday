//shades of blue tester
//a single device
let days = [];
let rowHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  let numRows = 30;
  rowHeight = height/numRows;

  for(let r = 0; r < numRows; r++){
    console.log(r);
    let bars = []
    let spread = map(r, 0, numRows, 0.5, 1);
    for(let i = 0; i < width; i++){
      let r = random(80, 110);
      let g = random(60, 80)
      let b = 125;

      // let spread = map(r, 0, numRows, 0.1, 3);
      // console.log(r, spread);
      // let spread = 0.1;
      let d = abs(i - width/2) / (width/2); // 0 at center, 1 at edges
      let a = map(pow(d, spread), 0, 1, 0, 255);

      bars.push(color(r, g, b, a));
    }
    days.push(bars);
  }
  noStroke();
}

function draw() {
  background(0);

  for(let r = 0; r < days.length; r++){
    let bars = days[r];
    for(let i = 0; i< bars.length; i++){

      fill(bars[i]);
      rect(i, r * rowHeight, 2, rowHeight);
    }
  }
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

 
