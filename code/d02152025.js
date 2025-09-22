// let time = 12;
const TILT = 0.40910517666747087;

let lat, long;
let declination, hourAngle;

let polLoc; //political location
let day = 0, hour = 0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  // createCanvas(300, 300);

  getLocation();
}

function draw(){
  background(0);

  // info();

  if(lat == undefined || long == undefined){
    // text("loading...", width/2, height/2);
  }  else {
    // info();
    drawAllPaths();

    drawCyclePoint(day, hour); 

    drawHorizon();

    hour+= 1/6;
    if(hour > 24){
      hour = 0;
      day+=10;
    } 

    if(day > 365){
      day = 0;
    }

  }
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 365, {units: 'frames'});
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}


function info(){
  fill(255);
  noStroke();
  rect(0, 0, width, 20);
  fill(0);
  // text(day + " "  + hour, 10, 10);
  // text(`long; ${long} lat: ${lat}`, 10, 20);

  if(polLoc){
    text(polLoc, 10, 10);
  }

  print("here");
}

function calcPosition(day, hour){
  let b = radians((360 / 365) * (day - 81)); // Earth's orbital position correction
  let eot = 9.87 * sin(2 * b) - 7.53 * cos(b) - 1.5 * sin(b); // Equation of Time

  //update vars for calculations

  // declination = TILT * sin((TWO_PI / 365) * (day + 10));  //declination angle depends on the day of the year and the Earth's tilt
  //above is off, here is the o3 explanation why...
  //With this formula, on day 81 (around March 22) the declination is zero, which is what you expect for the equinox. Your version, using (day + 10), shifts the cycle so that when it’s February (say, day 42), the declination ends up positive (around 18° in your calculation), making the sun appear much higher than it should be for winter.
  declination = TILT * sin((TWO_PI / 365) * (day - 81)); //this is right

  // Adjust hourAngle using EoT (correction in minutes converted to degrees)
  let timeCorrection = eot / 4.0; // EoT in minutes, convert to degrees

  hourAngle = radians(15 * (hour - 12) + timeCorrection);

  let pos = {}; //clears the psoitoins

  pos.x = calcX();
  pos.y = calcY();

  return pos;
}

//3o reasoning
function calcX(){
  // First, compute the sun's elevation angle
  let elevation = asin(
    sin(radians(lat)) * sin(declination) +
    cos(radians(lat)) * cos(declination) * cos(hourAngle)
  );

  // Then compute the azimuth using the correct formula
  let cosAz = (sin(declination) - sin(radians(lat)) * sin(elevation)) /
    (cos(radians(lat)) * cos(elevation));

  // Due to precision issues, ensure cosAz is in [-1, 1]
  cosAz = constrain(cosAz, -1, 1);

  let azimuth = acos(cosAz);

  // Adjust the azimuth based on the sign of sin(hourAngle)
  // (Note: some sources adjust based on sin(azimuth) or use atan2 instead)
  if (sin(hourAngle) > 0) {
    azimuth = TWO_PI - azimuth;
  }

  return map(azimuth, 0, TWO_PI, 0, width); // Map azimuth to screen width
}

function calcY(){
  //caclulate the y position of the sun
  let elevation = asin(
    sin(radians(lat)) * sin(declination) +
    cos(radians(lat)) * cos(declination) * cos(hourAngle)
  );

  return map(elevation, -PI / 2, PI / 2, height * 0.8, height * 0.2); // Higher Sun = higher y value
}

async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos)=> {
      lat = pos.coords.latitude;
      long = pos.coords.longitude;

    }).toFixed(7);
  } else {
    console.log("no navigator so santa claus");
    lat = 28.4193608
    long = -81.5812633
    updateLocationInfo(lat, long);
  }
}

function drawAllPaths(){
  //draw horizion
  // stroke(200);
  // line(0, height * 0.8, width, height * 0.8);

  fill(253, 184, 19, 100);
  stroke(253, 184, 19, 100);


  for(let hour = 0; hour < 24; hour += 1/6){
    for(let day = 0; day < 365; day+=10){

      let pos = calcPosition(day, hour);
      ellipse(pos.x, pos.y, 1, 1);
    }
  }

}

function drawNow(){
  const now = new Date();
  // Get start of the year
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  // Compute the day number (1-based, meaning Jan 1st is 1)
  const day = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  // Compute the hour with fractional minutes
  const hour = now.getHours() + now.getMinutes() / 60;

  
  for(let i = 0; i < 24; i += 1){
    let pos = calcPosition(day, i);
    fill(0);
    stroke(0);
    ellipse(pos.x, pos.y, 10, 10);
  }

  //de

 }

function drawHorizon() {
  let horizonY = map(0, -PI / 2, PI / 2, height * 0.8, height * 0.2);
  stroke(0);
  strokeWeight(2);
  fill(0);
  rect(0, horizonY, width, height/2);
}

function drawCyclePoint(day, hour){
  let pos = calcPosition(day, hour);

  fill( 253, 184, 19 );
  stroke( 253, 184, 19 );
  ellipse(pos.x, pos.y, 2, 2);
 
}