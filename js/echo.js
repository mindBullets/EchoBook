/* navigation show/hide variables */
var didScroll;
var lastScrollTop = 0;
var delta = 5; //pixels
var navbarHeight = $('header').outerHeight();
/* end navigation show/hide variables */

/* header variables */
var heroTextFade = $( '.display, .display-subtext' );
/* end header variables */

/* border variables */
var heroImageHeight = $('.hero').height();
/* end border variables */

/* section variables used to detect scrolling to a new section */
//get all the ids
var arr = $('#section-wrapper > section').map(function(){ 
  return this.id;
}).get();

//this will hold the positions of all the sections
//use it to change the border color for each section
var anchorOffset = [];

//get the positions of all the sections
for (let i = 0; i < arr.length; i++) {
  let curSection = $( '#' + arr[i] );
  if (curSection.length) {
    let offset = curSection.offset().top;
    anchorOffset.push(offset);
  }
  console.log(anchorOffset[i]); 
  
}



$(window).scroll(function() {
  var myScrollTop = $(this).scrollTop();
  parallax();

  //fixed top border
  if( $(this).scrollTop() > heroImageHeight) {
    $('.background-border-top').addClass('background-border-top--fixed');
  } else {
    $('.background-border-top').removeClass('background-border-top--fixed'); 
  }

  if ( $(this).scrollTop() > anchorOffset ) {
  }
});

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
    $('header').removeClass('nav-down').addClass('nav-up');
    
    //if mobile menu is open close it and switch the icon
    if ( $('.site-nav').hasClass('site-nav--open') ) {
      $('.site-nav').toggleClass('site-nav--open', 200);
      $( '.menu-toggle' ).toggleClass('open');
    }
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('header').removeClass('nav-up').addClass('nav-down');
    }
  }

  lastScrollTop = st;

  /* fade hero text */
  heroTextFade.css({
    'opacity': 1 - st/500
  });
  /* end fade hero text */
  /* add background color changer here */
  /* end background color changer here */

}
/* end navigation show/hide */


// hamburger show hide
$('.menu-toggle').click(function () { 
  $('.site-nav').toggleClass('site-nav--open', 200);
  $(this).toggleClass('open');
});


