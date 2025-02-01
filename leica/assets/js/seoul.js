/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2018. MIT licensed.
 */
(function($, window, document, undefined) {
  var swiperGallery = new Swiper('.swiper-gallery-module', {
    init: false,
    lazy: true,
    loop: true,
    observer: true,
    pagination: {
      el: '.swiper-pagination'
    },
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });

  var swiperGalleryTwo = new Swiper('.swiper-gallerytwo-module', {
    init: false,
    lazy: true,
    loop: true,
    observer: true,
    pagination: {
      el: '.swiper-pagination'
    },
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
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
  var player;
  var introLoading;
  if (md.mobile()) {
    $('.moduleTitle__video').append(
      '<video class="vid-portrait" src="/leica/assets/video/seoul/seoul-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
    );
    $('.moduleTitle__video')
      .last()
      .append(
        '<video class="vid-landscape" src="/leica/assets/video/seoul/seoul.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
      );

      if (window.innerHeight > window.innerWidth) {
        player = $('.moduleTitle__video video.vid-portrait');
      } else {
        player = $('.moduleTitle__video video.vid-landscape');
      }
  } else {
    $('.moduleTitle__video').append(
      '<video src="/leica/assets/video/seoul/seoul.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
    );
    player = $('.moduleTitle__video video')
  }
  player.get(0).loadingAnimation = true;

  $(function() {
    $(document).ready(function() {
      $('.bg-placeholder')
        .first()
        .click();
      $('.fullpage-milan').fullpage({
        afterLoad: function(anchorLink, index) {
          $('.section').removeClass('loading');
        },
        onLeave: function(index, nextIndex, direction) {
          handleSectionChange(index, nextIndex, direction),
            $.fn.fullpage.reBuild();
        }
      });

      $(window).trigger('resize');
      $('.bg-placeholder')
        .first()
        .click();

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
        resizeBgVideo();
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }

      $('.seoul-pickup .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.seoul-pickup-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.seoul-pickup-sound').prop('muted', false);
        }
      });

      $('.seoul-tale .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.seoul-tale-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.seoul-tale-sound').prop('muted', false);
        }
      });

      $('.seoul.metropolis .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.seoul-metropolis-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.seoul-metropolis-sound').prop('muted', false);
        }
      });

      $('.seoul-tradition .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.seoul-tradition-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.seoul-tradition-sound').prop('muted', false);
        }
      });

      $('.seoul-approach .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.seoul-approach-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.seoul-approach-sound').prop('muted', false);
        }
      });

      // google autoplay policy handle - require user interaction
      $.fn.fullpage.setMouseWheelScrolling(false);
      $(window).on('click', function() {
        $.fn.fullpage.setMouseWheelScrolling(true);
      });

      // add animation on 1st slide
      setTimeout(function() {
        $('#indicator').addClass('indicator');
      }, 1500);

      $('.fullpage-milan .mobile-overlay .overlay-close').on(
        'click',
        function() {
          $.fn.fullpage.reBuild();
          $('.fullpage-milan .mobile-overlay').hide();
        }
      );

      $('.scroll--down').click(function() {
        $.fn.fullpage.moveSectionDown();
      });

      $('.scroll--intro').click(function() {
        $.fn.fullpage.moveSlideRight();
      });

      $('.scroll--about').click(function() {
        $.fn.fullpage.moveSlideLeft();
      });
    });

    function handleSectionChange(index, nextIndex, direction) {
      var md = new MobileDetect(window.navigator.userAgent);

      $('.redtrail').removeClass('slide-' + index);
      $('.redtrail').addClass('slide-' + nextIndex);

      startVideoOnSectionChange(index, nextIndex);

      if (nextIndex === 3) {
        $('.seoul-pickup .sound-toggle').removeClass('off');
        $('.seoul-pickup .sound-toggle').addClass('on');
        $('.seoul-pickup-sound').prop('muted', false);
        $('.seoul-pickup-sound')
          .get(0)
          .play();
      } else {
        $('.seoul-pickup-sound').prop('muted', true);
      }

      if (nextIndex === 4) {
        $('.seoul-tale .sound-toggle').removeClass('off');
        $('.seoul-tale .sound-toggle').addClass('on');
        $('.seoul-tale-sound').prop('muted', false);
        $('.seoul-tale-sound')
          .get(0)
          .play();
      } else {
        $('.seoul-tale-sound').prop('muted', true);
      }

      if (nextIndex === 5) {
        $('.seoul.metropolis .sound-toggle').removeClass('off');
        $('.seoul.metropolis .sound-toggle').addClass('on');
        $('.seoul-metropolis-sound').prop('muted', false);
        $('.seoul-metropolis-sound')
          .get(0)
          .play();
      } else {
        $('.seoul-metropolis-sound').prop('muted', true);
      }

      if (nextIndex === 6) {
        $('.seoul-tradition .sound-toggle').removeClass('off');
        $('.seoul-tradition .sound-toggle').addClass('on');
        $('.seoul-tradition-sound').prop('muted', false);
        $('.seoul-tradition-sound')
          .get(0)
          .play();
      } else {
        $('.seoul-tradition-sound').prop('muted', true);
      }

      if (nextIndex === 7) {
        $('.seoul-approach .sound-toggle').removeClass('off');
        $('.seoul-approach .sound-toggle').addClass('on');
        $('.seoul-approach-sound').prop('muted', false);
        $('.seoul-approach-sound')
          .get(0)
          .play();
      } else {
        $('.seoul-approach-sound').prop('muted', true);
      }

      if (nextIndex === 9) {
        $('.modulePictureSlider .scroll').removeClass('scrollOut');
        swiperGallery.init();
        $('.modulePictureSlider .single-image').show();
        setTimeout(function() {
          $('.swiper-gallery-module .swiper-button-next').css(
            'background-size',
            '0'
          );
          $('.swiper-gallery-module .swiper-button-prev').css(
            'background-size',
            '0'
          );
        }, 700);

        [
          $('.modulePictureSlider .swiper-button-next'),
          $('.modulePictureSlider .swiper-button-prev')
        ].forEach(function(button) {
          button.click(function() {
            $('.modulePictureSlider .title').addClass('animationOut');
            $('.modulePictureSlider .subtitle').addClass('animationOut');
            $('.modulePictureSlider .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSlider .single-image').hide();
            }, 800);
          });
        });
      } else if (nextIndex === 16) {
        $('.modulePictureSlider .scroll').removeClass('scrollOut');
        swiperGalleryTwo.init();
        $('.modulePictureSlider .single-image').show();
        setTimeout(function() {
          $('.swiper-gallerytwo-module .swiper-button-next').css(
            'background-size',
            '0'
          );
          $('.swiper-gallerytwo-module .swiper-button-prev').css(
            'background-size',
            '0'
          );
        }, 700);

        [
          $('.modulePictureSlider .swiper-button-next'),
          $('.modulePictureSlider .swiper-button-prev')
        ].forEach(function(button) {
          button.click(function() {
            $('.modulePictureSlider .title').addClass('animationOut');
            $('.modulePictureSlider .subtitle').addClass('animationOut');
            $('.modulePictureSlider .scroll').addClass('scrollOut');
            setTimeout(function() {
              $('.modulePictureSlider .single-image').hide();
            }, 800);
          });
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

  var volume = [];
  var soundController = document.getElementsByClassName('sound-controller');

  // M A P  L I N K S

  var sections = document.querySelectorAll('.js-section');
  sections[0].addEventListener('click', function() {
    $.fn.fullpage.moveTo(1);
  });
  sections[0].addEventListener('click', function() {
    $.fn.fullpage.moveTo(1);
  });
  sections[1].addEventListener('click', function() {
    $.fn.fullpage.moveTo(2);
  });
  sections[2].addEventListener('click', function() {
    $.fn.fullpage.moveTo(3);
  });
  sections[3].addEventListener('click', function() {
    $.fn.fullpage.moveTo(4);
  });
  sections[4].addEventListener('click', function() {
    $.fn.fullpage.moveTo(5);
  });
  sections[5].addEventListener('click', function() {
    $.fn.fullpage.moveTo(6);
  });
  sections[6].addEventListener('click', function() {
    $.fn.fullpage.moveTo(7);
  });
  sections[7].addEventListener('click', function() {
    $.fn.fullpage.moveTo(8);
  });
  sections[8].addEventListener('click', function() {
    $.fn.fullpage.moveTo(9);
  });
  sections[9].addEventListener('click', function() {
    $.fn.fullpage.moveTo(9), $.fn.fullpage.moveTo(16);
  }); // problems with redirect
  sections[10].addEventListener('click', function() {
    $.fn.fullpage.moveTo(9), $.fn.fullpage.moveTo(16), $.fn.fullpage.moveTo(22);
  }); // problems with redirect

  //  P L A Y & P A U S E   -- C L I C K
  videoSlide[1].addEventListener('click', function(event) {
    var videoScroll = document.getElementById('scroll-video');
    if (event.target === soundController[0]) {
    } else if (event.target === videoScroll) {
      player.get(0).pause();
    } else {
      player.get(0).paused ? player.get(0).play() : player.get(0).pause();
    }
  });

  // S O U N D  C O N T R O L L E R S   -- C L I C K
  soundController[0].addEventListener('click', function() {
    setupVolume.call(this, 0);
  });

  function resizeBgVideo() {
    if (window.innerHeight / window.innerWidth >= 0.5625) {
      var videoWidth = (window.innerHeight * 183.5) / window.innerWidth;
      $('.moduleTitle__video video').css('width', videoWidth + '%');
    } else {
      var videoHeight = (window.innerWidth * 56.25) / window.innerHeight;
      $('.moduleTitle__video video').css('height', videoHeight + '%');
    }
  }

  // P A U S E    O N    C H A N G E + ANIMATIONS
  function startVideoOnSectionChange(index, nextIndex) {
    if (player) {
      player.get(0).pause();
      if (nextIndex === 2) {
        resizeBgVideo();
        loadPlayer(0);
        player.get(0).muted = false;
        soundController[0].classList.remove('sound-controller--off');
      } else {
        clearTimeout(introLoading);
      }
    }
  }

  function loadPlayer(i) {
    if (player.get(i).loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      if (i === 0) {
        introLoading = setTimeout(function() {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          player.get(i).play();
          setTimeout(function() {
            videoSlide[i + 1].classList.remove('moduleTitle--loading-off');
            videoSlide[i + 1].classList.remove('moduleTitle--loading');
          }, 1000);
        }, 3000);
      } else {
        processLoading = setTimeout(function() {
          videoSlide[i + 1].classList.add('moduleTitle--loading-off');
          player.get(i).play();
          setTimeout(function() {
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

  function setupVolume(i) {
    player.get(i).muted = !player.get(i).muted;

    player.get(i).muted
      ? this.classList.add('sound-controller--off')
      : this.classList.remove('sound-controller--off');
  }

  $('.milan-pickup .sound-toggle').click(function() {
    var muted = $('.col-left video').prop('muted');
    $('.col-left video').prop('muted', !muted);
    !muted
      ? $(this)
          .addClass('on')
          .removeClass('off')
      : $(this)
          .removeClass('on')
          .addClass('off');
  });
})(jQuery, window, document);
