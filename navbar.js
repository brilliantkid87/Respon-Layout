// const hamburgerMenu = document.querySelector('.hamburger-menu');
// const dropdownMenu = document.querySelector('.dropdown-menu');

// hamburgerMenu.addEventListener('click', function() {
//   hamburgerMenu.classList.toggle('open');
//   dropdownMenu.classList.toggle('open');
// });

let humbergerIsOpen = false;
function openHumberger() {
  let humbergerNavContainer = document.getElementById("humberger-nav-container")
  if(!humbergerIsOpen) {
    humbergerNavContainer.style.display = "block";
    humbergerIsOpen = true;
  } else {
    humbergerNavContainer.style.display = "none";
    humbergerIsOpen = false;
  }
}