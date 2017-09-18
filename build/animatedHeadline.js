'use strict';

/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedHeadline = function (options) {

        var settings = $.extend({
            duration: 0.5,
            autoplaySpeed: 2
        }, options);

        $(this).each(function () {

            var $this = $(this);
            var $current = void 0,
                $next = void 0;
            var animation_interval = void 0;
            var full_interval_ms = (settings.duration + settings.autoplaySpeed) * 1000;
            var items_height = void 0;

            TweenLite.set($this.find('b:not(.active)'), { autoAlpha: 0 });

            $(window).on('load resize', function () {
                set_width();

                items_height = $this.find('b').outerHeight();
            });

            function set_width() {

                $this.css({
                    width: 'auto'
                });

                var width_arr = $this.find('b').map(function () {
                    return Math.round($(this).width());
                }).get();

                $this.css({
                    width: Math.max.apply(null, width_arr) + 'px'
                });
            }

            //init call
            animation(full_interval_ms);

            function animation(interval) {

                //clear current interval
                clearInterval(animation_interval);

                animation_interval = setInterval(function () {

                    var item_options = void 0;

                    $current = $this.find('b.active');

                    $next = $current.next();

                    if (!$next.length) {
                        $next = $this.find("b:first");
                    }

                    $current.removeClass('active');
                    $next.addClass('active');

                    TweenLite.to($current, settings.duration, { rotationX: 90, y: items_height / 2, autoAlpha: 0 });
                    TweenLite.fromTo($next, settings.duration, { rotationX: -90, y: -items_height / 2 }, {
                        rotationX: 0,
                        y: 0,
                        autoAlpha: 1
                    });
                }, interval);
            }
        });
    };
})(jQuery);