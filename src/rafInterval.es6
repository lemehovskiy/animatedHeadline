export const setRafInterval = (callBack, interval, idCallback) => {
    const startTime = performance.now();
    let lastTimeFraction = 0,
        timePassed = 0,
        timeFraction = 0;
    idCallback(requestAnimationFrame(function tick(time) {
            timePassed = time - startTime;
            timeFraction = timePassed / interval;
            idCallback(requestAnimationFrame(tick));

            if (timeFraction > lastTimeFraction + 1) {
                lastTimeFraction = timeFraction;
                callBack();
            }
        })
    )
}

export const clearRafInterval = (id) => {
    cancelAnimationFrame(id)
};

// EXAMPLE:
//
// let counter = 0;
// let testRafInterval = setRafInterval(() => {
//         if (counter++ === 2) {
//             clearRafInterval(testRafInterval)
//         }
//     },
//     2000, id => {
//         testRafInterval = id
//     }
// );