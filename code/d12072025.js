//simulation of camera movement for 8px light paintbrush

let cols = [];
let cellWidth, cellHeight;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  cellHeight = height/8; //makeing square cells, since there are 8px divide by 8
  //let numCols = floor(width/cellHeight); //this won't be exact on fullscreen!
  let numCols = width; //this won't be exact on fullscreen!
  cellWidth = width/numCols; //roughly square

  //fill wiht blank cols
  for(let i = 0; i < numCols; i++){
    cols.push([122, 122, 122, 122, 122, 122, 122, 122])
    // cols.push([random(255), random(255), random(255), random(255), random(255), random(255), random(255), random(255)])
  }

  noStroke();
}

function draw() {
  background(255);

  for(let i = 0; i < cols.length; i++){
    let x = i * cellWidth; //each col is a single pixel
    let col = cols[i];
    for(let j = 0; j < col.length; j++){
      let y = j * cellHeight;
      fill(col[j]);
      rect(x, y, cellWidth + 1, cellHeight + 1); //+1 is a hack to get rid of lines
    }
  }

  //new data!
  // if(frameCount % 20 == 0){
    //remove the column from the start of the array
    let col = cols.shift();

    //update the coloumn
    for (let i = 0; i < col.length; i++) {
      let dir = random() > 0.5 ? -1 : 1;
      col[i] += dir;
    }

    cols.push(col); //add the column back at the end of the array
  // }
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

