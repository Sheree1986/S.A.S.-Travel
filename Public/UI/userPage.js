  // ======admin carousel======

let carousel = document.querySelector(".carousel");
let back = document.querySelector(".back");
let next = document.querySelector(".next");
let current = 0;
let cellCount = 6;

const rotateCarousel = () => {
  const angle = (current / cellCount) * -360;
  carousel.style.transform = "translateZ(-288px) rotateY(" + angle + "deg)";
  carousel.style.transition = "all 0.75s ease-in-out";
};

back.addEventListener("click", () => {
  current--;
  rotateCarousel();
});

next.addEventListener("click", () => {
  current++;
  rotateCarousel();
});

// ====end admin carousel======
// *******************************************
  // =========user carousel========
const $ = (str) => document.querySelector(str);
const $$ = (str) => document.querySelectorAll(str);

(function () {
  if (!window.app) {
    window.app = {};
  }
  app.carousel = {
    removeClass: function (el, classname = "") {
      if (el) {
        if (classname === "") {
          el.className = "";
        } else {
          el.classList.remove(classname);
        }
        return el;
      }
      return;
    },
    reorder: function () {
      let childcnt = $("#carousel").children.length;
      let childs = $("#carousel").children;

      for (let j = 0; j < childcnt; j++) {
        childs[j].dataset.pos = j;
      }
    },
    move: function (el) {
      let selected = el;

      if (typeof el === "string") {
        console.log(`got string: ${el}`);
        selected =
          el == "next"
            ? $(".selected").nextElementSibling
            : $(".selected").previousElementSibling;
        console.dir(selected);
      }

      let curpos = parseInt(app.selected.dataset.pos);
      let tgtpos = parseInt(selected.dataset.pos);

      let cnt = curpos - tgtpos;
      let dir = cnt < 0 ? -1 : 1;
      let shift = Math.abs(cnt);

      for (let i = 0; i < shift; i++) {
        let el =
          dir == -1
            ? $("#carousel").firstElementChild
            : $("#carousel").lastElementChild;

        if (dir == -1) {
          el.dataset.pos = $("#carousel").children.length;
          $("#carousel").append(el);
        } else {
          el.dataset.pos = 0;
          $("#carousel").prepend(el);
        }

        app.carousel.reorder();
      }

      app.selected = selected;
      let next = selected.nextElementSibling; // ? selected.nextElementSibling : selected.parentElement.firstElementChild;
      var prev = selected.previousElementSibling; // ? selected.previousElementSibling : selected.parentElement.lastElementChild;
      var prevSecond = prev
        ? prev.previousElementSibling
        : selected.parentElement.lastElementChild;
      var nextSecond = next
        ? next.nextElementSibling
        : selected.parentElement.firstElementChild;

      selected.className = "";
      selected.classList.add("selected");

      app.carousel.removeClass(prev).classList.add("prev");
      app.carousel.removeClass(next).classList.add("next");

      app.carousel.removeClass(nextSecond).classList.add("nextRightSecond");
      app.carousel.removeClass(prevSecond).classList.add("prevLeftSecond");

      app.carousel.nextAll(nextSecond).forEach((item) => {
        item.className = "";
        item.classList.add("hideRight");
      });
      app.carousel.prevAll(prevSecond).forEach((item) => {
        item.className = "";
        item.classList.add("hideLeft");
      });
    },
    nextAll: function (el) {
      let els = [];

      if (el) {
        while ((el = el.nextElementSibling)) {
          els.push(el);
        }
      }

      return els;
    },
    prevAll: function (el) {
      let els = [];

      if (el) {
        while ((el = el.previousElementSibling)) {
          els.push(el);
        }
      }

      return els;
    },
    keypress: function (e) {
      switch (e.which) {
        case 37: // left
          app.carousel.move("prev");
          break;

        case 39: // right
          app.carousel.move("next");
          break;

        default:
          return;
      }
      e.preventDefault();
      return false;
    },
    select: function (e) {
      console.log(`select: ${e}`);
      let tgt = e.target;
      while (!tgt.parentElement.classList.contains("carousel")) {
        tgt = tgt.parentElement;
      }

      app.carousel.move(tgt);
    },
    previous: function (e) {
      app.carousel.move("prev");
    },
    next: function (e) {
      app.carousel.move("next");
    },
    doDown: function (e) {
      console.log(`down: ${e.x}`);
      app.carousel.state.downX = e.x;
    },
    doUp: function (e) {
      console.log(`up: ${e.x}`);
      let direction = 0,
        velocity = 0;

      if (app.carousel.state.downX) {
        direction = app.carousel.state.downX > e.x ? -1 : 1;
        velocity = app.carousel.state.downX - e.x;

        if (Math.abs(app.carousel.state.downX - e.x) < 10) {
          app.carousel.select(e);
          return false;
        }
        if (direction === -1) {
          app.carousel.move("next");
        } else {
          app.carousel.move("prev");
        }
        app.carousel.state.downX = 0;
      }
    },
    init: function () {
      document.addEventListener("keydown", app.carousel.keypress);
      // $('#carousel').addEventListener("click", app.carousel.select, true);
      $("#carousel").addEventListener("mousedown", app.carousel.doDown);
      $("#carousel").addEventListener("touchstart", app.carousel.doDown);
      $("#carousel").addEventListener("mouseup", app.carousel.doUp);
      $("#carousel").addEventListener("touchend", app.carousel.doup);

      app.carousel.reorder();
      $("#prev").addEventListener("click", app.carousel.previous);
      $("#next").addEventListener("click", app.carousel.next);
      app.selected = $(".selected");
    },
    state: {},
  };
  app.carousel.init();
})();
// =========end user carousel========



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

    

// ============end form user create post=====
    




// ====create div on img click====
// -----define variables------
// targeting all img
let img = document.querySelectorAll("img")//[img.getAttribute("src")]; --target selected img src ???
let parent = document.querySelector(".show-content");
let newDiv = document.createElement("div");
let divImg = document.createElement("div");
let divContent = document.createElement("div");
let update = document.createElement("div");
// loop thru all imgs// create new div with different img clicked
img.forEach((img) => {
  // addevents listeners to all imgs/
  img.addEventListener("mouseover", () => {
    //add new created div inside parent container
    parent.appendChild(newDiv);
    //add new div to display img inside newDiv
    newDiv.appendChild(divImg);
    //add new div to display text description inside newDiv
    newDiv.appendChild(divContent);
    
   
    // console.log("add");
    // add class to new div
    newDiv.classList.add("img-box-description");
    //add class to divImg
    divImg.classList.add("div-img")
     //add class to divContent
     divContent.classList.add("div-content")
     
  });
  // return newDiv[i];
});
// close div
parent.addEventListener("mouseout", ()=> {
  newDiv.classList.remove("img-box-description", "parent")
})
// ========end create div on img click===========


//********************** */
//==TESTING ADDING DYNAMICALLY NEW USER IMG ON CAROUSEL
  //define where to add img from arr
let imgPush = document.querySelector(".hideRight")
let btn = document.querySelector("#create_post")
btn.addEventListener("click", () => {

//define arr
let testArr = ["../UI/img2"]
for (let i = 0; i < testArr.length; i++) {

  imgPush.appendChild(testArr[i])
}
})
