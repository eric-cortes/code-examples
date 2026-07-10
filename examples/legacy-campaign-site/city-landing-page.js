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
      observer: true,
      pagination: {
          el: '.swiper-pagination',
      },
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
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
  var md = new MobileDetect(window.navigator.userAgent);

  var playerLoading;
  var playerPortraitLoading;

  if (md.mobile()) {
    $('.moduleTitle__video').append('<video class="vid-landscape" src="/leica/assets/video/berlin/berlin.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    $('.moduleTitle__video').append('<video class="vid-portrait" src="/leica/assets/video/berlin/berlin-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    var player = $('.moduleTitle__video .vid-landscape').get(0);
    var playerPortrait = $('.moduleTitle__video .vid-portrait').get(0);
    player.loadingAnimation = true;
    playerPortrait.loadingAnimation = true;
  } else {
    $('.moduleTitle__video').append('<video src="/leica/assets/video/berlin/desktop.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    var player = $('.moduleTitle__video video').get(0);
    player.loadingAnimation = true;
  }


  if(!md.mobile()) {
    $('header').css('display', 'block');
  }

  $(function () {
    $(document).ready(function () {
      $('.fullpage-berlin').fullpage({
        afterLoad: function(anchorLink, index) {
          $('.section').removeClass('loading');
        },
        onLeave: function (index, nextIndex, direction) {
          handleSectionChange(index, nextIndex, direction),
          $.fn.fullpage.reBuild();
        }
      })

      $(window).trigger('resize');

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
        resizeBgVideo()
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }


      $('.fullpage-berlin .mobile-overlay .overlay-close').on('click', function () {
        $.fn.fullpage.reBuild();
        $('.tile-top video').get(0).play()
        $('.tile-top video').get(0).pause()
        player.play();
        playerPortrait.play();
        player.pause();
        playerPortrait.pause();
        $('.mosaic--3 video').get(0).play();
        $('.mosaic--3 video').get(0).pause();
        $('.fullpage-berlin .mobile-overlay').hide();
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

      $('.tile-top video').prop('muted', false);

      startVideoOnSectionChange(index, nextIndex);

      if (direction === 'down') {
        $('header').addClass('slide-up');
      } else if (direction === 'up') {
        $('header').removeClass('slide-up');
      }

      if (nextIndex === 2) {
        $('.tile-top video').get(0).play()
        $('.tile-top video').prop('muted', false);
        $('.tile-top video').prop('volume', 0.5);
      } else if (nextIndex === 6) {
        $('.mosaic--3 video').get(0).play();
      } else if (nextIndex === 7) {
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
      } else if (nextIndex === 8) {
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
  var toKoo = $('.js-toKoo');
  var toHQ = $('.js-toHQ');
  var toNatural = $('.js-toNatural');
  var toPhysical = $('.js-toPhysical');
  var toMoments = $('.js-toMoments');

  var volume = [];
  var soundController = document.getElementsByClassName('sound-controller');

  // M A P  L I N K S

  toHome.on('click', function () {
    $.fn.fullpage.moveTo(1);
  })

  toPickup.on('click', function () {
    $.fn.fullpage.moveTo(2);
  })

  toKoo.on('click', function () {
    $.fn.fullpage.moveTo(3);
  })

  toHQ.on('click', function () {
    $.fn.fullpage.moveTo(4)
  })

  toNatural.on('click', function () {
    $.fn.fullpage.moveTo(6);
  })

  toPhysical.on('click', function () {
    $.fn.fullpage.moveTo(7);
  })

  toMoments.on('click', function () {
    $.fn.fullpage.moveTo(8);
  })
  
  //  P L A Y & P A U S E   -- C L I C K
  videoSlide[1].addEventListener('click', function (event) {
    var videoScroll = document.getElementById('scroll-video');
    if (event.target === soundController[0]) {
    } else if (event.target === videoScroll ){
      player.pause();
      playerPortrait.pause();
    } else {
      player.paused ? player.play() : player.pause()
      playerPortrait.paused ? playerPortrait.play() : playerPortrait.pause()
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
      } else {
        clearTimeout(playerLoading);
      }
    }

    if (playerPortrait) {
      playerPortrait.pause()
      
      if (nextIndex === 3) {
        resizeBgVideo()
        loadPlayerPortrait(0);
        soundController[0].classList.remove('sound-controller--off');
      } else {
        clearTimeout(playerPortraitLoading);
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

  function loadPlayerPortrait(i) {
    if (playerPortrait.loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      playerPortraitLoading = setTimeout(function () {
        videoSlide[i + 1].classList.add('moduleTitle--loading-off');
        playerPortrait.play()
        setTimeout(function () {
          videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
          videoSlide[i + 1].classList.remove('moduleTitle--loading');
        }, 1000);
      }, 3000);
      playerPortrait.loadingAnimation = false;
    } else {
      playerPortrait.play();
      videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
      videoSlide[i + 1].classList.remove('moduleTitle--loading');
    }
  }

  function setupVolume() {
    player.muted = !player.muted

    player.muted ? this.classList.add('sound-controller--off') : this.classList.remove('sound-controller--off');
  }

  $('.berlin-pickup .sound-toggle').click(function() {
    var muted = $('.tile-top video').prop("muted");
    $('.tile-top video').prop("muted", !muted);
    
    muted ? $(this).addClass('on').removeClass('off') : $(this).removeClass('on').addClass('off');
  })

})(jQuery, window, document);
