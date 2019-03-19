require("./animatedHeadline.scss");
import {getNextSlideIndex, getRandomArbitrary, animate, initAnimationState} from './helpers.es6';

/*
 Version: 1.0.1
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/animatedHeadline
 */

'use strict';


const rafInterval = (callBack, interval) => {
    const startTime = performance.now();
    let lastTimeFraction = 0,
        timePassed = 0,
        timeFraction = 0,
        requestID = undefined;

    requestID = requestAnimationFrame(function tick(time) {
        timePassed = time - startTime;
        timeFraction = timePassed / interval;

        requestID = requestAnimationFrame(tick);

        if (timeFraction > lastTimeFraction + 1) {
            lastTimeFraction = timeFraction;
            callBack(requestID);
        }

    })
}

let rafIntervalId = undefined;

rafInterval((id) => {
    rafIntervalId = id;
    console.log('testInterval');

}, 2000);


const clearRafInterval = (interval) => {
    console.log(interval);

    console.log('clearRafInterval');
    cancelAnimationFrame(rafIntervalId)
};

setTimeout(clearRafInterval, 5000, rafIntervalId);

(function ($) {

    class AnimatedHeadline {
        constructor(element, options) {
            let self = this;
            //extend by function call
            this.settings = $.extend(true, {
                autoPlay: true,
                centerMode: true,
                slideSettings: {
                    autoplaySpeed: 1,
                    animation: {
                        type: 'rotate',
                        duration: 1,
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
            self.initCurrentSlideIndex();
            self.initSlideItems();
            self.onResize();
            self.initSlideItemsInitState();
            $(window).on('resize', this.onResize.bind(this));
            if (this.settings.autoPlay) this.initAutoPlay();
        }

        initSlideItemsInitState() {
            this.state.slides.forEach((slide, index) => {
                if (index === this.state.currentSlideIndex) return;
                initAnimationState[slide.animation.type]({
                    slide: slide,
                    slideHeight: this.state.slideHeight
                })
            })
        }

        initAutoPlay() {
            let slide = this.state.slides[0];
            this.startAutoPlay(slide.autoplaySpeed + slide.animation.duration);
        }

        onResize() {
            this.updateWidth();
            this.state.slideHeight = this.$elementItems.outerHeight();
        }

        initCurrentSlideIndex() {
            this.state.currentSlideIndex = this.$element.find('.animate-headline__item.active').index();
        }

        initSlideItems() {
            let self = this,
                slides = [];
            self.$elementItems.each(function () {
                let slide = {};
                $.extend(true, slide, self.settings.slideSettings, $(this).data('animated-headline-item'));

                $(this).wrapInner("<b class='animate-headline__item-inner'></b>")
                slide.$elementInner = $(this).find('.animate-headline__item-inner');

                if (slide.animation.type === 'contratiempo') {
                    let letters = [];
                    let characters = $(this).text().split("");
                    slide.$elementInner.empty();

                    $.each(characters, function (i, el) {
                        const isSpace = el === ' ';
                        const outputContent = isSpace ? "&nbsp;" : el;
                        const $letter = $("<span>" + outputContent + "</span>");

                        if (!isSpace) letters.push({
                            $element: $letter
                        });

                        slide.$elementInner.append($letter);
                    });
                    slide.letters = letters;
                }
                slide.$element = $(this);
                slides.push(slide);
            });
            this.state.slides = slides;
        }


        updateWidth() {
            if (this.settings.centerMode) {
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

            if (this.settings.centerMode) {
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
                const slideItemInterval = slide.autoplaySpeed + slide.animation.duration + slide.animation.delay;

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
                slide: nextSlide,
                duration: nextSlide.animation.duration,
                delay: nextSlide.animation.delay
            });
            this.hideSlide({
                slide: currentSlide,
                duration: nextSlide.animation.duration,
                delay: nextSlide.animation.delay
            });

            this.updateIndex(nextSlideIndex);
        }

        showSlide({slide, duration, delay}) {
            slide.$element.addClass('active');
            animate[slide.animation.type].in({
                slide: slide,
                duration: duration,
                delay: delay,
                slideHeight: this.state.slideHeight
            });
        }

        hideSlide({slide, duration, delay}) {
            slide.$element.removeClass('active');
            animate[slide.animation.type].out({
                slide: slide,
                duration: duration,
                delay: delay,
                slideHeight: this.state.slideHeight
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