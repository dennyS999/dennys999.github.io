// add classes for mobile navigation toggling
var CSbody = document.querySelector('body');
const CSnavbarMenu = document.querySelector('#cs-navigation');
const CShamburgerMenu = document.querySelector('#cs-navigation .cs-toggle');

CShamburgerMenu.addEventListener('click', function () {
	CShamburgerMenu.classList.toggle('cs-active');
	CSnavbarMenu.classList.toggle('cs-active');
	CSbody.classList.toggle('cs-open');
	// run the function to check the aria-expanded value
	ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not
function ariaExpanded() {
	const csUL = document.querySelector('#cs-expanded');
	const csExpanded = csUL.getAttribute('aria-expanded');

	if (csExpanded === 'false') {
		csUL.setAttribute('aria-expanded', 'true');
	} else {
		csUL.setAttribute('aria-expanded', 'false');
	}
}

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
for (const item of dropDowns) {
	const onClick = () => {
		item.classList.toggle('cs-active');
	};
	item.addEventListener('click', onClick);
}


document.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled');
	}
})

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
        

function initComparisons() {
	var x, i;
	/* Find all elements with an "overlay" class: */
	x = document.getElementsByClassName("img-comp-overlay");
	for (i = 0; i < x.length; i++) {
	  /* Once for each "overlay" element:
	  pass the "overlay" element as a parameter when executing the compareImages function: */
	  compareImages(x[i]);
	}
	function compareImages(img) {
	  var slider, img, clicked = 0, w, h;
	  /* Get the width and height of the img element */
	  w = img.offsetWidth;
	  h = img.offsetHeight;
	  /* Set the width of the img element to 50%: */
	  img.style.width = (w / 2) + "px";
	  /* Create slider: */
	  slider = document.createElement("DIV");
	  slider.setAttribute("class", "img-comp-slider");
	  /* Insert slider */
	  img.parentElement.insertBefore(slider, img);
	  /* Position the slider in the middle: */
	  slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
	  slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
	  /* Execute a function when the mouse button is pressed: */
	  slider.addEventListener("mousedown", slideReady);
	  /* And another function when the mouse button is released: */
	  window.addEventListener("mouseup", slideFinish);
	  /* Or touched (for touch screens: */
	  slider.addEventListener("touchstart", slideReady);
	   /* And released (for touch screens: */
	  window.addEventListener("touchend", slideFinish);
	  function slideReady(e) {
		/* Prevent any other actions that may occur when moving over the image: */
		e.preventDefault();
		/* The slider is now clicked and ready to move: */
		clicked = 1;
		/* Execute a function when the slider is moved: */
		window.addEventListener("mousemove", slideMove);
		window.addEventListener("touchmove", slideMove);
	  }
	  function slideFinish() {
		/* The slider is no longer clicked: */
		clicked = 0;
	  }
	  function slideMove(e) {
		var pos;
		/* If the slider is no longer clicked, exit this function: */
		if (clicked == 0) return false;
		/* Get the cursor's x position: */
		pos = getCursorPos(e)
		/* Prevent the slider from being positioned outside the image: */
		if (pos < 0) pos = 0;
		if (pos > w) pos = w;
		/* Execute a function that will resize the overlay image according to the cursor: */
		slide(pos);
	  }
	  function getCursorPos(e) {
		var a, x = 0;
		e = (e.changedTouches) ? e.changedTouches[0] : e;
		/* Get the x positions of the image: */
		a = img.getBoundingClientRect();
		/* Calculate the cursor's x coordinate, relative to the image: */
		x = e.pageX - a.left;
		/* Consider any page scrolling: */
		x = x - window.pageXOffset;
		return x;
	  }
	  function slide(x) {
		/* Resize the image: */
		img.style.width = x + "px";
		/* Position the slider: */
		slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
	  }
	}
  }