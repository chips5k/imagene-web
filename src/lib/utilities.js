//Adapted from http://www.obitko.com/tutorials/genetic-algorithms/selection.php AND https://en.wikipedia.org/wiki/Fitness_proportionate_selection
export const selectRoulette = (getRandomReal, getRandomInteger, items, excludedIndexes) => {

    const maxFitness = items.reduce((a, n) => Math.max(a, n));
    let iterations = 0;
    const MAX_ITERATIONS = 1000;
    while(iterations < MAX_ITERATIONS) {
        const currentIndex = getRandomInteger(0, items.length)
        if(getRandomReal(0, 1) < items[currentIndex] / maxFitness) {
            return currentIndex;
        }
        iterations++;
    }

    return items.length - 1;
}