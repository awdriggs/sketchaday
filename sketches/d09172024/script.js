console.log("working yo");

let counter = 1;
//when the scrolly gets to the bottom of the page add a new section
let body = document.querySelector('body');

let back = document.querySelector('#up');
up.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });


  //maybe add this to a timeout? calculate how much time it will take to scroll back?
  // let colorSections = document.querySelectorAll('.color-block');

  // colorSections.forEach(function(e) {
  //   e.remove();
  // });

  // counter = 1;
});

window.addEventListener('scroll', function() {
  console.log('Scroll event detected! Scroll Y:', window.scrollY);
  //if the scrollY > a
  if(window.scrollY >= counter * window.innerHeight - 10){
    console.log("add more divs");
    // debugger;

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

