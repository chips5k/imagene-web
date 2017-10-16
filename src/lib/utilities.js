//Adapted from http://www.obitko.com/tutorials/genetic-algorithms/selection.php AND https://en.wikipedia.org/wiki/Fitness_proportionate_selection
export const selectRoulette = (getRandomReal, items, excludedIndexes) => {
        
   
    //[Sum] Calculate sum of all fitnesses in population - sum S.
    let s = items.map(n => n.fitness).reduce((a, n) => a + n);
    
    //[Select] Generate random number from interval (0,S) - r.
    let r = getRandomReal(0, s);
    
    let c = 0;
    // [Loop] Go through the population and sum fitnesses from 0 - sum s.
    for(let i = 0; i < items.length; i++) {
        c += items[i].fitness;
        
        //When the sum s is greater then r, stop and return the chromosome where you are.
        if(c > r) {
            if(excludedIndexes) {
                if(excludedIndexes.indexOf(i) === -1) {
                    return i;
                }
            } else {
                return i;
            }
        }
    }

    if(excludedIndexes) {
        for(let i = items.length - 1; i > 0; i--) {
            if(excludedIndexes.indexOf(i) === -1) {
                return i;
            }
        }
        return -1;
    }

    return items.length - 1;
}