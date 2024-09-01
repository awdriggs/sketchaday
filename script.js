sketches.sort(); //sort sketches in palce
sketches.reverse(); //show most recent first
let asc = false;
buildList();

//add event listeners to asc, desc, and random
// document.querySelector("#asc").addEventListener("click", function(){
document.querySelector(".buttons").addEventListener("click", (event) => {
  // debugger;
  if(event.target.id == "asc" && asc == false){
    console.log("sort asc");
    sketches.sort();
    asc = true;
    buildList();
  } else if(event.target.id == "dsc" && asc == true){
    console.log("sort dsc");
    sketches.reverse();
    asc = false;
    buildList();
  } else if(event.target.id == "rand"){
    //select a random item from the array
    //redrect to that array
    let index = Math.floor(Math.random() * sketches.length);
    console.log(index);
    let item = sketches[index] 
    let url = './' + item + '/index.html';
    window.location.href = url;
  }
});

function buildList() {
//build the list
 console.log("building the list");
 //grab sketch list node
  let ul = document.querySelector('.sketch-list');
  ul.innerHTML = "";
//for each item in the data array
  for(let item of sketches){
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = './' + item + '/index.html';
    a.innerHTML = item;
    li.append(a);
    ul.append(li);
  }     

//build a list item
//build a link with url, build the url './'+item+'/index.html"
//use the name for the inner text link
//append to list itme node
//append list to ul node


}
//sort
//clear the sketch-list
//sort the list, asc or desc
//rebuild the list

//random
//choose a random item from the sketch-item node
//redirect to that url


