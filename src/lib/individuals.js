import {cloneDeep} from 'lodash';

export const selectEvolutionMethod = (selectByFitness, elitismChance, crossOverChance, mutationChance, reductionChance) => {
    
    let options = [
        {
            name: 'elitism',
            fitness: elitismChance
        },
        {
            name: 'crossover',
            fitness: crossOverChance
        },
        {
            name: 'mutation',
            fitness: mutationChance
        },
        {
            name: 'reduction',
            fitness: reductionChance
        }
    ];
    
    let index = selectByFitness(options.map(n => n.fitness));
    return options[index].name;
}

export const evolveIndividuals = (tokenSelector, methodSelector, individualSelector, individualMutator, individualBreeder, getRandomInteger, sourceIndividuals) => {

    let individuals = [];
    let previousIndividuals = cloneDeep(sourceIndividuals);

    let selectedIndividualIndex;
    let iteration = 0;
    let limit = previousIndividuals.length;
   
    while(individuals.length < limit && iteration < limit * 4) {

        iteration++;
        
        //Determine what to do this iteration
        let method = methodSelector();
        
        switch(method) {   
            case 'elitism':
                selectedIndividualIndex = individualSelector(previousIndividuals.map(n => n.fitness));
                if(selectedIndividualIndex !== -1) {
                    individuals.push(previousIndividuals.splice(selectedIndividualIndex, 1)[0]);
                }
                
                break;

            //Crossover
            case 'crossover':
            
                //Select two parents for crossover
                let parentAIndex = individualSelector(previousIndividuals.map(n => n.fitness));
                let parentBIndex = individualSelector(previousIndividuals.map(n => n.fitness), [parentAIndex]);

                
                if(parentAIndex !== -1 && parentBIndex !== -1) {
                    let numChildren = getRandomInteger(1, 5);
                    for(var i = 0; i < numChildren; i++) {
                        let children = individualBreeder(previousIndividuals[parentAIndex], previousIndividuals[parentBIndex]);
                        individuals = individuals.concat(children);
                    }
                }

                break;

            //Mutation
            case 'mutation':
                selectedIndividualIndex = individualSelector(previousIndividuals.map(n => n.fitness));
                if(selectedIndividualIndex !== -1) {
                    individuals.push(individualMutator(previousIndividuals.splice(selectedIndividualIndex, 1)[0]));
                }
                break;
            case 'reduction':
                    limit--;
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
        fitness: (individualA.fitness + individualB.fitness) / 2
    }
}

export const mutateIndividual = (expressionMutator, individual) => {
    return {
        ...individual,
        expression: expressionMutator(individual.expression)
    }
};