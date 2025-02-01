/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';
  var md = new MobileDetect(window.navigator.userAgent);
  var sydney = document.getElementsByClassName('fullpage-sydney')[0];

  if (sydney) {
    var player = document.querySelectorAll('video');
    for (var a = 0; a < player.length; a++) {
      player[a].loadingAnimation = true;
    }
  }

  if(!md.mobile() || !sydney) {
    $('header').css('display', 'block');
  }

  $(function () {
    $(document).ready(function () {
      if (!!$('.fullpage').length) {
        if(md.mobile()) {
          $('.moduleMap').hide();
        } else {
          $('.moduleMenu').hide();
        }
        $('.fullpage').fullpage({
          controlArrows: false,
          normalScrollElements: '.moduleAbout .wrap',
          anchors: ['intro', 'map'],
          afterLoad: function(anchorLink, index) {
            $('.section').removeClass('loading');
          },
          onLeave: function (index, nextIndex, direction) {
            handleSectionChange(nextIndex, direction)
          }
        })
      }

      if (!!$('.fullpage-sydney').length) {
        $('.fullpage-sydney').fullpage({
          afterLoad: function(anchorLink, index) {
            $('.section').removeClass('loading');
          },
          onLeave: function (index, nextIndex, direction) {
            handleSectionChangeSydney(index, nextIndex, direction)
          }
        })
      }

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      } else if (sydney) {
        console.log('lol');
        playFirstVideo();
        console.log('xd');
        console.log('dd');
      }

      $('.moduleMap .mobile-overlay .overlay-close').on('click', function () {
        $('.moduleMap .mobile-overlay').hide();
      })

      $('.fullpage-sydney .mobile-overlay .overlay-close').on('click', function () {
        $.fn.fullpage.reBuild();
        playFirstVideo();
        $('.bg-placeholder').addClass('fade-out');
        playSecondVideo()
        playThirdVideo()
        $('.moduleTitle .sound-controller').removeClass('sound-controller--off')
        $('.pickup-sound').prop('muted', true);
        $('.pickup-sound').get(0).play();
        $('.process-sound').prop('muted', true);
        $('.process-sound').get(0).play();
        $('.fullpage-sydney .mobile-overlay').hide();
      })

      resizeBgVideo()
      $('.scroll--down').click(function () {
        $.fn.fullpage.moveSectionDown();
      })

      $('.scroll--intro').click(function () {
        $.fn.fullpage.moveSlideRight();
      })

      $('.scroll--about').click(function () {
        $.fn.fullpage.moveSlideLeft();
      })

      $(window).resize(function () {
        resizeBgVideo()
      })


      $('.moduleTwinImage .sound-toggle').click(function () {
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

      $('.moduleMosaic .sound-toggle').click(function () {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on')
          $(this).addClass('off')
          $('.process-sound').prop('muted', true);
        } else {
          $(this).removeClass('off')
          $(this).addClass('on')
          $('.process-sound').prop('muted', false);
        }
      })
    })

    function resizeBgVideo() {
      if (window.innerHeight / window.innerWidth >= 0.5625) {
        var videoWidth = window.innerHeight * 183.5 / window.innerWidth;
        $('.moduleTitle__video video').css('width', videoWidth + '%');
      } else {
        var videoHeight = window.innerWidth * 56.25 / window.innerHeight;
        $('.moduleTitle__video video').css('height', videoHeight + '%');
      }
    }

    function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var context = this, args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }



    function handleSectionChange(nextIndex, direction) {
      if (direction === 'down') {
        $('header').addClass('slide-up');
      } else if (direction === 'up') {
        $('header').removeClass('slide-up');
      }

      if (nextIndex === 2) {
        $('.moduleMap').addClass('load');
        $('.section .moduleMap .diagram').addClass("animation");
      }
      else if (nextIndex === 3) {
        $('.moduleMenu').find('.square').addClass('load');
      }

    }

    function handleSectionChangeSydney(index, nextIndex, direction) {
      var mosaic = [].slice.call(document.getElementsByClassName('moduleMosaic'))
      var md = new MobileDetect(window.navigator.userAgent);

      $('.redtrail').removeClass('slide-' + index);
      $('.redtrail').addClass('slide-' + nextIndex);

      muteVideos();
      startVideoOnSectionChange(index, nextIndex);

      if (direction === 'down') {
        $('header').addClass('slide-up');
        mosaic.forEach(function (mosaic) {
          setTimeout(function () { mosaic.classList.remove('moduleMosaic--cut'); }, 200)
        });
      } else if (direction === 'up') {
        $('header').removeClass('slide-up');
        mosaic.forEach(function (mosaic) {
          setTimeout(function () { mosaic.classList.add('moduleMosaic--cut'); }, 200)
        });
      }

      if (nextIndex === 2) {
        if (md.mobile()) {
          $('.pickup-sound').prop('muted', true);
        } else {
          $('.pickup-sound').get(0).pause()
        }
      } else if (nextIndex === 3) {
        if (md.mobile()) {
          $('.pickup-sound').prop('muted', false);
        } else {
          $('.pickup-sound').get(0).play()
        }
      } else if (nextIndex === 4) {
        if (md.mobile()) {
          $('.pickup-sound').prop('muted', true);
          $('.process-sound').prop('muted', true);
        } else {
          $('.pickup-sound').get(0).pause()
          $('.process-sound').get(0).pause()
        }
      } else if (nextIndex === 5) {
        if (md.mobile()) {
          $('.process-sound').prop('muted', false);
        } else {
          $('.process-sound').get(0).play()
        }
      } else if (nextIndex === 6) {
        if (md.mobile()) {
          $('.process-sound').prop('muted', true);
        } else {
          $('.process-sound').get(0).pause()
        }
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


      } else if (nextIndex === 7) {
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

  // FOR SYDNEY PAGE


  if (sydney) {


    var videoSlide = document.getElementsByClassName('moduleTitle');

    var toIntro = $('.js-toIntro');
    var toTomaso = $('.js-toTomaso');
    var toPickup = $('.js-toPickup');
    var toProcess = $('.js-toProcess');
    var toDowntown = $('.js-toDowntown');
    var toBondi = $('.js-toBondi');
    var toNewtown = $('.js-toNewtown');

    var volume = [];
    var soundController = document.getElementsByClassName('sound-controller');

    player[1].pause();
    player[2].pause();

    if (!md.mobile()) {
      player[0].muted = false;
      $('.moduleTitle .sound-controller').removeClass('sound-controller--off')
    }

    // M A P  L I N K S

    toIntro.on('click', function () {
      $.fn.fullpage.moveTo(1);
    })

    toTomaso.on('click', function () {
      $.fn.fullpage.moveTo(2);
    })

    toPickup.on('click', function () {
      $.fn.fullpage.moveTo(3);
    })

    toProcess.on('click', function () {
      $.fn.fullpage.moveTo(4)
    })

    toDowntown.on('click', function () {
      $.fn.fullpage.moveTo(6);
    })

    toBondi.on('click', function () {
      $.fn.fullpage.moveTo(7);
    })

    toNewtown.on('click', function () {
      $.fn.fullpage.moveTo(8);
    })

    //  P L A Y & P A U S E   -- C L I C K

    videoSlide[0].addEventListener('click', function (event) {
      if (
        event.target === soundController[0]
        || event.target === $('.overlay-close').get(0)
        || event.target === $('.scroll').get(0)
      ) {
      } else {
        player[0].paused ? playFirstVideo() : player[0].pause()
      }
    })

    videoSlide[1].addEventListener('click', function (event) {
      if (event.target === soundController[1]) {
      } else {
        player[1].paused ? player[1].play() : player[1].pause()
      }
    })

    videoSlide[2].addEventListener('click', function (event) {
      if (event.target === soundController[2]) {
      } else {
        player[2].paused ? player[2].play() : player[2].pause()
      }
    })

    // S O U N D  C O N T R O L L E R S   -- C L I C K
    soundController[0].addEventListener('click', function () {
      setupVolume.call(this, 0);
    });

    soundController[1].addEventListener('click', function () {
      setupVolume.call(this, 1);
    });

    soundController[2].addEventListener('click', function () {
      setupVolume.call(this, 2);
    });
  }

  function playFirstVideo() {
    player[0].play()

    player[0].onplay = function() {
      player[0].muted = false;
      $('.bg-placeholder').addClass('fade-out');
    }
  }

  function playSecondVideo() {
    player[1].play()
    .then(function(response) {
      player[1].pause();
    }).catch(function(error) {});
  }

  function playThirdVideo() {
    player[2].play()
    .then(function(response) {
      player[2].pause();
    }).catch(function(error) {});
  }

  // M U T E     V I D E O S
  function muteVideos() {
    for (var a = 0; a < player.length; a++) {
      player[a].muted = true;
      soundController[a].classList.add('sound-controller--off');
    }
  }
  // P A U S E    O N    C H A N G E + ANIMATIONS
  function startVideoOnSectionChange(index, nextIndex) {

    player.forEach(function (player) { player.pause(); })

    if (nextIndex === 1) {
      playFirstVideo();
      player[0].muted = false;
      soundController[0].classList.remove('sound-controller--off');
    }
    if (nextIndex === 2) {
      loadPlayer(1);
      player[1].muted = false;
      soundController[1].classList.remove('sound-controller--off');
    }
    if (nextIndex === 4) {
      loadPlayer(2);
      player[2].muted = false;
      soundController[2].classList.remove('sound-controller--off');
    }
  }

  function loadPlayer(i) {
    if (player[i].loadingAnimation) {
      videoSlide[i].classList.add('moduleTitle--loading');
      setTimeout(function () {
        videoSlide[i].classList.add('moduleTitle--loading-off');
        player[i].play().then(function(response){}).catch(function(error){});
        setTimeout(function () {
          videoSlide[i].classList.remove('moduleTitle--loading-off');
          videoSlide[i].classList.remove('moduleTitle--loading');
          }, 1000);
      }, 3000);
      player[i].loadingAnimation = false;
    } else {
      player[i].play();
    }
  }

  function setupVolume(videoIndex) {
    player[videoIndex].muted = !player[videoIndex].muted

    player[videoIndex].muted ? this.classList.add('sound-controller--off') : this.classList.remove('sound-controller--off');
  }
})(jQuery, window, document);
