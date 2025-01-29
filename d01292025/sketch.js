let numCols, numRows;
let space = [];
let w, h;
let textString = "adam driggers";
let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

let font;

function preload(){
  font = loadFont("Quicksand-Regular.ttf");
}

function setup() {
  createCanvas(800, 800);

  noStroke();

  textFont(font);
  textAlign(CENTER, CENTER);

  calculateSizes();
}

function draw() {
  background("#2c2920");
  // print("yo");
  for(let i = 0; i < space.length; i++){
    for(let j = 0; j < space[i].length; j++){
      let character = space[i][j];
      let textFill;

      // debugger;
      if(vowels.includes(character)){
        // fill("#dc4c30");
        textFill = "#dc4c30";
      } else if(character == " " || character == undefined){
        // fill("#2c2920");

      } else {
        // fill("#5e7c8d");
        textFill = "#5e7c8d";
      }

      fill("#2c2920");
      rect(j * w, i * h, w, h);

      if(textFill){
        fill(textFill);
      } else {
        fill("#2c2920");
      }
      text(character ? character : " ", j * w + w/2, i * h + h/2 - h/6);
      // text(character ? character : " ", j * w + w/2, i * h);
    }
  }

}

function calculateSizes(){
  numCols = 2;
  numRows = 1;

  while(numCols * numRows < textString.length){
    numCols++;
    numRows++;
  }
  let arraySize = numCols * numRows;
  let difference = arraySize - textString.length
  // debugger;

  for(let i = 0; i <= difference/2 - 1; i++){
    textString = " " + textString;
  }

  w = width / numCols;
  h = height / numRows;

  //build the text space
  let index = 0;
  for(let i = 0; i < numRows; i++){
    let singleRow = [];
    for(let j = 0; j < numCols; j++){
      singleRow.push(textString[index]);
      index++;
    }
    space.push(singleRow);
  }


  textSize(w);
}


function mousePressed(){
  print("yo");
  space = [];
  textString = prompt("type something");
  calculateSizes();
}

//#dc4c30 red
//#5e7c8d
//#2c2920
