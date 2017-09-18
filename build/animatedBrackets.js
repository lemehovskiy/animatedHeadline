'use strict';

/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedHeadline = function (options) {

        var settings = $.extend({
            duration: 1,
            autoplaySpeed: 2
        }, options);

        $(this).each(function () {

            var $this = $(this);
            var $current = void 0,
                $next = void 0;

            var interval = setInterval(animation, settings.duration + settings.autoplaySpeed * 1000);

            function animation() {
                $current = $this.find('b.active');
                $next = $current.removeClass('active').next();

                if (!$next.length) {
                    $next = $this.find("b:first").addClass('active');
                }

                $next.addClass('active');

                TweenLite.to($current, settings.duration, { rotationX: -90, y: -25, autoAlpha: .6 });
                TweenLite.fromTo($next, settings.duration, { rotationX: 90, y: 25 }, { rotationX: 0, y: 0, autoAlpha: 1 });
            }
        });
    };
})(jQuery);