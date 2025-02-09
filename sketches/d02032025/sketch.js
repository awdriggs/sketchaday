let row = [];
let numCols = 20;

function setup() {
  createCanvas(800, 800);

  let rectSize = width / (numCols - 1);


  for(let i = 0; i < numCols; i++){
    if(i == 0){ //first
      row.push([0, 0]);
      console.log(row);
    } else if(i == numCols - 1) { //last
      row.push([width, width]);
    } else { //middle cols
      let offset1 = random(-rectSize/2, rectSize/2);
      let offset2 = random(-rectSize/2, rectSize/2);
      row.push([i * rectSize + offset1, i * rectSize + offset2]);
    }
  }
}

function draw() {
  background(255);

  for(let l of row){
    line(l[0], 0, l[1], height);
  }

}

function randomColor(){
  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);

  return color(r, g, b);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

