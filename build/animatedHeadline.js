(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(2);


/*
 Version: 1.0.1
 Author: lemehovskiy
 Website: http://lemehovskiy.github.io
 Repo: https://github.com/lemehovskiy/animatedHeadline
 */

'use strict';

(function ($) {
    var AnimatedHeadline = function () {
        function AnimatedHeadline(element, options) {
            _classCallCheck(this, AnimatedHeadline);

            var self = this;

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

        _createClass(AnimatedHeadline, [{
            key: 'init',
            value: function init() {
                var self = this;
                self.initCurrentSlideIndex();
                self.initSlideItems();
                self.onResize();
                self.initSlideItemsInitState();

                $(window).on('resize', this.onResize.bind(this));
                if (this.settings.autoPlay) this.initAutoPlay();
            }
        }, {
            key: 'initSlideItemsInitState',
            value: function initSlideItemsInitState() {
                var _this = this;

                this.state.slides.forEach(function (slide, index) {
                    if (index === _this.state.currentSlideIndex) return;
                    _helpers.initAnimationState[slide.animation.type]({
                        slide: slide,
                        slideHeight: _this.state.slideHeight
                    });
                });
            }
        }, {
            key: 'initAutoPlay',
            value: function initAutoPlay() {
                var slide = this.state.slides[0];
                this.startAutoPlay(slide.autoplaySpeed + slide.animation.duration);
            }
        }, {
            key: 'onResize',
            value: function onResize() {
                this.updateWidth();
                this.state.slideHeight = this.$elementItems.outerHeight();
            }
        }, {
            key: 'initCurrentSlideIndex',
            value: function initCurrentSlideIndex() {
                this.state.currentSlideIndex = this.$element.find('.animate-headline__item.active').index();
            }
        }, {
            key: 'initSlideItems',
            value: function initSlideItems() {
                var self = this;
                var slides = [];
                self.$elementItems.each(function () {
                    var slide = {};
                    $.extend(true, slide, self.settings.slideSettings, $(this).data('animated-headline-item'));

                    $(this).wrapInner("<b class='animate-headline__item-inner'></b>");
                    slide.$elementInner = $(this).find('.animate-headline__item-inner');

                    if (slide.animation.type === 'contratiempo') {
                        var letters = [];
                        var characters = $(this).text().split("");
                        slide.$elementInner.empty();

                        $.each(characters, function (i, el) {
                            var isSpace = el === ' ';
                            var outputContent = isSpace ? "&nbsp;" : el;
                            var $letter = $("<span>" + outputContent + "</span>");

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
        }, {
            key: 'updateWidth',
            value: function updateWidth() {
                if (this.settings.centerMode) {
                    this.$elementItems.css({
                        width: 'auto'
                    });
                }

                this.$element.css({
                    width: 'auto'
                });

                var width_arr = this.$element.find('b').map(function () {
                    return Math.round($(this).width());
                }).get();

                this.$element.css({
                    width: Math.max.apply(null, width_arr) + 'px'
                });

                if (this.settings.centerMode) {
                    this.$elementItems.css({
                        width: '100%'
                    });
                }
            }
        }, {
            key: 'startAutoPlay',
            value: function startAutoPlay(interval) {
                var self = this;
                this.state.autoPlayInterval = setInterval(function () {
                    var nextSlideIndex = (0, _helpers.getNextSlideIndex)(self.state.currentSlideIndex, self.state.slides.length);
                    var slide = self.state.slides[nextSlideIndex];
                    var slideItemInterval = slide.autoplaySpeed + slide.animation.duration + slide.animation.delay;

                    if (interval != slideItemInterval) {
                        self.stopAutoPlay();
                        self.startAutoPlay(slideItemInterval);
                    }

                    self.showNextAutoPlaySlide(nextSlideIndex);
                }, interval * 1000);
            }
        }, {
            key: 'stopAutoPlay',
            value: function stopAutoPlay() {
                clearInterval(this.state.autoPlayInterval);
            }
        }, {
            key: 'showNextAutoPlaySlide',
            value: function showNextAutoPlaySlide(nextSlideIndex) {
                var currentSlide = this.state.slides[this.state.currentSlideIndex];
                var nextSlide = this.state.slides[nextSlideIndex];

                this.goToSlide({
                    currentSlide: currentSlide,
                    nextSlide: nextSlide,
                    nextSlideIndex: nextSlideIndex
                });
            }
        }, {
            key: 'goToSlide',
            value: function goToSlide(_ref) {
                var currentSlide = _ref.currentSlide,
                    nextSlide = _ref.nextSlide,
                    nextSlideIndex = _ref.nextSlideIndex;

                console.log(nextSlide);
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
        }, {
            key: 'showSlide',
            value: function showSlide(_ref2) {
                var slide = _ref2.slide,
                    duration = _ref2.duration,
                    delay = _ref2.delay;

                slide.$element.addClass('active');
                _helpers.animate[slide.animation.type].in({
                    slide: slide,
                    duration: duration,
                    delay: delay,
                    slideHeight: this.state.slideHeight
                });
            }
        }, {
            key: 'hideSlide',
            value: function hideSlide(_ref3) {
                var slide = _ref3.slide,
                    duration = _ref3.duration,
                    delay = _ref3.delay;

                slide.$element.removeClass('active');
                _helpers.animate[slide.animation.type].out({
                    slide: slide,
                    duration: duration,
                    delay: delay,
                    slideHeight: this.state.slideHeight
                });
            }
        }, {
            key: 'updateIndex',
            value: function updateIndex(index) {
                this.state.prevSlideIndex = this.state.currentSlideIndex;
                this.state.currentSlideIndex = index;
            }
        }]);

        return AnimatedHeadline;
    }();

    $.fn.animatedHeadline = function () {
        var $this = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            length = $this.length,
            i = void 0,
            ret = void 0;
        for (i = 0; i < length; i++) {
            if ((typeof opt === 'undefined' ? 'undefined' : _typeof(opt)) == 'object' || typeof opt == 'undefined') $this[i].scroller = new AnimatedHeadline($this[i], opt);else ret = $this[i].scroller[opt].apply($this[i].scroller, args);
            if (typeof ret != 'undefined') return ret;
        }
        return $this;
    };
})(jQuery);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var getNextSlideIndex = exports.getNextSlideIndex = function getNextSlideIndex(currentIndex, slidesLength) {
    return currentIndex === slidesLength - 1 ? 0 : ++currentIndex;
};

var getRandomArbitrary = exports.getRandomArbitrary = function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

var animate = exports.animate = {
    'rotate': {
        'in': function _in(props) {
            console.log('rotate');
            TweenLite.fromTo(props.slide.$element, props.duration, {
                rotationX: 90, y: -props.slideHeight / 2
            }, {
                rotationX: 0,
                y: 0,
                autoAlpha: 1
            });
        },
        'out': function out(props) {
            console.log('rotate');
            TweenLite.to(props.slide.$element, props.duration, {
                rotationX: -90, y: props.slideHeight / 2, autoAlpha: 0
            });
        }
    },
    'fade': {
        'in': function _in(props) {
            TweenLite.fromTo(props.slide.$element, props.duration, {
                autoAlpha: 0
            }, {
                autoAlpha: 1
            });
        },
        'out': function out(props) {
            TweenLite.to(props.slide.$element, props.duration, {
                autoAlpha: 0
            });
        }
    },
    'clip': {
        'in': function _in(props) {
            console.log('clipIn');
            TweenLite.fromTo(props.slide.$elementInner, props.duration, {
                y: "-100%"
            }, {
                y: "0%"
            });
        },
        'out': function out(props) {
            TweenLite.to(props.slide.$elementInner, props.duration, {
                y: '100%'
            });
        }
    },

    'contratiempo': {
        'in': function _in(props) {
            var shuffleLetters = props.slide.letters.sort(function () {
                return .5 - Math.random();
            });

            shuffleLetters.forEach(function (letter, index) {
                var duration = props.duration;
                var randDuration = getRandomArbitrary(duration / 100 * 50, duration);
                var delay = getRandomArbitrary(0, duration - randDuration) + props.delay;

                if (index === 0 || index === letter.length + 1) {
                    TweenLite.fromTo(letter.$element, duration, {
                        x: Math.random() < 0.5 ? -15 : 15,
                        autoAlpha: 0
                    }, {
                        x: 0,
                        autoAlpha: 1,
                        delay: props.delay
                    });
                } else {
                    TweenLite.fromTo(letter.$element, randDuration, {
                        autoAlpha: 0
                    }, {
                        autoAlpha: 1,
                        delay: delay
                    });
                }
            });
        },
        'out': function out(props) {
            props.slide.letters.forEach(function (letter) {
                TweenLite.to(letter.$element, props.duration, {
                    autoAlpha: 0
                });
            });
        }
    }
};

var initAnimationState = exports.initAnimationState = {
    'rotate': function rotate(props) {
        TweenLite.set(props.slide.$element, {
            rotationX: -90, y: props.slideHeight / 2, autoAlpha: 0
        });
    },
    'fade': function fade(props) {
        TweenLite.set(props.slide.$element, {
            autoAlpha: 0
        });
    },
    'clip': function clip(props) {
        TweenLite.set(props.slide.$elementInner, {
            y: '-100%'
        });
    },
    'contratiempo': function contratiempo(props) {
        props.slide.letters.forEach(function (letter) {
            TweenLite.set(letter.$element, {
                autoAlpha: 0
            });
        });
    }
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=animatedHeadline.js.map