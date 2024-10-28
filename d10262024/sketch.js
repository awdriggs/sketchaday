//average color from the webcame
//force a front facing camera on mobile...for testing
let capture;
let ready = false;

function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);

  //setup the capture
  capture = createCapture(VIDEO, {video:{ facingMode:"environment"}}, ()=>{
    console.log("video ready");
    ready = true;
  });

  capture.hide();
}

function draw() {
  //get average
  
  background(averageColor()); //change the the average color
  // image(capture, 0, 0, 360, 400);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//average
//vars for the r g and b running count
//loop through every pixel in the camera array
//r + = this pixels r value, same for g and b
//divide r value by the number of pixel, floor it
//repeat for other channels
//return the the color value.
function averageColor(){
  if(ready){
    capture.loadPixels();
    // console.log(capture.pixels.length);
    let r = g = b = 0; //weird, but init all variable to 0, chatgpt

    for (let i = 0; i < capture.pixels.length; i += 4) {
      r += capture.pixels[i];     // Red value
      g += capture.pixels[i + 1]; // Green value
      b += capture.pixels[i + 2]; // Blue value
    }

    let numPixels = capture.pixels.length/4;
    console.log(r, g, b);
    return color(r/numPixels, g/numPixels, b/numPixels); 
  } else {
    return color(220);
  }
  // debugger;
  // return c;
}
