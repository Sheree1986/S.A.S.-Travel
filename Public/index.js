// show form login
document.querySelector("#show-login").addEventListener("click", function(){
    document.querySelector("#form-login").classList.add("active");
});

// close form login
document.querySelector("#form-login .close-btn").addEventListener("click", function(){
    document.querySelector("#form-login").classList.remove("active");
});


// ========form register======
// show form register
document.querySelector("#show-register").addEventListener("click", function(){
    document.querySelector("#form-register").classList.add("active1");
});

// close form register
document.querySelector("#form-register .close-btn").addEventListener("click", function(){
    document.querySelector("#form-register").classList.remove("active1");
});