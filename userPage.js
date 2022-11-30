  
  
// =========carousels=======
// admin
let swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
 

  },
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,

  },
 
});
// user
let swiper1 = new Swiper(".mySwiper1", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  loop: true,
  autoplay: {
    delay: 500,
    disableOnInteraction: false,
  
  },
});


// ============form-create user post=======
// show form login
document.querySelector("#create_post").addEventListener("click", function () {
  document.querySelector("#form-create").classList.add("active2");
});

// close form create user post
document
  .querySelector("#form-create .close-btn")
  .addEventListener("click", function () {
    document.querySelector("#form-create").classList.remove("active2");
  });
console.log("it's connected333");


// btn dissapear on click
        document.querySelector("#create_post").addEventListener("click", function() {
            document.querySelector("#create_post").classList.add("dissapear")
    })

    // btn appear when form is closed

    document
    .querySelector("#form-create .close-btn")
    .addEventListener("click", function () {
      document.querySelector("#create_post").classList.remove("dissapear");
    });


    // ==========show the swiper-slide===========



// const img = document.querySelector(" img");
// img.addEventListener("click", e => {
//   console.log(e)
//   console.log('test clicked')
// });

const myImg = document.querySelector(".swiper-slide")

// listen for click //AddNew -->function
myImg.addEventListener("click", AddNew)
// define AddNew function
function AddNew() {
    // create new div
    const newDiv = document.createElement("div")
    // test in console
    console.log('add new')
    //add class to new div created
    // newDiv.classList.add('img-box')
    // append new div to body
    document.body.appendChild(newDiv)
    // append new div to div container
    // divContainer.appendChild(newDiv)
}