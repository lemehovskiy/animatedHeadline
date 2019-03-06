export const getNextSlideIndex = (currentIndex, slidesLength) => {
    return currentIndex === slidesLength - 1 ? 0 : ++currentIndex;
}

export const animate = {
    'rotate': {
        'in': (props) => {
            TweenLite.fromTo(
                props.slide.$element,
                props.duration,
                {
                    rotationX: 90, y: -props.slideHeight / 2
                },
                {
                    rotationX: 0,
                    y: 0,
                    autoAlpha: 1,
                    delay: props.slide.animation.delay
                }
            );
        },
        'out': (props) => {
            TweenLite.to(
                props.slide.$element,
                props.duration,
                {
                    rotationX: -90, y: props.slideHeight / 2, autoAlpha: 0
                }
            );
        }
    },
    'fade': {
        'in': (props) => {
            TweenLite.fromTo(
                props.slide.$element,
                props.duration,
                {
                    autoAlpha: 0
                },
                {
                    autoAlpha: 1,
                    delay: props.slide.animation.delay
                }
            );
        },
        'out': (props) => {
            TweenLite.to(props.$element, props.duration,
                {
                    autoAlpha: 0
                });
        }
    },
    'clip': {
        'in': (props) => {
            TweenLite.fromTo(
                props.slide.$elementInner,
                props.duration,
                {
                    y: '-100%'
                },
                {
                    y: 0,
                    delay: props.slide.animation.delay
                }
            );
        },
        'out': (props) => {
            TweenLite.to(
                props.slide.$elementInner,
                props.duration,
                {
                    y: '100%'
                });
        }
    }
}