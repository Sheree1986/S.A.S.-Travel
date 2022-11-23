// show form
document.querySelector("#show-login").addEventListener("click", function(){
    document.querySelector("form").classList.add("active");
});

// close form
document.querySelector("form .close-btn").addEventListener("click", function(){
    document.querySelector("form").classList.remove("active");
});