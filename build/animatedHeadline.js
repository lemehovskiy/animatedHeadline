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
                slideSettings: {
                    duration: 0.5,
                    autoplay_speed: 3
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

        _createClass(AnimatedHeadline, [{
            key: 'init',
            value: function init() {
                var self = this;

                //hide not active
                TweenLite.set(this.$element.find('b:not(.active)'), { autoAlpha: 0 });

                self.initCurrentSlideIndex();
                self.initSlideItems();

                $(window).on('load resize', function () {
                    self.onResize();
                });

                this.startAutoPlay(this.state.slides[0].settings.autoplay_speed);
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
                this.state.currentSlideIndex = this.$element.find('b.active').index();
            }
        }, {
            key: 'initSlideItems',
            value: function initSlideItems() {
                var self = this;

                var slides = [];
                self.$elementItems.each(function () {
                    var slide = {};
                    var slideSettings = {};

                    $.extend(true, slideSettings, self.settings.slideSettings, $(this).data('animated-headline-item'));

                    slide.settings = slideSettings;
                    slide.$element = $(this);
                    slides.push(slide);
                });

                this.state.slides = slides;
            }
        }, {
            key: 'updateWidth',
            value: function updateWidth() {
                if (this.settings.center_mode) {
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

                if (this.settings.center_mode) {
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
                    var currentSlide = self.state.slides[self.state.currentSlideIndex];
                    var slideItemInterval = currentSlide.settings.autoplay_speed + currentSlide.settings.duration;

                    if (interval != slideItemInterval) {
                        self.stopAutoPlay();
                        self.startAutoPlay(slideItemInterval);
                    }

                    self.showNextAutoPlaySlide();
                }, interval * 1000);
            }
        }, {
            key: 'stopAutoPlay',
            value: function stopAutoPlay() {
                clearInterval(this.state.autoPlayInterval);
            }
        }, {
            key: 'showNextAutoPlaySlide',
            value: function showNextAutoPlaySlide() {
                var nextSlideIndex = (0, _helpers.getNextSlideIndex)(this.state.currentSlideIndex, this.state.slides.length);
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

                this.showSlide({
                    $element: nextSlide.$element,
                    duration: nextSlide.settings.duration
                });
                this.hideSlide({
                    $element: currentSlide.$element,
                    duration: nextSlide.settings.duration
                });

                this.updateCurrentIndex(nextSlideIndex);
            }
        }, {
            key: 'showSlide',
            value: function showSlide(_ref2) {
                var $element = _ref2.$element,
                    duration = _ref2.duration;

                $element.addClass('active');
                TweenLite.fromTo($element, duration, { rotationX: 90, y: -this.state.slideHeight / 2 }, {
                    rotationX: 0,
                    y: 0,
                    autoAlpha: 1
                });
            }
        }, {
            key: 'hideSlide',
            value: function hideSlide(_ref3) {
                var $element = _ref3.$element,
                    duration = _ref3.duration;

                $element.removeClass('active');
                TweenLite.to($element, duration, { rotationX: -90, y: this.state.slideHeight / 2, autoAlpha: 0 });
            }
        }, {
            key: 'updateCurrentIndex',
            value: function updateCurrentIndex(index) {
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
});
//# sourceMappingURL=animatedHeadline.js.map