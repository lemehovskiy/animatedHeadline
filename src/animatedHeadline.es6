/*

 animatedBrackets

 Author: lemehovskiy

 */

(function ($) {

    $.fn.animatedHeadline = function (options) {

        let settings = $.extend({
            duration: 0.5,
            autoplaySpeed: 2
        }, options);


        $(this).each(function () {

            let $this = $(this);
            let $current, $next;
            let animation_interval;
            let full_interval_ms = (settings.duration + settings.autoplaySpeed) * 1000;

            TweenLite.set($this.find('b:not(.active)'), {autoAlpha: 0});


            $(window).on('load resize', function(){
                console.log('asdfa');
                set_width();
            });


            function  set_width() {
                let width_arr = $this.find('b').map(function () {
                    return Math.round($(this).width());
                }).get();


                $this.css({
                    width: Math.max.apply(null, width_arr) + 'px'
                })
            }


            //init call
            animation(full_interval_ms);

            function animation(interval) {


                //clear current interval
                clearInterval(animation_interval);

                animation_interval = setInterval(function () {

                    let item_options;


                    $current = $this.find('b.active');

                    $next = $current.next();

                    if (!$next.length) {
                        $next = $this.find("b:first");
                    }


                    $current.removeClass('active');
                    $next.addClass('active');


                    TweenLite.to($current, settings.duration, {rotationX: 90, y: 25, autoAlpha: 0});
                    TweenLite.fromTo($next, settings.duration, {rotationX: -90, y: -25}, {
                        rotationX: 0,
                        y: 0,
                        autoAlpha: 1
                    });


                }, interval);

            }

        });

    }

})(jQuery);