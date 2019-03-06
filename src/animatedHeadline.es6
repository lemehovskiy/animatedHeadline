require("./animatedHeadline.scss");
import {getNextSlideIndex, animate} from './helpers.es6';

/*
 Version: 1.0.1
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/animatedHeadline
 */

'use strict';

(function ($) {
    class AnimatedHeadline {
        constructor(element, options) {
            let self = this;

            //extend by function call
            this.settings = $.extend(true, {
                slideSettings: {
                    duration: 0.5,
                    autoplaySpeed: 1,
                    animationType: 'rotate'
                }
            }, options);

            this.$element = $(element);
            this.$elementItems = this.$element.find('b');

            //extend by data options
            this.data_options = self.$element.data('animated-headline');
            this.settings = $.extend(true, self.settings, self.data_options);

            this.state = {
                slides: [],
                currentSlideIndex: 0,
                slideHeight: 0,
                autoPlayInterval: undefined
            };

            this.init();
        }

        init() {
            let self = this;

            //hide not active
            TweenLite.set(this.$element.find('b:not(.active)'), {autoAlpha: 0});

            self.initCurrentSlideIndex();
            self.initSlideItems();

            $(window).on('load resize', function () {
                self.onResize();
            });

            this.startAutoPlay(this.state.slides[0].settings.autoplaySpeed);
        }

        onResize(){
            this.updateWidth();
            this.state.slideHeight = this.$elementItems.outerHeight();
        }

        initCurrentSlideIndex(){
            this.state.currentSlideIndex = this.$element.find('b.active').index();
        }

        initSlideItems(){
            let self = this;

            let slides = [];
            self.$elementItems.each(function () {
                let slide = {};
                let slideSettings = {};

                $.extend(true, slideSettings, self.settings.slideSettings, $(this).data('animated-headline-item'));

                slide.settings = slideSettings;
                slide.$element = $(this);
                slides.push(slide);
            });

            console.log(slides);

            this.state.slides = slides;
        }

        updateWidth() {
            if (this.settings.center_mode) {
                this.$elementItems.css({
                    width: 'auto'
                });
            }

            this.$element.css({
                width: 'auto'
            });

            let width_arr = this.$element.find('b').map(function () {
                return Math.round($(this).width());
            }).get();


            this.$element.css({
                width: Math.max.apply(null, width_arr) + 'px'
            })

            if (this.settings.center_mode) {
                this.$elementItems.css({
                    width: '100%'
                });
            }
        }

        startAutoPlay(interval) {
            let self = this;

            this.state.autoPlayInterval = setInterval(function () {
                let currentSlide = self.state.slides[self.state.currentSlideIndex];
                let slideItemInterval = currentSlide.settings.autoplaySpeed + currentSlide.settings.duration;

                if (interval != slideItemInterval) {
                    self.stopAutoPlay();
                    self.startAutoPlay(slideItemInterval);
                }

                self.showNextAutoPlaySlide();

            }, interval * 1000);
        }

        stopAutoPlay(){
            clearInterval(this.state.autoPlayInterval)
        }

        showNextAutoPlaySlide(){
            const nextSlideIndex = getNextSlideIndex(this.state.currentSlideIndex, this.state.slides.length);
            let currentSlide = this.state.slides[this.state.currentSlideIndex];
            let nextSlide = this.state.slides[nextSlideIndex];

            this.goToSlide({
                currentSlide: currentSlide,
                nextSlide: nextSlide,
                nextSlideIndex: nextSlideIndex
            })
        }

        goToSlide({currentSlide, nextSlide, nextSlideIndex}){
            this.showSlide({
                $element: nextSlide.$element,
                duration: nextSlide.settings.duration,
                animationType: nextSlide.settings.animationType
            });
            this.hideSlide({
                $element: currentSlide.$element,
                duration: nextSlide.settings.duration,
                animationType: currentSlide.settings.animationType
            });

            this.updateCurrentIndex(nextSlideIndex);
        }

        showSlide({$element, duration, animationType}) {
            $element.addClass('active');

            animate[animationType].in({
                $element: $element,
                duration: duration,
                slideHeight: this.state.slideHeight
            });
        }


        hideSlide({$element, duration, animationType}) {
            $element.removeClass('active');

            animate[animationType].out({
                $element: $element,
                duration: duration,
                slideHeight: this.state.slideHeight
            });
        }

        updateCurrentIndex(index) {
           this.state.currentSlideIndex = index
        }
    }

    $.fn.animatedHeadline = function () {
        let $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i,
            ret;
        for (i = 0; i < length; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                $this[i].scroller = new AnimatedHeadline($this[i], opt);
            else
                ret = $this[i].scroller[opt].apply($this[i].scroller, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };

})(jQuery);