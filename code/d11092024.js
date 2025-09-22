let offset;
let margin = 0;
let rowHeight = 100;
let rows = [];

function setup(){
  // createCanvas(windowWidth, windowHeight);
  createCanvas(800, 800);

  let containerWidth = width;
  let containerHeight = height;

  let numRows = floor(containerHeight/rowHeight);
  rowHeight = height/numRows; //make it exact!

  let numLines = 10;
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

}

function draw(){
  background(255);
  //rect(0 + margin, 0, 800, 100);
  for(let h = 0; h < rows.length; h++){
    let row = rows[h];

    for(let i = 0; i < row.length; i++){
      l = row[i];
      l.x += l.speed * l.direction;
      stroke("red");
      line(l.origin, l.y, l.origin, l.y+rowHeight);
      // strokeWeight(3);
      // stroke(l.color);
      noStroke();
      fill(l.color);
      
      let w = l.origin - l.x;
      // quad(l.x, l.y, l.x, l.y + rowHeight, l.origin, l.y + rowHeight, l.origin, l.y); 
      quad(l.x, l.y, l.x, l.y + rowHeight, l.origin + w, l.y + rowHeight, l.origin + w, l.y);
      // rect(l.x, l.y, w, rowHeight); 
      
     
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
    // let last = row[row.length - 1];
    // fill(row[0].color);
  }
}
 
// function mousePressed(){
//   saveGif("d11072024", 10);
// }

function randomColor(){
  return color(random(255), random(255), random(255));
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', floor(random(3, 8)));
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}