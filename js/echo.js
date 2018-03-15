/* navigation show/hide variables */
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('nav').outerHeight();
/* end navigation show/hide variables */


$(window).scroll(function() {
  parallax();
})

function parallax() {
  var wScroll = $(window).scrollTop();
  $('.parallax-bg').css('background-position', 'center ' + (wScroll * -0.5) + 'px')
}

/* navigation show/hide */
var didScroll;
// on scroll, let the interval function know the user has scrolled
$(window).scroll(function (event) {
  didScroll = true;
});

//doesn't run all the time
setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
  if (Math.abs(lastScrollTop - st) <= delta) {
    return;
  }
  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('nav').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('nav').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;  
}
/* end navigation show/hide */
