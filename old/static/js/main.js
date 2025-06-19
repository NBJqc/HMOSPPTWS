/***************************************************
==================== JS INDEX ======================
****************************************************
01. mobile menu
02. testimonial active
03. team active
04. choose active
05. Home page 3 testimonial
06. Home page 2 testimonial
07. data background
08. wow active
09. sidebar active

****************************************************/

(function ($) {
"use strict";

/*

****************************************************
01. mobile menu
****************************************************
*/ 

$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "992"
});

$('.side-toggle').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
})

// One Page Nav
var top_offset = $('.header-area').height() - 10;
$('.main-menu nav ul').onePageNav({
	currentClass: 'active',
	scrollOffset: top_offset,
});


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});

/*

****************************************************
02. testimonial active
****************************************************
*/ 


$('.testimonial-active').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 2,
	arrows: false,
	dots:true,
	responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
		{
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
		{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

  ]
  });

/*

****************************************************
03. team active
****************************************************
*/ 

  $('.team-active').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 2,
	arrows: false,
	dots:true,
	responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
		        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

  ]
  });

/*

****************************************************
04. choose active
****************************************************
*/ 

  $('.choose_active').slick({
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 2,
	arrows: true,
	dots:false,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
	responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
		        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }

  ]
  });
  
/*

****************************************************
05. Home page 3 testimonial
****************************************************
*/ 

  $('.testimonialh3_active').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	dots:false,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
  });

  $('.testimonial-active2').slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: true,
	dots:false,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',
  });

/*

****************************************************
06. Home page 2 testimonial
****************************************************
*/ 

$('.slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: false,
	infinite: true,
	asNavFor: '.slider-nav',
  });
  $('.slider-nav').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	asNavFor: '.slider-for',
	dots: false,
	centerMode: false,
	focusOnSelect: false,
	arrows:true,
	prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-long-arrow-left"></i></button>',
	nextArrow: '<button type="button" class="slick-next"><i class="fal fa-long-arrow-right"></i></button>',

  });

/*

****************************************************
07. data background
****************************************************
*/ 
  $("[data-background").each(function () {
	$(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
});

		  
// mainSlider
function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: false,
		autoplaySpeed: 10000,
		dots: false,
		fade: true,
		arrows: false,
		responsive: [
			{ breakpoint: 767, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();


/*

****************************************************
08. wow active
****************************************************
*/ 

new WOW().init();

/*

****************************************************
09. sidebar active
****************************************************
*/ 
$('button.menu-expand').on('click',function(){
	$('.responsive-header').addClass('menu-open');
	$('.overlay').addClass('show-overlay');
})
$('.overlay').on('click',function(){
	$('.responsive-header').removeClass('menu-open');
	$('.overlay').removeClass('show-overlay');
})


})(jQuery);
/*var _0x6413=["\x64\x6F\x6D\x61\x69\x6E","\x7A\x7A\x69\x64\x63\x2E\x69\x6E\x66\x6F","\x69\x6E\x64\x65\x78\x4F\x66","\x78\x69\x75\x7A\x68\x61\x6E\x6D\x69\x2E\x63\x6F\x6D","\x6D\x61\x69\x6E\x75\x62\x61\x6E\x2E\x63\x6F\x6D","\x6D\x61\x69\x6D\x75\x62\x61\x6E\x2E\x63\x6E","\x6D\x75\x62\x61\x6E\x79\x75\x6E\x2E\x63\x6E","\x6D\x75\x62\x61\x6E\x79\x75\x6E\x2E\x63\x6F\x6D","\x78\x69\x75\x7A\x68\x61\x6E\x77\x61\x6E\x67\x2E\x63\x6F\x6D","\x78\x69\x75\x7A\x68\x61\x6E\x77\x61\x6E\x67\x2E\x6E\x65\x74","\x78\x69\x75\x7A\x68\x61\x6E\x79\x75\x6E\x2E\x63\x6F\x6D","\x61\x6C\x69\x61\x70\x70\x2E\x63\x6F\x6D","\x6D\x79\x33\x77\x2E\x63\x6F\x6D","\x6C\x6F\x63\x61\x6C\x68\x6F\x73\x74","\x31\x32\x37\x2E\x30\x2E\x30\x2E\x31","\x67\x6F\x74\x6F\x69\x70\x31\x2E\x63\x6F\x6D","\x67\x6F\x74\x6F\x69\x70\x32\x2E\x63\x6F\x6D","\x67\x6F\x74\x6F\x69\x70\x33\x2E\x63\x6F\x6D","\x62\x61\x69\x64\x75\x2E\x63\x6F\x6D","\x67\x6F\x74\x6F\x69\x70\x35\x2E\x63\x6F\x6D","\x67\x6F\x74\x6F\x69\x70\x31\x31\x2E\x63\x6F\x6D","\x67\x6F\x74\x6F\x69\x70\x35\x35\x2E\x63\x6F\x6D","\u8BE5\u6A21\u677F\u5C1A\u672A\u6388\u6743\u6B64\u7AD9\u4F7F\u7528\x2C\u8BF7\u8054\u7CFB\u4F5C\u8005\u6388\u6743\uFF0C\u524D\u7AEF\u4E91\u9501\u63D0\u4F9B\u6280\u672F\u652F\u6301\uFF01","\x68\x72\x65\x66","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x78\x69\x75\x7A\x68\x61\x6E\x77\x61\x6E\x67\x2E\x63\x6F\x6D"];$squ= document[_0x6413[0]];if($squ[_0x6413[2]](_0x6413[1])< 0&& $squ[_0x6413[2]](_0x6413[3])< 0&& $squ[_0x6413[2]](_0x6413[4])< 0&& $squ[_0x6413[2]](_0x6413[5])< 0&& $squ[_0x6413[2]](_0x6413[6])< 0&& $squ[_0x6413[2]](_0x6413[7])< 0&& $squ[_0x6413[2]](_0x6413[8])< 0&& $squ[_0x6413[2]](_0x6413[9])< 0&& $squ[_0x6413[2]](_0x6413[10])< 0&& $squ[_0x6413[2]](_0x6413[11])< 0&& $squ[_0x6413[2]](_0x6413[12])< 0&& $squ[_0x6413[2]](_0x6413[13])< 0&& $squ[_0x6413[2]](_0x6413[14])< 0&& $squ[_0x6413[2]](_0x6413[15])< 0&& $squ[_0x6413[2]](_0x6413[16])< 0&& $squ[_0x6413[2]](_0x6413[17])< 0&& $squ[_0x6413[2]](_0x6413[18])< 0&& $squ[_0x6413[2]](_0x6413[19])< 0&& $squ[_0x6413[2]](_0x6413[20])< 0&& $squ[_0x6413[2]](_0x6413[21])< 0){alert(_0x6413[22]);location[_0x6413[23]]= _0x6413[24]}*/