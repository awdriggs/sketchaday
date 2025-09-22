let divisions = [];

function setup() {
  createCanvas(800, 800);

  divisions.push(new Division(0, 0, width));

}

function draw() {
  background(255);

  for(let i = 0; i <divisions.length; i++){

    divisions[i].show();
  }
}

function mousePressed() {
  //backwards transverse
  console.log("click");


  for(let i = divisions.length - 1; i >= 0; i--){
    print(i);
    divisions[i].clicked(mouseX, mouseY);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

class Division {
  constructor(x,y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.canDivide = true;
  }

  show(){
    rect(this.x,this.y,this.size,this.size);
  }

  fragment(){
    if(this.canDivide && this.size > 10){
      let x, y, size;
      size = this.size/2;
      //for loop
      for(let i = 0; i < 2; i++){
        console.log("i", i);
        for(let j = 0; j < 2; j++){
          console.log("j", j);
          x = this.x + size * i;
          y = this.y + size * j;
          divisions.push(new Division(x,y,size));
          // let y = this.y + this.size/2 - size/2;
        }
      }

      this.canDivide = false;
    }
  }

  clicked(mx, my){
    console.log("testing click");
    if(mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size){
      console.log("clicked");
      this.fragment();
    }
  }
}