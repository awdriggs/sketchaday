//highlighter overlap

//draw an almost straight horizontal line
let lines = [];
let margin;
let h;
let numLines;
let colors = [];

function setup() {
  createCanvas(800, 800);
  margin = width/10;
  numLines = 10;

  colors = ["#FA3BF099", "#FFED2999", "#1BFC0699", "#30C5FF99", "#FF5C0099", "#8A00C499"];
  reset();

  noFill();
  strokeWeight(h);
  strokeCap(SQUARE);
}

function draw() {
  background(255);

  for(let l of lines){
    stroke(l.color);
    if(l.alive) l.update();
    l.draw();
  }

  // if(lines[lines.length - 1].alive == false && lines[lines.length - 1].y < height - margin){
  //   let y = margin - h/2 + (lines.length) * (h * 0.8);
  //   lines.push(new Line(margin, y, "#FA3BF099", 5));
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

function mousePressed(){
  reset();
}

function reset(){
  lines = [];
  colors = shuffle(colors);

  let colorIndex = 0;

  let breakPoint = random(0.3, 0.7);

  h = (height - 2 * margin) / (numLines * 0.8);

  for(let i = 0; i < numLines; i++){
    if(i > numLines * breakPoint && colorIndex == 0) colorIndex++;
    let y = margin + h / 2 + i * (h * 0.8);
    lines.push(new Line(margin + random(-5, 5), y, colors[colorIndex], random(4, 8)));
  }

}

class Line {
  constructor(sx, sy, c, s){
    this.x = sx; //current sx position
    this.y = sy;
    this.locs = [];
    this.locs.push(createVector(sx, sy));
    this.color = c;
    this.step = s;
    this.alive = true;
  }

  update(){
    this.alive = this.x < width - margin;
    print(this.alive);
    if(this.alive){
      this.x += this.step
      let dice = floor(random(3));
      if(dice == 0){
        this.y += 0.5;
      } else if(dice == 1){
        this.y -= 0.5;
      } //else do nothing
      this.locs.push(createVector(this.x, this.y));
    }
  }

  draw(){
    beginShape();
    for(let l of this.locs){
      vertex(l.y, l.x); //swapped! swapped it back and and some logic next
    }
    endShape();
  }
}

