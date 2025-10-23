let sliders = [];

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);

  makeStacks();

  noStroke();
}

function draw() {
  background(255, 0, 0);

  for(let slider of sliders){
    slider.draw();
    slider.drift();
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

function makeStacks(){
  //num of stacks
  //stack width
  //number in stack
  //voffset
  //

  let numRows = 15;
  let h = (height * 0.8)/numRows/2; 

  let w;
  for(let x = width/10; x < width - width/10; x += w){
    w = random(width/10, width/3);

    if(x + w > width - width/10){
      w = (width - width/10) - x; //remaining distance
    }

    let dir = random() > 0.5 ? 1 : -1;
    let speed = random(0.005, 0.01);
    
    print(h);
     

    for(let y = height/10; y < height - height/10 - h; y += 2 * h){
      sliders.push(new Slider(x, y, w, h, "red", "black", 0.75, dir, speed));
    }

    console.log(w);
  }

  console.log('exit');
}

class Slider {
  constructor(x,y, w, h, c1, c2, centerX, dir, speed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c1 = c1;
    this.c2 = c2;
    this.cx = centerX; //will be a float between 0 and 1
    this.dir = dir;
    this.speed = speed;
  }

  draw(){
    //left hand, x,y to center
    fill(this.c1);

    let w1 = this.cx * this.w;
    let w2 = this.w - w1;
    // console.log(this.cx)
    // console.log(this.w, w1, w2)
    rect(this.x, this.y, w1, this.h);

    fill(this.c2);
    //right hand, center to width
    rect(this.x + w1, this.y, w2, this.h);
  }

  drift(){
    this.cx += this.speed * this.dir;

    if(this.cx < 0){
      this.cx = 0;
      this.dir *= -1; //bounce
    } else if(this.cx > 1){
      this.cx = 1;
      this.dir *= -1; //bounce
    }
  }
}

