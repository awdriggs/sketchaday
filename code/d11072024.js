let offset;
let margin = 0;
let rowHeight = 100;
let rows = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  // createCanvas(300, 300)

  // let containerWidth = 800;
  // let containerHeight = 800;

  let containerWidth = width;
  let containerHeight = height;

  let numRows = floor(containerHeight/rowHeight);
  rowHeight = height/numRows; //make it exact!

  let numLines = 100;
  offset = containerWidth/numLines;

  for(let r = 0; r < numRows; r++){
    let lines = [];
    for(let i = 0; i < numLines; i++){
      lines.push({origin: i * offset + offset/2 + margin, direction: random() > 0.5 ? -1 : 1, color: randomColor()} );
      lines[i].x = lines[i].origin + random(-offset/2, offset/2);
      lines[i].y = r * rowHeight;
      lines[i].speed = random(0.5, 1.5);
    }
    rows.push(lines);
  }
  // print(lines);
}

function draw(){
  background(255);
  //rect(0 + margin, 0, 800, 100);
  for(let h = 0; h < rows.length; h++){
    let row = rows[h];

    for(let i = 0; i < row.length; i++){
      l = row[i];
      l.x += l.speed * l.direction;
      // stroke("red");
      // line(l.origin, l.y, l.origin, l.y+rowHeight);
      // strokeWeight(3);
      // stroke(l.color);
      noStroke();
      fill(l.color);

      // line(l.x, l.y, l.x, l.y+rowHeight);
      if(i == 0){

        // ellipse(l.x, l.y, 200, 200);
        quad(0, rowHeight * h, 0, rowHeight * h + rowHeight, l.x, l.y+rowHeight, l.x, l.y) 
      // } else if(i == row.length -1){

      } else {
        let next = row[i-1];
        let width = next.x - l.x;
        //quad(x1, y1, x2, y2, x3, y3, x4, y4,
        quad(l.x, l.y, l.x, l.y+rowHeight,  next.x, next.y+rowHeight, next.x, next.y);
      }


      if(l.x > l.origin + offset/2){
        l.x = l.origin + offset/2;
        l.speed = random(0.5, 1.5);
        l.direction*=-1;
      } else if(l.x < l.origin - offset/2){
        l.x = l.origin - offset/2;
        l.speed = random(0.5, 1.5);
        l.direction*=-1;
      }
    }
    //end of screen to last line of row
    let last = row[row.length - 1];
    fill(row[0].color);
    quad(last.x, last.y, last.x, last.y+rowHeight, width, last.y+rowHeight, width, last.y);
  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


function randomColor(){
  return color(random(255), random(255), random(255));
}