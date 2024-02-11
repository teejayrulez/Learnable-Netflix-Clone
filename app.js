let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.addEventListener("click", function () {
  menu.classList.toggle("fa-x");
  navbar.classList.toggle(".open");
});
