/* media consts */
const PHONE = 479;
const TABLET = 768;
const DESKTOP = 1024;

/* navigation show/hide variables */
var didScroll;
var lastScrollTop = 0;
var delta = 5; //pixels
var navbarHeight = $('header').outerHeight();
/* end navigation show/hide variables */

/* header variables */
var heroTextFade = $( '.hero-text .display, .hero-text .display-subtext' );
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
function getSectionScrollPosition() {
  for (let i = 0; i < arr.length; i++) {
    let curSection = $( '#' + arr[i] );
    if (curSection.length) {
      let offset = curSection.offset().top;
      anchorOffset.push(offset);
    }
  }
}

//determine if you need the hover over sub menu
// call on load and resize

//social link set up
function socialLinkSetUp (){
  var path = window.location.pathname;
  var index = 'dev/ucsc/capstone2018wi/jumar/index.html';
  var ucsc = '/dev/ucsc/capstone2018wi/jumar/'
  var myRoot = '/';
  var width = $(window).width();
  if( (path === index ) || (path === myRoot) || (path === ucsc)) {
    if ( width <= PHONE ) {
      $('.social li a').css( 'color', '#D1B471' ); //set to gold if index is in mobile      
    } else {
      $('.social li a').css( 'color', '#ffffff' );      
    }
  } 
}
socialLinkSetUp();
//change border page border color
function changePageBorder(hex) {
  $('.background-border-top').css('background-color', hex); //set to gold  
  $('.background').css('border-left', 'solid 1em' + hex );
  $('.background').css('border-bottom', 'solid 1em' + hex );
  $('.background').css('border-right', 'solid 1em' + hex );
  $('.social li a').css( 'color', hex );
}

getSectionScrollPosition();

const GOLD = 0;
const PURPLE = 1;
const BLUE = 2;
const BLACK = 3;
/* end section variables used to detect scrolling to a new section */

$( window ).resize( function () {
  getSectionScrollPosition();
  heroImageHeight = $('.hero').height(); //recalculate hero height
  socialLinkSetUp();

});

$( window ).scroll( function() {
  var myScrollTop = $(this).scrollTop();
  parallax();

  //fixed top border
  if( $(this).scrollTop() > heroImageHeight) {
    $('.background-border-top').addClass('background-border-top--fixed');
    $('.background-border-top').css('z-index', '2');    
  } else {
    $('.background-border-top').removeClass('background-border-top--fixed'); 
    $('.background-border-top').css('z-index', '0');    
  }

  if ( $(this).scrollTop() < ((anchorOffset[GOLD] / 2) && $(this).width() > PHONE)) {
    $('.social a').css( 'color', '#FFFFFF' );  
  } else if ( ($(this).scrollTop() >= (anchorOffset[GOLD] / 2))  && ($(this).scrollTop() < anchorOffset[PURPLE] ) ) {
    changePageBorder('#D1B471'); //gold
  } else if ( ( $(this).scrollTop() >= anchorOffset[PURPLE] ) && ( $(this).scrollTop() < anchorOffset[BLUE] ) ) {
    changePageBorder("#9013FE"); //purple
  } else if ( ( $(this).scrollTop() >= anchorOffset[BLUE] ) && ( $(this).scrollTop() < anchorOffset[BLACK] ) ) {
    changePageBorder("#1893E7"); //blue
  } else if ( $(this).scrollTop() >= anchorOffset[BLACK] ) {
    changePageBorder("#4B4B4B"); //black
  }
});

function parallax() {
  var wScroll = $(window).scrollTop();
  if ( $(window).width() > DESKTOP ) {
    $('.parallax-bg').css('background-position', 'center ' + (wScroll * -0.5) + 'px')
  }
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
    'opacity': 1 - st*.0025
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

$('#dropdown').hover(function () {
  if ( $(window).width() > DESKTOP ) {
    $('.sub-nav').toggleClass('sub-nav--open', 200);
  }
  
});

