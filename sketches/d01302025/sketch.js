//genuary 30, abstract map

//ladscape holds sections
let landscape = [];
let l, m, s;
function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  //calculate breakpoints for the sections

  //large sections 1/8 of width or greater
  //middle sections 1/16
  //smaller sections 1/32 or smaller
  l = width/8;
  m = width/16;
  s = width/32;
  xs = 10;

  let numAcross = 2;
  let startSize = width/numAcross; //for testing
  //generate the starting sections
  for(let i = 0; i < numAcross; i++){
    for(let j = 0; j < numAcross; j++){ //sq canvas, change for rect
      landscape.push(new Section(i * startSize, j * startSize, startSize));
    }
  }

}

function draw() {
  background(255);

  //display all sections

  for(let s of landscape){
    s.draw();
  }
  //roll the dice,
  //hit? choose a random section to split up
  //delete that section, replace with smaller section fill the space
  //but only do this if the section is greater than a certain size, say 10px wide
  let randomSection = floor(random(0, landscape.length));
  if(develop(landscape[randomSection])){
    landscape.splice(randomSection, 1); 
  }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
}

function develop(section){
  //section has x, y, size, and type
  if(section.size > xs){
    let numAcross = 2;
    let startSize = section.size/numAcross; //for testing

    for(let i = 0; i < numAcross; i++){
      for(let j = 0; j < numAcross; j++){ //sq canvas, change for rect
        landscape.push(new Section(section.x + i * startSize, section.y + j * startSize, startSize));
      }
    }
    return true;
  }
  
  else {
    return false;
  }
}

class Section {
  constructor(x, y, s, t){
    this.x = x;
    this.y = y;
    this.size = s;
    this.type = t;
  }


  draw(){
    rect(this.x, this.y, this.size);

    if(this.size > m){
      ellipse(this.x + this.size/2, this.y + this.size/2, this.size);
    }
    //larger sections get drawn as a crop circle or half circle
    //
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb-lg', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

