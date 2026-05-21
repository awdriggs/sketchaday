let squares = []
let test;
let weight = 5

function setup() {
  createCanvas(800, 800);
  // createCanvas(windowWidth, windowHeight);
  
  let margin = width/10;
  let h = height * (2/3);
  let w = width * (2/3);


  squares.push(new Square(margin, height - h - margin, w, h, 0));
  squares.push(new Square(width - w - margin, margin, w, h, 0));

  strokeWeight(weight);
  // strokeCap(SQUARE);

  noFill();
}

function draw() {
  background(255);
  // for(let s of squares){
  //   s.draw();
  // }
  squares[0].draw();
  squares[1].draw();

  for(let i = 0; i < squares[0].points.length; i++){
    print("b") 
    line(squares[0].points[i].loc.x, squares[0].points[i].loc.y, squares[1].points[i].loc.x, squares[1].points[i].loc.y);
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

class Square {
  constructor(cornerX, cornerY, w, h, a){
    this.x = cornerX;
    this.y = cornerY;
    this.w = w;
    this.h = h;

    //build the points
    this.points = [];
    this.points.push(new Point(this.x + 0.25 * w, this.y +  0.25 * h, w/4, a, random(0.005, 0.02)));
    this.points.push(new Point(this.x + 0.75 * w, this.y +  0.25 * h, w/4, a, random(0.005, 0.02)));
    this.points.push(new Point(this.x + 0.75 * w, this.y +  0.75 * h, w/4, a, random(0.005, 0.02)));
    this.points.push(new Point(this.x + 0.25 * w, this.y +  0.75 * h, w/4, a, random(0.005, 0.02)));
  }

  draw(){
    beginShape();
    for(let p of this.points){
      p.spin();
      // p.draw();
      vertex(p.loc.x, p.loc.y);
    }
    endShape(CLOSE);
  }


}



class Point {
  constructor(cx, cy, radius, angle, speed){
    this.center = createVector(cx, cy);
    this.radius = radius;
    this.angle = angle;
    this.speed = speed;
    this.dir = random() > 0.5 ? 1 : -1;

    this.loc = createVector(this.center.x + cos(this.angle) * this.radius, this.center.y + sin(this.angle) * this.radius); //location for the end of the point
  }

  

  draw(){
    // ellipse(this.center.x, this.center.y, this.radius * 2, this.radius * 2);
    ellipse(this.center.x + cos(this.angle) * this.radius, this.center.y + sin(this.angle) * this.radius, weight, weight);
  }

  spin(){
    this.angle += this.speed * this.dir;
    this.loc.x = this.center.x + cos(this.angle) * this.radius;
    this.loc.y = this.center.y + sin(this.angle) * this.radius;
  }


}
