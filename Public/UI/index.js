console.log("this js file is linked");
// show form login
document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector("#form-login").classList.add("active");
});

// close form login
document
  .querySelector("#form-login .close-btn")
  .addEventListener("click", function () {
    document.querySelector("#form-login").classList.remove("active");
  });

// ========form register======
// show form register
document.querySelector("#show-register").addEventListener("click", function () {
  document.querySelector("#form-register").classList.add("active1");
});

// close form register
document
  .querySelector("#form-register .close-btn")

  .addEventListener("click", function () {
    document.querySelector("#form-register").classList.remove("active1");
  });
// ========end form-register================================================

// ============form-create user post=======
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


