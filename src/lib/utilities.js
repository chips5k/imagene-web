//Adapted from http://www.obitko.com/tutorials/genetic-algorithms/selection.php AND https://en.wikipedia.org/wiki/Fitness_proportionate_selection
export const selectRoulette = (getRandomReal, items, excludedIndexes) => {
    
    //[Sum] Calculate sum of all fitnesses in population - sum S.
    let s = items.reduce((a, n) => a + n, 0);


    //[Select] Generate random number from interval (0,S) - r.
    let r = getRandomReal(0, s);
    // [Loop] Go through the population and sum fitnesses from 0 - sum s.
    for(let i = 0; i < items.length; i++) {
        r -= items[i];

        if(r <= 0 ) {
            return i;
        }
    }

    return items.length - 1;
}

