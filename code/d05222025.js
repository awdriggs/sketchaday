let subimages = [];

let numCols, numRows;
let cellWidth, cellHeight;
let tile;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  numCols = 10;
  numRows = 10;

  cellWidth = width/numCols;
  cellHeight = width/numRows;

  //create an array of subimages
  for(let i  = 0; i < numRows; i++){
    for(let j = 0; j < numCols; j++){
      let x = j * cellWidth;
      let y = i * cellHeight;
      subimages.push(new thumb(x,y, cellWidth, cellHeight));
    }
  }


}

function draw() {
  background(255);

  for(let i of subimages){
    i.draw()//updates the images
    image(i.image, i.origin.x, i.origin.y)
  }

}

class thumb {
  constructor(x,y,w,h){
    this.origin = createVector(x, y);
    this.w = w;
    this.h = h;

    this.noiseSeed = random(0, 1000);
    this.noiseValue = 0.0;

    this.image = createGraphics(w,h);
  }


  draw() {
    let c = this.image; //set the drawing context to this image
    c.background(255);

    noiseSeed(this.noiseSeed);

    let angle = noise(this.noiseValue) * TWO_PI;
    let radius = map(noise(this.noiseValue + 99), 0, 1, 0, this.w/2); // displacement

    let offset = p5.Vector.fromAngle(angle).mult(radius);
    // let displaced = p5.Vector.add(this.origin, offset);


    let scale = 0.5;
    c.ellipse(offset.x +  this.w/2, offset.y + this.h/2, this.w * scale, this.h * scale);
    this.noiseValue += 0.01;
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }



function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}