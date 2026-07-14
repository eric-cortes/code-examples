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
  $('header').css('display', 'block');

  $(function () {
    $(document).ready(function () {
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

      $(window).resize(function() {
        $.fn.fullpage.reBuild();
      });

      if (md.mobile()) {
        $('.mobile-overlay').css('display', 'flex');
      }

      $('.moduleMap .mobile-overlay .overlay-close').on('click', function () {
        $('.moduleMap .mobile-overlay').hide();
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

    function handleSectionChange(nextIndex, direction) {
      if (direction === 'down') {
        $('header').addClass('slide-up');
      } else if (direction === 'up') {
        $('header').removeClass('slide-up');
      }

      if (nextIndex === 2) {
        $('.moduleMap').addClass('load');
        $('.moduleMenu').find('.square').addClass('load');
        $('.section .moduleMap .diagram').addClass("animation");
      }
    }
  });
})(jQuery, window, document);
