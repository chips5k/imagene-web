import {cloneDeep} from 'lodash';

export const selectEvolutionMethod = (selectByFitness, crossOverChance, mutationChance) => {
    
    let options = [
        {
            name: 'crossover',
            fitness: crossOverChance
        },
        {
            name: 'mutation',
            fitness: mutationChance
        },
    ];
    
    let index = selectByFitness(options.map(n => n.fitness));
    return options[index].name;
}

export const evolveIndividuals = (tokenSelector, methodSelector, individualSelector, individualMutator, individualBreeder, getRandomInteger, sourceIndividuals) => {

    let individuals = [];
    const previousIndividuals = cloneDeep(sourceIndividuals);

    let selectedIndividualIndex;
    let iteration = 0;
    const iterationLimit = previousIndividuals.length * 4;

    const byFitness = previousIndividuals.map(n => n.fitness);
    //Truncation selection - select any individuals with a fitness value in the top 50%
    const maxFitness = byFitness.reduce((a, n) => n > a ? n : a);
    const minFitness = byFitness.reduce((a, n) => n < a ? n : a);
    const range = maxFitness - minFitness;
    if(range === 0) {
        individuals = [...previousIndividuals];
    } else {
        individuals = previousIndividuals.filter(n => {
            return (n.fitness - minFitness) / range >= 0.5;
        });
    }
   
    while(individuals.length < previousIndividuals.length && iteration < iterationLimit) {

        iteration++;
        
        //Determine what to do this iteration
        let method = methodSelector();
        
        switch(method) {   
            
            //Crossover
            case 'crossover':
            
                //Select two parents for crossover
                const parentAIndex = individualSelector(individuals.map(n => n.fitness));
                const parentBIndex = individualSelector(individuals.map(n => n.fitness), [parentAIndex]);

                
                if(parentAIndex !== -1 && parentBIndex !== -1) {
                    const numChildren = getRandomInteger(1, 5);
                    for(var i = 0; i < numChildren; i++) {
                        individuals.push(individualBreeder(individuals[parentAIndex], individuals[parentBIndex]));
                    }
                }

                break;

            //Mutation
            case 'mutation':
                selectedIndividualIndex = getRandomInteger(0, individuals.length - 1);
                if(selectedIndividualIndex !== -1) {
                    individuals.splice(selectedIndividualIndex, 1, (individualMutator(individuals[selectedIndividualIndex])));
                }
                break;

            default:
                break;
        }
    }
    

    return individuals;
}

export const crossOverIndividuals = (expressionBreeder, individualA, individualB)  => {
    return {
        expression: expressionBreeder(individualA.expression, individualB.expression),
        fitness: Math.floor((individualA.fitness + individualB.fitness) / 3)
    }
}

export const mutateIndividual = (expressionMutator, individual) => {
    return {
        ...individual,
        expression: expressionMutator(individual.expression)
    }
};