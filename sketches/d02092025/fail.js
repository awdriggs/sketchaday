let TILT;
let hourAngle;

let count = 0; //in minutes
let day = 1;

let long = 0, lat = 0;
// minutes in a year 525600
getLocation();


console.log("working bro");
function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  TILT = radians(23.44);
}

function draw() {
  // background(255, 10);
  let hour = floor(count/60) % 24;
  // hourAngle = (hour - 12) - PI/12;
  hourAngle = radians(15 * (hour - 12));

  let declination = TILT * sin((TWO_PI / 365) * (day + 10));
  let elevation = asin(sin(lat) * sin(declination) + cos(lat) * cos(declination) * cos(hourAngle));
  let azimuth = acos((sin(elevation) * sin(lat) - sin(declination)) / (cos(elevation) * cos(lat)));

  if (hourAngle > 0) azimuth = TWO_PI - azimuth;

  // let years = 525600 - count % 525600;

  fill(255);
  rect(0, 0, 400, 200);
  fill(0);

  text("longitude: " + long, 50, 20);
  text("latitude: " + lat, 50, 40);
  text("hour: " + hour, 50, 60);
  text("days: " + day, 50, 80);


  let x = map(azimuth, 0, TWO_PI, 0, width); // Azimuth should go across the screen
  let y = map(elevation, -PI/2, PI/2, height, 0); // Elevation should go bottom to top

  console.log(x, y);

  fill("yellow");
  ellipse(x, y, 20, 20);

  count+= 20;

  if(count > 1440){
    count = 0; //reset each day
    day++;
    if(day > 365){
      day = 1;
    }
  }

  //reset
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
  if(key == "g"){
    saveGif('thumb', 5);
  } else if(key == "p"){
    saveCanvas('thumb', "jpg");
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((p) => {
      // debugger;
      latitude = p.coords.latitude;
      longitude = p.coords.longitude;

    });
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


