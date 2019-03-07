export const getNextSlideIndex = (currentIndex, slidesLength) => {
    return currentIndex === slidesLength - 1 ? 0 : ++currentIndex;
}

export const animate = {
    'rotate': {
        'in': (props) => {
            console.log('rotate');
            TweenLite.fromTo(
                props.slide.$element,
                props.duration,
                {
                    rotationX: 90, y: -props.slideHeight / 2
                },
                {
                    rotationX: 0,
                    y: 0,
                    autoAlpha: 1
                }
            );
        },
        'out': (props) => {
            console.log('rotate');
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
                    autoAlpha: 1
                }
            );
        },
        'out': (props) => {
            TweenLite.to(
                props.slide.$element,
                props.duration,
                {
                    autoAlpha: 0
                }
            );
        }
    },
    'clip': {
        'in': (props) => {
            console.log('clipIn');
            TweenLite.fromTo(
                props.slide.$elementInner,
                props.duration,
                {
                    y: "-100%"
                },
                {
                    y: "0%"
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


export const initAnimationState = {
    'rotate': (props) => {
        TweenLite.set(
            props.slide.$element,
            {
                rotationX: -90, y: props.slideHeight / 2, autoAlpha: 0
            }
        );
    },
    'fade': (props) => {
        TweenLite.set(props.slide.$element,
            {
                autoAlpha: 0
            }
        );
    },
    'clip': (props) => {
        TweenLite.set(
            props.slide.$elementInner,
            {
                y: '-100%'
            }
        );
    }
}