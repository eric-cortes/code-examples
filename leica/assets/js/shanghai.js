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
  var phoneLoops;
  var playerLoading;
  if (md.mobile()) {
    $('.moduleTitle__video').append(
      '<video class="vid-portrait" src="/leica/assets/video/shanghai/miranda-barnes-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
    );
    $('.moduleTitle__video')
      .last()
      .append(
        '<video class="vid-landscape" src="/leica/assets/video/shanghai/miranda-barnes-landscape.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
      );

      if (window.innerHeight > window.innerWidth) {
        player = $('.moduleTitle__video video.vid-portrait');
        $('.phone-loops').append('<video src="/leica/assets/video/shanghai/phone-loops-portrait.mp4" type="video/mp4" playsinline muted loop preload="none"></video>');
      } else {
        player = $('.moduleTitle__video video.vid-landscape');
        $('.phone-loops').append('<video src="/leica/assets/video/shanghai/phone-loops-landscape.mp4" type="video/mp4" playsinline muted loop preload="none"></video>');
      }
  } else {
    $('.moduleTitle__video').append(
      '<video src="/leica/assets/video/shanghai/miranda-barnes.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
    );
    $('.phone-loops').append(
      '<video src="/leica/assets/video/shanghai/phone-loops-desktop.mp4" type="video/mp4" playsinline muted loop preload="none"></video>'
    );
    player = $('.moduleTitle__video video');
  }
  player.get(0).loadingAnimation = true;

  $(function() {
    $(document).ready(function() {
      $('.bg-placeholder')
        .first()
        .click();
      $('.fullpage-shanghai').fullpage({
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

      $('.shanghai-tale .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.shanghai-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.shanghai-sound').prop('muted', false);
        }
      });

      $('.shanghai-madness .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.shanghai-madness-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.shanghai-madness-sound').prop('muted', false);
        }
      });

      $('.colours .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.shanghai-colours-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.shanghai-colours-sound').prop('muted', false);
        }
      });

      $('.shanghai-light .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.shanghai-light-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.shanghai-light-sound').prop('muted', false);
        }
      });

      $('.berlin-section7 .sound-toggle').click(function() {
        if ($(this).hasClass('on')) {
          $(this).removeClass('on');
          $(this).addClass('off');
          $('.shanghai-shadows-sound').prop('muted', true);
        } else {
          $(this).removeClass('off');
          $(this).addClass('on');
          $('.sshanghai-shadows-sound').prop('muted', false);
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

      $('.fullpage-shanghai .mobile-overlay .overlay-close').on(
        'click',
        function() {
          $.fn.fullpage.reBuild();
          player.get(0).play();
          player.get(0).pause();
          $('.col-right video').get(0).play()
          $('.col-right video').prop('muted', false);
          $('.col-right video').prop('volume', 0.5);
          $('.shanghai-sound').prop('muted', true);
          $('.shanghai-sound').get(0).play();
          $('.shanghai-madness-sound').prop('muted', true);
          $('.shanghai-madness-sound').get(0).play();
          $('.shanghai-colours-sound').prop('muted', true);
          $('.shanghai-colours-sound').get(0).play();
          $('.shanghai-light-sound').prop('muted', true);
          $('.shanghai-light-sound').get(0).play();
          $('.shanghai-shadows-sound').prop('muted', true);
          $('.shanghai-shadows-sound').get(0).play();

          $('.fullpage-shanghai .mobile-overlay').hide();
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


      if (nextIndex === 2){
        $('.col-right video').get(0).play()
        $('.col-right video').prop('muted', false);
        $('.col-right video').prop('volume', 0.5);
      }

      if (nextIndex === 4) {
        $('.shanghai-tale .sound-toggle').removeClass('off');
        $('.shanghai-tale .sound-toggle').addClass('on');
        $('.shanghai-sound').prop('muted', false);
        $('.shanghai-sound').get(0).play();
      } else {
        $('.shanghai-sound').prop('muted', true);
      }

      if (nextIndex === 5) {
        $('.shanghai-madness .sound-toggle').removeClass('off');
        $('.shanghai-madness .sound-toggle').addClass('on');
        $('.shanghai-madness-sound').prop('muted', false);
        $('.shanghai-madness-sound').get(0).play();
      } else {
        $('.shanghai-madness-sound').prop('muted', true);
      }

      if (nextIndex === 6) {
        $('.colours .sound-toggle').removeClass('off');
        $('.colours .sound-toggle').addClass('on');
        $('.shanghai-colours-sound').prop('muted', false);
        $('.shanghai-colours-sound').get(0).play();
      } else {
        $('.shanghai-colours-sound').prop('muted', true);
      }

      if (nextIndex === 8) {
        $('.shanghai-light .sound-toggle').removeClass('off');
        $('.shanghai-light .sound-toggle').addClass('on');
        $('.shanghai-light-sound').prop('muted', false);
        $('.shanghai-light-sound').get(0).play();
      } else {
        $('.shanghai-light-sound').prop('muted', true);
      }

      if (nextIndex === 9) {
        $('.berlin-section7 .sound-toggle').removeClass('off');
        $('.berlin-section7 .sound-toggle').addClass('on');
        $('.shanghai-shadows-sound').prop('muted', false);
        $('.shanghai-shadows-sound').get(0).play();
      } else {
        $('.shanghai-shadows-sound').prop('muted', true);
      }

      if (nextIndex === 10) {
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
  var toHome = $('.js-toHome');
  var toPickup = $('.js-toPickup');
  var toMirandaBarnes = $('.js-toMirandaBarnes');
  var toShanghai = $('.js-toShanghai');
  var toMadness = $('.js-toMadness');
  var toColours = $('.js-toColours');
  var toLight = $('.js-toLight');
  var toShadows = $('.js-toShadows');
  var toShots = $('.js-toShots');
  toHome.on('click', function () {
    $.fn.fullpage.moveTo(1);
  })

  toPickup.on('click', function () {
    $.fn.fullpage.moveTo(2);
  })

  toMirandaBarnes.on('click', function () {
    $.fn.fullpage.moveTo(3);
  })

  toShanghai.on('click', function () {
    $.fn.fullpage.moveTo(4)
  })

  toMadness.on('click', function () {
    $.fn.fullpage.moveTo(5);
  })

  toColours.on('click', function () {
    $.fn.fullpage.moveTo(6);
  })

  toLight.on('click', function () {
    $.fn.fullpage.moveTo(8);
  })

  toShadows.on('click', function () {
    $.fn.fullpage.moveTo(9);
  })
  toShots.on('click', function () {
    $.fn.fullpage.moveTo(10);
  })

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
      if (nextIndex === 3) {
        resizeBgVideo();
        loadPlayer(0);
        player.get(0).muted = false;
        soundController[0].classList.remove('sound-controller--off');
      } else {
        clearTimeout(playerLoading);
      }
    }
  }

  function loadPlayer(i) {
    if (player.get(i).loadingAnimation) {
      videoSlide[i + 1].classList.add('moduleTitle--loading');
      if (i === 0) {
        playerLoading = setTimeout(function() {
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

})(jQuery, window, document);
