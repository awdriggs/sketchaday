//genuary day 28
//infinite scroll

let count = 0;

function setup() {
  print(windowHeight);
  createCanvas(windowWidth, windowHeight * 10);
  // createCanvas(windowWidth, windowHeight);

  strokeWeight(10);
  
}

function draw() {
  background(255, 100);

  // for(let i = 0; i<count; i++){
  //   line
  // }

  line(0, window.scrollY + windowHeight/2, width, window.scrollY + windowHeight/2);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


onscroll = (event) => {
  //play a sound?
    console.log(window.scrollY);
    if(window.scrollY > height * 0.75){
      // window.scrollY = 0;
      window.scrollTo(0, 0);
      console.log("reset");
      count++;
    }
};
