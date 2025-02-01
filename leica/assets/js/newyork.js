/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
(function ($, window, document, undefined) {

  var swiperGallery = new Swiper('.swiper-gallery-module', {
      init: false,
      lazy: true,
      loop: true,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: true,
      pagination: {
          el: '.swiper-pagination',
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
  var swiperGalleryTwo = new Swiper('.swiper-gallerytwo-module', {
      init: false,
      lazy: true,
      loop: true,
      observer: true,
      pagination: {
          el: '.swiper-pagination',
      },
      spaceBetween: 0,
      slidesPerView: 3,
      slidesPerGroup: 3,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
  var swiperGalleryThree = new Swiper('.swiper-gallerythree-module', {
    init: false,
    lazy: true,
    loop: true,
    observer: true,
    pagination: {
        el: '.swiper-pagination',
    },
    spaceBetween: 0,
    slidesPerView: 3,
    slidesPerGroup: 3,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// lazy loading
  [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
      img.removeAttribute('data-src');
    };
  });
// lazy loading  

  var playerLoading;

  var player = $('.moduleTitle__video video').get(0);
  player.loadingAnimation = true;

  var md = new MobileDetect(window.navigator.userAgent);

  if(!md.mobile()) {
    $('header').css('display', 'block');
  }

  $(function () {
    $(document).ready(function () {
      $('.fullpage-newyork').fullpage({
        afterLoad: function(anchorLink, index) {
          $('.section').removeClass('loading');
        },
        onLeave: function (index, nextIndex, direction) {
          handleSectionChange(index, nextIndex, direction),
          $.fn.fullpage.reBuild();          
        }
      })


      $(window).resize(function(){
        if (window.innerWidth<=468) {
          swiperGalleryTwo.params.slidesPerView = 1;
          swiperGalleryTwo.params.slidesPerGroup = 1;
          swiperGalleryThree.params.slidesPerView = 1;
          swiperGalleryThree.params.slidesPerGroup = 1;
        } else {
          swiperGalleryTwo.params.slidesPerGroup = 3;
          swiperGalleryTwo.params.slidesPerView = 3;
          swiperGalleryThree.params.slidesPerGroup = 3;
          swiperGalleryThree.params.slidesPerView = 3;
        }
        swiperGalleryTwo.pagination.render();
        swiperGalleryThree.pagination.render();
      })

      $(window).trigger('resize');

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
        resizeBgVideo()
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }

      $('.newyork-pickup .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.ny-pickup-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.ny-pickup-sound').prop('muted', false);
        }
      })      
      $('.newyork-contrast .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.ny-contrast-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.ny-contrast-sound').prop('muted', false);
        }
      })      
      $('.newyork-enigma .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.ny-enigma-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.ny-enigma-sound').prop('muted', false);
        }
      })
      $('.newyork-subject .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.ny-dichotomy-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.ny-dichotomy-sound').prop('muted', false);
        }
      })


      $('.fullpage-newyork .mobile-overlay .overlay-close').on('click', function () {
        $.fn.fullpage.reBuild();
        player.play();
        player.pause();
        $('.ny-pickup-sound').prop('muted', true);
        $('.ny-pickup-sound').get(0).play();
        $('.ny-contrast-sound').prop('muted', true);
        $('.ny-contrast-sound').get(0).play();
        $('.ny-enigma-sound').prop('muted', true);
        $('.ny-enigma-sound').get(0).play();
        $('.ny-dichotomy-sound').prop('muted', true);
        $('.ny-dichotomy-sound').get(0).play();
        $('.fullpage-newyork .mobile-overlay').hide();
      })

      $('.scroll--down').click(function () {
        $.fn.fullpage.moveSectionDown();    
      })

      $('.scroll--intro').click(function () {
        $.fn.fullpage.moveSlideRight();
      })

      $('.scroll--about').click(function () {
        $.fn.fullpage.moveSlideLeft();
      })
    })

    function handleSectionChange(index, nextIndex, direction) {
      var mosaic = [].slice.call(document.getElementsByClassName('moduleMosaic'))
      var md = new MobileDetect(window.navigator.userAgent);

      $('.redtrail').removeClass('slide-' + index);
      $('.redtrail').addClass('slide-' + nextIndex);

      startVideoOnSectionChange(index, nextIndex);

      if (direction === 'down') {
        $('header').addClass('slide-up');
      } else if (direction === 'up') {
        $('header').removeClass('slide-up');
      }

      if (nextIndex === 2) {
        if (md.mobile()) {
          $('.ny-pickup-sound').prop('muted', false);
        } else {
          $('.ny-pickup-sound').get(0).play()
        }
      } else if (nextIndex === 4) {
        if (md.mobile()) {
          $('.ny-contrast-sound').prop('muted', false);
        } else {
          $('.ny-contrast-sound').get(0).play()
        }
      } else if (nextIndex === 5) {
        if (md.mobile()) {
          $('.ny-enigma-sound').prop('muted', false);
        } else {
          $('.ny-enigma-sound').get(0).play()
        }
      } else if (nextIndex === 6) {
        if (md.mobile()) {
          $('.ny-dichotomy-sound').prop('muted', false);
        } else {
          $('.ny-dichotomy-sound').get(0).play()
        }
      } 

      if (nextIndex !== 2) {        
        if (md.mobile()) {
          $('.ny-pickup-sound').prop('muted', true);
        } else {
          $('.ny-pickup-sound').get(0).pause()
        }
      }
      if (nextIndex !== 4) {        
        if (md.mobile()) {
          $('.ny-contrast-sound').prop('muted', true);
        } else {
          $('.ny-contrast-sound').get(0).pause()
        }
      }
      if (nextIndex !== 5) {        
        if (md.mobile()) {
          $('.ny-enigma-sound').prop('muted', true);
        } else {
          $('.ny-enigma-sound').get(0).pause()
        }
      }
      if (nextIndex !== 6) {        
        if (md.mobile()) {
          $('.ny-dichotomy-sound').prop('muted', true);
        } else {
          $('.ny-dichotomy-sound').get(0).pause()
        }
      }


      if (nextIndex === 7) {
        swiperGalleryTwo.init();
        $('.modulePictureSliderTwo .single-image').show();
        $('.modulePictureSliderTwo .scroll').removeClass('scrollOut');
        setTimeout(function () {
          $('.swiper-gallerytwo-module .swiper-button-next').css("background-size", "0");
          $('.swiper-gallerytwo-module .swiper-button-prev').css("background-size", "0");
        }, 700);

        [
          $('.modulePictureSliderTwo .swiper-button-next'), $('.modulePictureSliderTwo .swiper-button-prev')
        ].forEach(function (button) {
          button.click(function () {
            $('.modulePictureSliderTwo .title').addClass("animationOut");
            $('.modulePictureSliderTwo .subtitle').addClass("animationOut");
            $('.modulePictureSliderTwo .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSliderTwo .single-image').hide();
            }, 800);
          });
        });


        document.querySelector('.modulePictureSliderTwo .swiper-button-next').addEventListener('touchmove', function () {
          $('.modulePictureSliderTwo .title').addClass("animationOut");
          $('.modulePictureSliderTwo .subtitle').addClass("animationOut");
          $('.modulePictureSliderTwo .scroll').addClass('scrollOut');
        });
        document.querySelector('.modulePictureSliderTwo .swiper-button-prev').addEventListener('touchmove', function () {
          $('.modulePictureSliderTwo .title').addClass("animationOut");
          $('.modulePictureSliderTwo .subtitle').addClass("animationOut");
          $('.modulePictureSliderTwo .scroll').addClass('scrollOut');
        });

      } else if (nextIndex === 8) {
        swiperGalleryThree.init();
        $('.modulePictureSliderThree .single-image').show();
        $('.modulePictureSliderThree .scroll').removeClass('scrollOut');
        setTimeout(function () {
          $('.swiper-gallerythree-module .swiper-button-next').css("background-size", "0");
          $('.swiper-gallerythree-module .swiper-button-prev').css("background-size", "0");
        }, 700);

        [
          $('.modulePictureSliderThree .swiper-button-next'), $('.modulePictureSliderThree .swiper-button-prev')
        ].forEach(function (button) {
          button.click(function () {
            $('.modulePictureSliderThree .title').addClass("animationOut");
            $('.modulePictureSliderThree .subtitle').addClass("animationOut");
            $('.modulePictureSliderThree .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSliderThree .single-image').hide();
            }, 800);
          });
        });


        document.querySelector('.modulePictureSliderThree .swiper-button-next').addEventListener('touchmove', function () {
          $('.modulePictureSliderThree .title').addClass("animationOut");
          $('.modulePictureSliderThree .subtitle').addClass("animationOut");
          $('.modulePictureSliderThree .scroll').addClass('scrollOut');
        });
        document.querySelector('.modulePictureSliderThree .swiper-button-prev').addEventListener('touchmove', function () {
          $('.modulePictureSliderThree .title').addClass("animationOut");
          $('.modulePictureSliderThree .subtitle').addClass("animationOut");
          $('.modulePictureSliderThree .scroll').addClass('scrollOut');
        });

      } else if (nextIndex === 9) {
        $('.footer .back').removeClass('visible');
        $('.modulePreview .nav').addClass('visible');
        $('.modulePreview .arrow').click(function () {
          $.fn.fullpage.moveTo(1);
        });
      }

      var titles = document.getElementsByClassName('title');
      var subtitles = document.getElementsByClassName('subtitle');

      for (var i = 0; i < titles.length; i++) {
        titles[i].classList.remove('animationOut');
        subtitles[i].classList.remove('animationOut');
      }
    }
  });

  var videoSlide = document.getElementsByClassName('moduleTitle');

  var toHome = $('.js-toHome');
  var toPickup = $('.js-toPickup');
  var toHosanna = $('.js-toHosanna');
  var toContrast = $('.js-toContrast');
  var toEnigma = $('.js-toEnigma');
  var toSubject = $('.js-toSubject');
  var toHarlem = $('.js-toHarlem');
  var toWallstreet = $('.js-toWallstreet');

  var volume = [];
  var soundController = document.getElementsByClassName('sound-controller');

  // M A P  L I N K S

  toHome.on('click', function () {
    $.fn.fullpage.moveTo(1);
  })

  toPickup.on('click', function () {
    $.fn.fullpage.moveTo(2);
  })

  toHosanna.on('click', function () {
    $.fn.fullpage.moveTo(3);
  })

  toContrast.on('click', function () {
    $.fn.fullpage.moveTo(4)
  })

  toEnigma.on('click', function () {
    $.fn.fullpage.moveTo(5);
  })

  toSubject.on('click', function () {
    $.fn.fullpage.moveTo(6);
  })

  toHarlem.on('click', function () {
    $.fn.fullpage.moveTo(7);
  })

  toWallstreet.on('click', function () {
    $.fn.fullpage.moveTo(8);
  })
  
  //  P L A Y & P A U S E   -- C L I C K
  videoSlide[1].addEventListener('click', function (event) {
    var videoScroll = document.getElementById('scroll-video');
    if (event.target === soundController[0]) {
    } else if (event.target === videoScroll ){
      player.pause();
    } else {
      player.paused ? player.play() : player.pause()
    }
  })


  // S O U N D  C O N T R O L L E R S   -- C L I C K
  soundController[0].addEventListener('click', function () {
    setupVolume.call(this, 0);
  });

  function resizeBgVideo() {
    if (window.innerHeight / window.innerWidth >= 0.5625) {
      var videoWidth = window.innerHeight * 183.5 / window.innerWidth;
      $('.moduleTitle__video video').css('width', videoWidth + '%');
    } else {
      var videoHeight = window.innerWidth * 56.25 / window.innerHeight;
      $('.moduleTitle__video video').css('height', videoHeight + '%');
    }
  }

  // P A U S E    O N    C H A N G E + ANIMATIONS
  function startVideoOnSectionChange(index, nextIndex) {

    if (player) {
      player.pause()
      
      if (nextIndex === 3) {
        resizeBgVideo()
        loadPlayer(0);
        player.muted = false;
        soundController[0].classList.remove('sound-controller--off');
      }
    }
  }
  
  function loadPlayer(i) {
    if (player.loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      playerLoading = setTimeout(function () {
        videoSlide[i + 1].classList.add('moduleTitle--loading-off');
        player.play()
        setTimeout(function () {
          videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
          videoSlide[i + 1].classList.remove('moduleTitle--loading');
        }, 1000);
      }, 3000);
      player.loadingAnimation = false;
    } else {
      player.play();
      videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
      videoSlide[i + 1].classList.remove('moduleTitle--loading');
    }
  }

  function setupVolume() {
    player.muted = !player.muted

    player.muted ? this.classList.add('sound-controller--off') : this.classList.remove('sound-controller--off');
  }

})(jQuery, window, document);
