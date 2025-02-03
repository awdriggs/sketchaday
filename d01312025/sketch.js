// genuary day 31!
// last day, pixel sorting


//something not working quite right but whatever

let img;
let sorted;
let capture;

function preload() {
  img = loadImage('sheep.jpg');

  // image(img, 0, 0);

}

function setup() {
  createCanvas(800, 800);

  // sorted = createImage(img.w
  // createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(800, 800);
  // capture.size(360, 200);
  capture.hide();

  //load webcam
  //sort the pixels
  //if the pixel is more red, send it to the red array
  //if the pixel is more green, send it to the green array
  //if the pixel is more blue, send it to the blue array
  // sorted = createImage(img.width, img.height);
  sorted = createImage(capture.width, capture.height);
  sorted.loadPixels();
  // Load the image's pixels.
  // img.loadPixels();
  // sortPixels();

  // noLoop();
}

function draw() {
  background(255);

  sortPixels(capture);
  image(sorted, 0, 0);

  //display the pixels, left to right top to bottom
  //shove the three arrays back together?
  //red pixels
  //blue pixels
  //green pixels

  //display a new image
}

function sortPixels(img) {
  let whiteArray = [];
  let redArray = [];
  let greenArray = [];
  let blueArray = [];
  // image(img, 0, 0, width, height);

  img.loadPixels();
  let count = 0;
  for(let i = 0; i < img.pixels.length; i+=4){
    // count++;
    let r = img.pixels[i];
    let g = img.pixels[i+1];
    let b = img.pixels[i+2];
    let a = img.pixels[i+3];

    // debugger;
    // let thisPixel = ;
    if(r == 255 && g == 255 && b == 255){
      whiteArray.push(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
    } else if(r >= g && r >= b){
      redArray.push(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      // console.log("red high");
    } else if(g > r && g >= b){
      greenArray.push(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      // console.log("green high");
    } else {
      blueArray.push(img.pixels[i], img.pixels[i+1], img.pixels[i+2], img.pixels[i+3]);
      // console.log("blue high");
    }

  }

  // console.log("count", count);



  let allPixels = [...whiteArray, ...redArray, ...greenArray, ...blueArray];
  console.log("all pixles length", allPixels);

  for(let i = 0; i < allPixels.length; i++){
    sorted.pixels[i] = allPixels[i];
  }
  // // console.log(combinedArray);
  sorted.updatePixels();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
