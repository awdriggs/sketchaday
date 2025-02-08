let el = document.querySelector("#ani");

let baseword = "thinking"
let count = 0;

//
var interval = setInterval(ellipsis, 500, el, baseword);

// clearInterval(refreshIntervalId);

function ellipsis(element, base) {
  let text = baseword;

  for(let i = 0; i < count; i++){
    text+="."
  }

  if(count == 3){
    count = 0;
  } else {
    count++;
  }

  element.innerText = text;
  document.title = text; //haha
}

 


