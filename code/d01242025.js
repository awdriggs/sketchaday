//genuary day 24, geometric art
//insp Horst Bartnig, German painter

let colors = [];
let numRows, numColors, rowHeight

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  
  colors = [color(226, 199, 51), color(135, 177, 70), color(77, 144, 71), color(50, 114, 83), color(138, 36, 48), color(192, 43, 35), color(219, 85, 30), color(227, 124, 14), color(233, 185, 11)];
  numColors = colors.length;
  numRows = 36;
  rowHeight = height/numRows + 2;
  noStroke();
}

function draw() {
  background(255);

  let w = width/numColors;

  for(let i = 0; i < numRows; i++){
    // fill(colors[i % numColors]);
    // rect(0, i * rowHeight, width, rowHeight); 

    let numCols;

    if(i % 4 == 0){
      numCols = 1;
    } else if(i % 3 == 0){
      numCols = 3;
    } else if(i % 2 == 0) {
      numCols = numColors;
    } else {
      numCols = numRows; //make it square! 
    }
    
    for(let j = 0; j < numCols; j++){
      let w = width/numCols;
      fill(colors[j % numColors]);
      rect(j * w, i * rowHeight, w, rowHeight); 
    }

    let last = colors.shift();
    colors.push(last);
  }

  if(frameCount % 100 == 0){
    // colors = shuffle(colors);
    let last = colors.pop();
    colors.unshift(last);
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}