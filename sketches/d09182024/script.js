console.log("working yo");

let counter = 1;
//when the scrolly gets to the bottom of the page add a new section
let body = document.querySelector('body');

let back = document.querySelector('#up');
up.addEventListener('click', function() {
  let scrollAmount = 100;
  let millis = 50; //

  // Start an interval that runs every 2 seconds (2000 milliseconds)
  const scrolly = setInterval(()=>{
    if(window.pageYOffset > scrollAmount){
      window.scrollBy({
        top: -scrollAmount,
        // behavior: "smooth",
        behavior: "instant"
      });
    } else {
      clearInterval(scrolly);
      let colorSections = document.querySelectorAll('.color-block');

      colorSections.forEach(function(e) {
        e.remove();
      });

      counter = 1;
    }
  }, millis);

  // Stop the interval after 10 seconds (5000 milliseconds)
  // setTimeout(() => {
  //   clearInterval(scrolly); // Stops the interval
  //   console.log('Interval stopped');
  // }, time);
  //maybe add this to a timeout? calculate how much time it will take to scroll back?

});

window.addEventListener('scroll', function() {
  console.log('Scroll event detected! Scroll Y:', window.scrollY);

  //if the scrollY > a
  if(window.scrollY >= counter * window.innerHeight - 10){
    console.log("add more divs");

    let newSection = document.createElement("section");
    newSection.style.backgroundColor = getRandomColor();
    newSection.classList.add("color-block");
    body.append(newSection);

    //increase the coutner by one
    counter++;
  }
});


// thanks chatGPT!
// Function to generate a random color in hexadecimal format
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

 
