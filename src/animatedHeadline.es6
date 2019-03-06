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
                    autoplaySpeed: 1,
                    animation: {
                        type: 'rotate',
                        duration: 0.5,
                        delay: 0
                    }

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
                prevSlideIndex: undefined,
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

            this.initAutoPlay();

        }

        initAutoPlay(){
            let slide = this.state.slides[0];
            this.startAutoPlay(slide.settings.autoplaySpeed + slide.settings.animation.duration);
        }

        onResize() {
            this.updateWidth();
            this.state.slideHeight = this.$elementItems.outerHeight();
        }

        initCurrentSlideIndex() {
            this.state.currentSlideIndex = this.$element.find('b.active').index();
        }

        initSlideItems() {
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
                const nextSlideIndex = getNextSlideIndex(self.state.currentSlideIndex, self.state.slides.length);
                const slide = self.state.slides[nextSlideIndex];
                const slideItemInterval = slide.settings.autoplaySpeed + slide.settings.animation.duration;

                if (interval != slideItemInterval) {
                    self.stopAutoPlay();
                    self.startAutoPlay(slideItemInterval);
                }

                self.showNextAutoPlaySlide(nextSlideIndex);

            }, interval * 1000);
        }

        stopAutoPlay() {
            clearInterval(this.state.autoPlayInterval)
        }

        showNextAutoPlaySlide(nextSlideIndex) {
            let currentSlide = this.state.slides[this.state.currentSlideIndex];
            let nextSlide = this.state.slides[nextSlideIndex];

            this.goToSlide({
                currentSlide: currentSlide,
                nextSlide: nextSlide,
                nextSlideIndex: nextSlideIndex
            })
        }

        goToSlide({currentSlide, nextSlide, nextSlideIndex}) {
            this.showSlide({
                $element: nextSlide.$element,
                duration: nextSlide.settings.animation.duration,
                animation: nextSlide.settings.animation
            });
            this.hideSlide({
                $element: currentSlide.$element,
                duration: nextSlide.settings.animation.duration,
                animation: currentSlide.settings.animation
            });

            this.updateIndex(nextSlideIndex);
        }

        showSlide({$element, duration, animation}) {
            $element.addClass('active');

            animate[animation.type].in({
                $element: $element,
                duration: duration,
                slideHeight: this.state.slideHeight,
                animation: animation
            });
        }

        hideSlide({$element, duration, animation}) {
            $element.removeClass('active');

            animate[animation.type].out({
                $element: $element,
                duration: duration,
                slideHeight: this.state.slideHeight,
                animation: animation
            });
        }

        updateIndex(index) {
            this.state.prevSlideIndex = this.state.currentSlideIndex;
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