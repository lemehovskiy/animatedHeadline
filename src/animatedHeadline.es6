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
            let options_updated = false;

            TweenLite.set($this.find('b:not(.active)'), {autoAlpha: 0});


            //init call
            animation((settings.duration + settings.autoplaySpeed) * 1000);

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

                    item_options = $current.data('animated-headline-item');


                    console.log(item_options);


                    //
                    //
                    // // alert({duration: 0.5} === {})
                    //
                    // console.log('interval');
                    //
                    // console.log(item_options);
                    //
                    //
                    // //check for item settings

                    // if (item_options != undefined) {
                    //
                    //     settings = $.extend(settings, item_options);
                    //
                    //     animation((settings.duration + settings.autoplaySpeed) * 1000);
                    //
                    //     options_updated = true;
                    //
                    //     console.log('statement');
                    //
                    //     return;
                    // }


                    TweenLite.to($current, settings.duration, {rotationX: 90, y: 25, autoAlpha: 0});
                    TweenLite.fromTo($next, settings.duration, {rotationX: -90, y: -25}, {
                        rotationX: 0,
                        y: 0,
                        autoAlpha: 1
                    });

                    options_updated = false;


                }, interval);

            }

        });

    }

})(jQuery);