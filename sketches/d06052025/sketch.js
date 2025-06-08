let origin;
let worms = [];
let numWorms = 100;
let angle = 0.001;

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  // origin = createVector(width/2, height/2); //center point
  origin = createVector(0, 0); //center point

  //test data worm drawing
  // for(let i = 0; i < 10; i++){
  //   let x = random(100, width - 100);
  //   let y = random(100, height - 100);

  //   worm.push(createVector(x, y));
  // }
  for(let i = 0; i < numWorms; i++){

    let worm = generateWormPath();

    worms.push(worm);
  }

  // fill(0, 255, 0);
  noFill();


}

function draw() {

  background(255);
  push();
  translate(width/2, height/2);
  rotate(angle);
  for(let worm of worms){
    beginShape(); //starts the line
    for(let p of worm){
      p.rotate(angle);
      vertex(p.x, p.y);
    }
    endShape(OPEN);
  }

  pop();

  // angle += 0.001;

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


function generateWormPath(){
  let path = [];
  let wormLength = 100;

  let angle = random(0, TWO_PI);

  //direction from random angle
  let dir = p5.Vector.fromAngle(angle);



  //start at center

  for(let i = 0; i < wormLength; i++){

    if(i == 0){
      path.push(origin); //start at the middle of the canvas
    } else {
      let lastPoint = path[i-1];
      let newDir = dir.copy(); //copies the vecotr
      newDir.rotate(random(-PI/2, PI/2)) //rotates the vector by a random small amoutn
      newDir.setMag(5);
      let newPoint = p5.Vector.add(lastPoint, newDir);
      path.push(newPoint);
    }
    //move some distance in direction
    //add a point to the path
    //move direction by a random amount

  }


  return path;
}
