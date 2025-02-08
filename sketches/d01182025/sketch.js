let n = 0;
let columns = [];
let sqSize;

let n2 = 0;

function setup() {
  // noStroke();
  createCanvas(800, 800);
  let numCols = 100;
  sqSize = width/numCols;


  for(let h = 0; h < 100; h++){

    let column = []; //crate one column
    for(let i = 0; i < 100; i++){
      column.push(noise(i/100, n2));
      // column.push(0);
    }
    columns.push(column);
  }

  strokeWeight(2);

}



function draw() {
  background(255);

  //flow, col 1 -> 2, 2->3
  //start at the last column
  //copy the previous column
  // if(columns.length > 100){
  //   columns.pop();
  // }

  if(columns.length < 100){
    columns.push([]); //push an empty array if we aren't to 100 yet
  }

  for(let i = columns.length - 1; i > 0; i--){
    columns[i] = structuredClone(columns[i-1]);
  }

  //update the first column
  for(let i = 0; i < columns[0].length; i++){
    columns[0][i] = noise(i/100, n2);
  }

  for(let i = 0; i < columns.length; i++){
    for(let j = 0; j < columns[i].length; j++){
      // fill(map(columns[i][j],0,1, 0, 255));
      let offset = map(columns[i][j], 0, 1, -20, 20);
      point(i * sqSize, j* sqSize + offset, sqSize);

    }
  }

  n2+=0.01;
}

