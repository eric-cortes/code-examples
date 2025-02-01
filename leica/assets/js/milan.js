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

// lazy loading
  [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
      img.removeAttribute('data-src');
    };
  });
// lazy loading
  var md = new MobileDetect(window.navigator.userAgent);

  var introLoading;
  var processLoading;
  var introPortraitLoading;
  var processPortraitLoading;

  if (md.mobile()) {
    $('.moduleTitle__video').first().append('<video class="vid-landscape" src="/leica/assets/video/milan/intro-landscape.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    $('.moduleTitle__video').first().append('<video class="vid-portrait" src="/leica/assets/video/milan/intro-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    $('.moduleTitle__video').last().append('<video class="vid-landscape" src="/leica/assets/video/milan/process-landscape.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    $('.moduleTitle__video').last().append('<video class="vid-portrait" src="/leica/assets/video/milan/process-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    var player = $('.moduleTitle__video .vid-landscape')
    var playerPortrait = $('.moduleTitle__video .vid-portrait')
    player.get(0).loadingAnimation = true;
    player.get(1).loadingAnimation = true;
    playerPortrait.get(0).loadingAnimation = true;
    playerPortrait.get(1).loadingAnimation = true;
  } else {
    $('.moduleTitle__video').first().append('<video src="/leica/assets/video/milan/intro.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    $('.moduleTitle__video').last().append('<video src="/leica/assets/video/milan/process.mp4" type="video/mp4" playsinline muted loop preload="none"></video>')
    var player = $('.moduleTitle__video video')
    player.get(0).loadingAnimation = true;
    player.get(1).loadingAnimation = true;
  }


  if(!md.mobile()) {
    $('header').css('display', 'block');
  }

  $(function () {
    $(document).ready(function () {
      $('.bg-placeholder').first().click()
      $('.fullpage-milan').fullpage({
        afterLoad: function(anchorLink, index) {
          $('.section').removeClass('loading');
        },
        onLeave: function (index, nextIndex, direction) {
          handleSectionChange(index, nextIndex, direction),
          $.fn.fullpage.reBuild();
        }
      })

      $(window).trigger('resize');
      $('.bg-placeholder').first().click()

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
        resizeBgVideo()
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }

      $('.milan-mind .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.milan-an-open-mind').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.milan-an-open-mind').prop('muted', false);
        }
      })
      $('.milan-pickup .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.milan-an-open-ear').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.milan-an-open-ear').prop('muted', false);
        }
      })


      $('.fullpage-milan .mobile-overlay .overlay-close').on('click', function () {
        $.fn.fullpage.reBuild();
        $('.col-left video').get(0).play()
        $('.col-left video').get(0).pause()
        player.get(0).play();
        playerPortrait.get(0).play();
        player.get(0).pause();
        playerPortrait.get(0).pause();
        player.get(1).play();
        playerPortrait.get(1).play();
        player.get(1).pause();
        playerPortrait.get(1).pause();
        $('.milan-an-open-mind').prop('muted', true);
        $('.milan-an-open-mind').get(0).play();
        $('.milan-an-open-ear').prop('muted', true);
        $('.milan-an-open-ear').get(0).play();
        $('.fullpage-milan .mobile-overlay').hide();
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
        $('.col-left video').get(0).play()
        $('.col-left video').prop('muted', false);
        $('.col-left video').prop('volume', 0.5);
      } else if(nextIndex === 4){
        if (md.mobile()) {
          $('.milan-an-open-mind').prop('muted', false);
        } else {
          $('.milan-an-open-mind').get(0).play()
        }
      } else if(nextIndex === 6){
        if (md.mobile()) {
          $('.milan-an-open-ear').prop('muted', false);
        } else {
          $('.milan-an-open-ear').get(0).play()
        }
      } else if (nextIndex === 8) {
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
      } else if(nextIndex === 9) {
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
      }

      if (nextIndex !== 4) {
        if (md.mobile()) {
          $('.milan-an-open-mind').prop('muted', true);
        } else {
          $('.milan-an-open-mind').get(0).pause()
        }
      }
      if (nextIndex !== 6) {
        if (md.mobile()) {
          $('.milan-an-open-ear').prop('muted', true);
        } else {
          $('.milan-an-open-ear').get(0).pause()
        }
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
  var toNKChu = $('.js-toNKChu');
  var toOpenMind = $('.js-toOpenMind');
  var toOpenEar = $('.js-toOpenEar');
  var toNature = $('.js-toNature');
  var toCreepingTide = $('.js-toCreepingTide');
  var toHumanNature = $('.js-toHumanNature');

  var volume = [];
  var soundController = document.getElementsByClassName('sound-controller');

  // M A P  L I N K S

  toHome.on('click', function () {
    $.fn.fullpage.moveTo(1);
  })

  toPickup.on('click', function () {
    $.fn.fullpage.moveTo(2);
  })

  toNKChu.on('click', function () {
    $.fn.fullpage.moveTo(3);
  })

  toOpenMind.on('click', function () {
    $.fn.fullpage.moveTo(4)
  })

  toOpenEar.on('click', function () {
    $.fn.fullpage.moveTo(6);
  })

  toNature.on('click', function () {
    $.fn.fullpage.moveTo(7);
  })

  toCreepingTide.on('click', function () {
    $.fn.fullpage.moveTo(8);
  })

  toHumanNature.on('click', function () {
    $.fn.fullpage.moveTo(9);
  })

  //  P L A Y & P A U S E   -- C L I C K
  videoSlide[1].addEventListener('click', function (event) {

    var videoScroll = document.getElementById('scroll-video');
    if (event.target === soundController[0]) {
    } else if (event.target === videoScroll ){
      player.get(0).pause();
      playerPortrait.get(0).pause();
    } else {
      player.get(0).paused ? player.get(0).play() : player.get(0).pause()
      if(playerPortrait){
        playerPortrait.get(0).paused ? playerPortrait.get(0).play() : playerPortrait.get(0).pause()
      }
    }
  })
  videoSlide[2].addEventListener('click', function (event) {

    var videoScroll = document.getElementById('scroll-video');
    if (event.target === soundController[1]) { }
     else if (event.target === videoScroll ){
      player.get(1).pause();
      playerPortrait.get(1).pause();
    } else {
      player.get(1).paused ? player.get(1).play() : player.get(1).pause()
      if(playerPortrait){
        playerPortrait.get(1).paused ? playerPortrait.get(1).play() : playerPortrait.get(1).pause()
      }
    }
  })

  // S O U N D  C O N T R O L L E R S   -- C L I C K
  soundController[0].addEventListener('click', function () {
    setupVolume.call(this, 0);
  });

  soundController[1].addEventListener('click', function () {
    setupVolume.call(this, 1);
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
      player.get(0).pause()
      player.get(1).pause()
      if (nextIndex === 3) {
        resizeBgVideo()
        loadPlayer(0);
        player.get(0).muted = false;
        soundController[0].classList.remove('sound-controller--off');
      } else {
        clearTimeout(introLoading);
      }
      if (nextIndex === 5) {
        resizeBgVideo()
        loadPlayer(1);
        player.get(1).muted = false;
        soundController[1].classList.remove('sound-controller--off');
      } else {
        clearTimeout(processLoading);
      }
    }

    if (playerPortrait) {
      playerPortrait.get(0).pause()
      playerPortrait.get(1).pause()
      if (nextIndex === 3) {
        resizeBgVideo()
        loadPlayerPortrait(0);
        playerPortrait.get(0).muted = false;
        soundController[0].classList.remove('sound-controller--off');
      } else {
        clearTimeout(introPortraitLoading);
      }
      if (nextIndex === 5) {
        resizeBgVideo()
        loadPlayerPortrait(1);
        playerPortrait.get(1).muted = false;
        soundController[1].classList.remove('sound-controller--off');
      } else {
        clearTimeout(processPortraitLoading);
      }
    }
  }

  function loadPlayer(i) {
    if (player.get(i).loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      if(i===0){
        introLoading = setTimeout(function () {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          player.get(i).play()
          setTimeout(function () {
            videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
            videoSlide[i + 1].classList.remove('moduleTitle--loading');
          }, 1000);
        }, 3000);
      } else {
        processLoading = setTimeout(function () {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          player.get(i).play()
          setTimeout(function () {
            videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
            videoSlide[i + 1].classList.remove('moduleTitle--loading');
          }, 1000);
        }, 3000);
      }

      player.get(i).loadingAnimation = false;
    } else {
      player.get(i).play();
      videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
      videoSlide[i + 1].classList.remove('moduleTitle--loading');
    }
  }

  function loadPlayerPortrait(i) {
    if (playerPortrait.get(i).loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      if(i===0){
        introPortraitLoading = setTimeout(function () {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          playerPortrait.get(i).play()
          setTimeout(function () {
            videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
            videoSlide[i + 1].classList.remove('moduleTitle--loading');
          }, 1000);
        }, 3000);
        playerPortrait.get(i).loadingAnimation = false;
      }else {
        processPortraitLoading = setTimeout(function () {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          playerPortrait.get(i).play()
          setTimeout(function () {
            videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
            videoSlide[i + 1].classList.remove('moduleTitle--loading');
          }, 1000);
        }, 3000);
        playerPortrait.get(i).loadingAnimation = false;
      }

    } else {
      playerPortrait.get(i).play();
      videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
      videoSlide[i + 1].classList.remove('moduleTitle--loading');
    }
  }

  function setupVolume(i) {
    player.get(i).muted = !player.get(i).muted

    player.get(i).muted ? this.classList.add('sound-controller--off') : this.classList.remove('sound-controller--off');
  }

  $('.milan-pickup .sound-toggle').click(function() {
    var muted = $('.col-left video').prop("muted");

    $('.col-left video').prop("muted", !muted);

    !muted ? $(this).addClass('on').removeClass('off') : $(this).removeClass('on').addClass('off');
  })

})(jQuery, window, document);
