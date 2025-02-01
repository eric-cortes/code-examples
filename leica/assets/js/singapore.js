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
      lazy: false,
      loop: true,
      spaceBetween: 40,
      slidesPerView: 2,
      slidesPerGroup: 2,
      loop: true,
      pagination: {
          el: '.swiper-pagination',
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      }
  });
  var swiperGalleryTwo = new Swiper('.swiper-gallerytwo-module', {
      init: false,
      lazy: false,
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
  var swiperGalleryThree = new Swiper('.swiper-gallerythree-module', {
      init: false,
      lazy: false,
      loop: true,
      pagination: {
          el: '.swiper-pagination',
      },
      spaceBetween: 0,
      slidesPerView: 1,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
  var swiperGalleryFour = new Swiper('.swiper-galleryfour-module', {
      init: false,
      lazy: false,
      loop: true,
      pagination: {
          el: '.swiper-pagination',
      },
      spaceBetween: 0,
      slidesPerView: 1,
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
  });
  var playerLoading;

  var player = $('.moduleTitle__video video').get(0);
  player.loadingAnimation = true;
  var md = new MobileDetect(window.navigator.userAgent);

  if(!md.mobile()) {
    $('header').css('display', 'block');
  }

  $(function () {
    $(document).ready(function () {
      $('.fullpage-singapore').fullpage({
        afterLoad: function(anchorLink, index) {
          $('.section').removeClass('loading');
        },
        onLeave: function (index, nextIndex, direction) {
          handleSectionChangeSingapore(index, nextIndex, direction),
          $.fn.fullpage.reBuild();          
        }
      })

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
        resizeBgVideo()
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }

      $('.singapore-pickup .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.pickup-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.pickup-sound').prop('muted', false);
        }
      })

      $('.singapore-arrival .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.arrival-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.arrival-sound').prop('muted', false);
        }
      })

      $('.fullpage-singapore .mobile-overlay .overlay-close').on('click', function () {
        $.fn.fullpage.reBuild();
        player.play()
        player.pause()
        $('.pickup-sound').prop('muted', true);
        $('.pickup-sound').get(0).play();
        $('.arrival-sound').prop('muted', true);
        $('.arrival-sound').get(0).play();
        $('.fullpage-singapore .mobile-overlay').hide();
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

    function handleSectionChangeSingapore(index, nextIndex, direction) {
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

      if (nextIndex !== 2) {
        if (md.mobile()) {
          $('.arrival-sound').prop('muted', true);
        } else {
          $('.arrival-sound').get(0).pause()
        }
      }

      if (nextIndex !== 3) {
        if (md.mobile()) {
          $('.pickup-sound').prop('muted', true);
        } else {
          $('.pickup-sound').get(0).pause()
        }
      }

      if (nextIndex === 2) {
        if (md.mobile()) {
          $('.arrival-sound').prop('muted', false);
        } else {
          $('.arrival-sound').get(0).play()
        }
      } else if (nextIndex === 3) {
        clearTimeout(playerLoading)
        if (md.mobile()) {
          $('.pickup-sound').prop('muted', false);
        } else {
          $('.pickup-sound').get(0).play()
        }
      } else if (nextIndex === 5) {
        clearTimeout(playerLoading)
        $('.modulePictureSlider .scroll').removeClass('scrollOut');
        swiperGallery.init();
        $('.modulePictureSlider .single-image').show();
        setTimeout(function () {
          $('.swiper-gallery-module .swiper-button-next').css("background-size", "0");
          $('.swiper-gallery-module .swiper-button-prev').css("background-size", "0");
        }, 700);

        [
          $('.modulePictureSlider .swiper-button-next'), $('.modulePictureSlider .swiper-button-prev')
        ].forEach(function (button) {
          button.click(function () {
            $('.modulePictureSlider .title').addClass("animationOut");
            $('.modulePictureSlider .subtitle').addClass("animationOut");
            $('.modulePictureSlider .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSlider .single-image').hide();
            }, 800);
          });
        });
        
        document.querySelector('.modulePictureSlider .swiper-button-next').addEventListener('touchmove', function () {
          $('.modulePictureSlider .title').addClass("animationOut");
          $('.modulePictureSlider .subtitle').addClass("animationOut");
          $('.modulePictureSlider .scroll').addClass('scrollOut');
        });
        document.querySelector('.modulePictureSlider .swiper-button-prev').addEventListener('touchmove', function () {
          $('.modulePictureSlider .title').addClass("animationOut");
          $('.modulePictureSlider .subtitle').addClass("animationOut");
          $('.modulePictureSlider .scroll').addClass('scrollOut');
        });


      } else if (nextIndex === 6) {
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

      } else if (nextIndex === 7) {
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

      } else if (nextIndex === 8) {
        swiperGalleryFour.init();
        $('.modulePictureSliderFour .single-image').show();
        $('.modulePictureSliderFour .scroll').removeClass('scrollOut');
        setTimeout(function () {
          $('.swiper-galleryfour-module .swiper-button-next').css("background-size", "0");
          $('.swiper-galleryfour-module .swiper-button-prev').css("background-size", "0");
        }, 700);

        [
          $('.modulePictureSliderFour .swiper-button-next'), $('.modulePictureSliderFour .swiper-button-prev')
        ].forEach(function (button) {
          button.click(function () {
            $('.modulePictureSliderFour .title').addClass("animationOut");
            $('.modulePictureSliderFour .subtitle').addClass("animationOut");
            $('.modulePictureSliderFour .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSliderFour .single-image').hide();
            }, 800);
          });
        });


        document.querySelector('.modulePictureSliderFour .swiper-button-next').addEventListener('touchmove', function () {
          $('.modulePictureSliderFour .title').addClass("animationOut");
          $('.modulePictureSliderFour .subtitle').addClass("animationOut");
          $('.modulePictureSliderFour .scroll').addClass('scrollOut');
        });
        document.querySelector('.modulePictureSliderFour .swiper-button-prev').addEventListener('touchmove', function () {
          $('.modulePictureSliderFour .title').addClass("animationOut");
          $('.modulePictureSliderFour .subtitle').addClass("animationOut");
          $('.modulePictureSliderFour .scroll').addClass('scrollOut');
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

  // FOR SYDNEY PAGE
  var videoSlide = document.getElementsByClassName('moduleTitle');

  var toHome = $('.js-toHome');
  var toArrival = $('.js-toArrival');
  var toPickup = $('.js-toPickup');
  var toJesse = $('.js-toJesse');
  var toWOE = $('.js-toWOE');
  var toCS = $('.js-toCS');
  var toMystery = $('.js-toMystery');
  var toSL = $('.js-toSL');

  var volume = [];
  var soundController = document.getElementsByClassName('sound-controller');

  // M A P  L I N K S

  toHome.on('click', function () {
    $.fn.fullpage.moveTo(1);
  })

  toArrival.on('click', function () {
    $.fn.fullpage.moveTo(2);
  })

  toPickup.on('click', function () {
    $.fn.fullpage.moveTo(3);
  })

  toJesse.on('click', function () {
    $.fn.fullpage.moveTo(4)
  })

  toWOE.on('click', function () {
    $.fn.fullpage.moveTo(5);
  })

  toCS.on('click', function () {
    $.fn.fullpage.moveTo(6);
  })

  toMystery.on('click', function () {
    $.fn.fullpage.moveTo(7);
  })

  toSL.on('click', function () {
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
      
      if (nextIndex === 4) {
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
