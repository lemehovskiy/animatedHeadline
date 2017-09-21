'use strict';

/*

 animatedHeadline

 Author: lemehovskiy

 */

;(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {

    $.fn.animatedHeadline = function (options) {

        var general_settings = $.extend({
            duration: 0.5,
            autoplay_speed: 2,
            center_mode: false
        }, options);

        $(this).each(function () {

            var $this = $(this),
                $slide_items = $this.find('b'),
                items_height = void 0,
                slides = [],
                current_index = void 0,
                loop_interval = void 0;

            init();

            function init() {

                //hide not active
                TweenLite.set($this.find('b:not(.active)'), { autoAlpha: 0 });

                //set init index
                current_index = $this.find('b.active').index();

                //generate items arr
                $slide_items.each(function () {

                    var $this_item = $(this);

                    var slide = {};

                    slide.settings = $.extend({}, general_settings, $this_item.data('animated-headline-item'));

                    slide.element = $this_item;

                    slides.push(slide);
                });

                $(window).on('load resize', function () {
                    set_width();

                    items_height = $slide_items.outerHeight();
                });

                run_interval(slides[0].settings.autoplay_speed);
            }

            function set_width() {

                if (general_settings.center_mode) {
                    $slide_items.css({
                        width: 'auto'
                    });
                }

                $this.css({
                    width: 'auto'
                });

                var width_arr = $this.find('b').map(function () {
                    return Math.round($(this).width());
                }).get();

                $this.css({
                    width: Math.max.apply(null, width_arr) + 'px'
                });

                if (general_settings.center_mode) {
                    $slide_items.css({
                        width: '100%'
                    });
                }
            }

            function run_interval(interval) {

                clearInterval(loop_interval);

                loop_interval = setInterval(function () {

                    update_current_index();

                    var item_interval = slides[current_index].settings.autoplay_speed + slides[current_index].settings.duration;

                    if (interval != item_interval) {
                        run_interval(item_interval);
                    }

                    show_item({
                        element: slides[current_index].element,
                        duration: slides[current_index].settings.duration
                    });
                    hide_item({
                        element: slides[get_prev_index(current_index)].element,
                        duration: slides[current_index].settings.duration
                    });
                }, interval * 1000);
            }

            function show_item(settings) {

                settings.element.addClass('active');

                TweenLite.fromTo(settings.element, settings.duration, { rotationX: 90, y: -items_height / 2 }, {
                    rotationX: 0,
                    y: 0,
                    autoAlpha: 1
                });
            }

            function hide_item(settings) {

                settings.element.removeClass('active');

                TweenLite.to(settings.element, settings.duration, { rotationX: -90, y: items_height / 2, autoAlpha: 0 });
            }

            function update_current_index() {

                if (current_index == slides.length - 1) {
                    current_index = 0;
                } else {
                    current_index++;
                }
            }

            function get_prev_index(prev_index) {
                if (prev_index == 0) {
                    return slides.length - 1;
                } else {
                    return prev_index - 1;
                }
            }
        });
    };
});