

  const img = document.querySelector("img");
img.addEventListener("click", e => {
 
  console.log(e)
});
// target img
const myImg = document.querySelector("img");
// choose where to display new created div when clicked on img
const divContainer = document.querySelector("section")
// listen for click //AddNew -->function
myImg.addEventListener("click", AddNew)
// define AddNew function
function AddNew() {
    // create new div
    const newDiv = document.createElement("div")
    // test in console
    console.log('add new')
    //add class to new div created
    newDiv.classList.add('img-box')
    // append new div to body
    // document.body.appendChild(newDiv)
    // append new div to div container
    divContainer.appendChild(newDiv)
}