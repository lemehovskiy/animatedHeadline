export const getNextSlideIndex = (currentIndex, slidesLength) => {
    return currentIndex === slidesLength - 1 ? 0 : ++currentIndex;
}