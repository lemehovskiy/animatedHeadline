export const getNextSlideIndex = (currentIndex, slidesLength) => {
    return currentIndex === slidesLength - 1 ? 0 : ++currentIndex;
}

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
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
                    autoAlpha: 1
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
    },

    'contratiempo': {
        'in': (props) => {
            const shuffleLetters = props.slide.letters.sort(() => { return .5 - Math.random() });

            shuffleLetters.forEach((letter, index) => {
                const duration = props.duration;
                const randDuration = getRandomArbitrary(duration / 100 * 50, duration);
                const delay = getRandomArbitrary(0, duration - randDuration) + props.delay;

                if (index === 0 || index === letter.length + 1) {
                    TweenLite.fromTo(
                        letter.$element,
                        duration,
                        {
                            x: Math.random() < 0.5 ? -15 : 15,
                            autoAlpha: 0
                        },
                        {
                            x: 0,
                            autoAlpha: 1,
                            delay: props.delay
                        }
                    )
                }
                else {
                    TweenLite.fromTo(
                        letter.$element,
                        randDuration,
                        {
                            autoAlpha: 0
                        },
                        {
                            autoAlpha: 1,
                            delay: delay
                        }
                    )
                }
            })
        },
        'out': (props) => {
            props.slide.letters.forEach(letter => {
                TweenLite.to(
                    letter.$element,
                    props.duration,
                    {
                        autoAlpha: 0
                    }
                )

            })
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
    },
    'contratiempo': (props) => {
        props.slide.letters.forEach(letter => {
            TweenLite.set(letter.$element,
                {
                    autoAlpha: 0
                }
            );

        })
    }
}