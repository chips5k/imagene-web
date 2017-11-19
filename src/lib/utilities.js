//Adapted from http://www.obitko.com/tutorials/genetic-algorithms/selection.php AND https://en.wikipedia.org/wiki/Fitness_proportionate_selection
export const selectRoulette = (selectIndex, selectWeight, weightedIndexes, weightedIndexesToExclude) => {
    const maxWeight = weightedIndexes.reduce((a, n) => Math.max(a, n));
    let iterations = 0;
    const MAX_ITERATIONS = 1000;
    while(iterations < MAX_ITERATIONS) {
        const currentIndex = selectIndex(0, weightedIndexes.length)
        if(selectWeight(0, 1) < weightedIndexes[currentIndex] / maxWeight) {
            if(!weightedIndexesToExclude || weightedIndexesToExclude.indexOf(currentIndex) === -1) {
                return currentIndex;
            }
        }
        iterations++;
    }
    
    return weightedIndexes.indexOf(weightedIndexes.reduce(function(a, b) {
        if(!weightedIndexesToExclude || weightedIndexesToExclude.indexOf(weightedIndexes.indexOf(b)) !== -1) {
            return Math.max(a, b);
        }
        return a;
    }));
    
}

export const selectTruncate = (weightedIndexes, percentageOfWeightedIndexesToRetain) => {
    //Truncation selection - select any individuals with a fitness value in the top 50%
    const maxWeight = weightedIndexes.reduce((a, n) => n > a ? n : a);
    const minWeight = weightedIndexes.reduce((a, n) => n < a ? n : a);
    const range = maxWeight - minWeight;
    let indexes = [];
    if(range !== 0) {
        for(let i = 0; i < weightedIndexes.length; i++) {
            if((weightedIndexes[i] - minWeight) / range >= percentageOfWeightedIndexesToRetain) {
                indexes.push(i);
            }
        }
    } else {
        indexes = weightedIndexes.map((n, i) => i);
    }
    return indexes;
}