let w = 200, h = 700, margin = 50;
let cells = [];
let types = [];

function setup() {
  createCanvas(800, 800);
  noStroke();

  // Create a slider and place it at the top of the canvas.
  // slider = createSlider(0, 255);
  // slider.position(10, 10);
  // slider.size(80);

  types[0] = new Type("red", 10, 16);
  types[1] = new Type("green", 6, 12);
  types[2] = new Type("blue", 14, 20);

  print(types);

  for(let i = 0; i < 3; i++){
    cells.push(new Box(margin + w * i + margin * i, height/2 - h/2, w, h, types[i]));
  }

}

function draw() {
  background(0);
  for(let c of cells){
    c.draw();
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


class Box {
  constructor(x, y, w, h, type){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
    this.state = random(0, 20);
    print(this.state);
    this.speed = random(0.1, 0.5);
    this.dir = random() > 0.5 ? 1 : -1;
  }

  draw(){
    this.updateState();
    this.setFill();

    rect(this.x,this.y,this.w,this.h);
  }

  setFill(){
    if(this.type.label == "red"){
      fill(this.state, 0, 0);
    } else if(this.type.label == "green"){
      fill(0, this.state, 0);
    } else if(this.type.label == "blue") {
      fill(0, 0, this.state);
    }
  }

  updateState(){
    this.state += this.dir * this.speed;
    // print(this.type.label, this.state);
    // if (this.state < this.type.min || this.state > this.type.max) {
    //   this.dir *= -1; // Reverse the direction

    //   this.state = this.state < this.type.min ? this.type.min : this.type.max; // Clamp the state

    //   if(this.state == this.type.min){
    //     this.speed = random(0.1, 0.5);
    //     this.type = types[floor(random(0, 3))];
    //     print(this.type);
    //     this.state = this.type.min;
    //   }
    // }

    //upper bounds, switch dir
    if(this.state > this.type.max){
      this.state = this.type.max;
      this.dir = -1;
    } else if(this.state < this.type.min){
      //lower bounds, new type
      this.type = types[floor(random(0, 3))];
      this.state = this.type.min;
      this.dir = 1;
      this.speed = random(0.1, 0.5);
      print("new type");
    }
  }
}

class Type {
  constructor(label, min, max){
    this.label = label;
    this.min = min;
    this.max = max;
  }
}