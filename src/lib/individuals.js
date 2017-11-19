export const selectEvolutionMethod = (selectByWeight, crossOverIndividuals, mutateIndividual, crossOverChance, mutationChance) => {
    let options = [
        {
            weight: crossOverChance,
            method: crossOverIndividuals
        },
        {
            weight: mutationChance,
            method: mutateIndividual
        },
    ];
    
    let index = selectByWeight(options.map(n => n.weight));
    return options[index].method;
}

export const evolveIndividuals = (selectTruncate, selectEvolutionMethod, individuals) => {
    
    let evolvedIndividuals = selectTruncate(individuals.map(n => n.fitness), 0.5).map(n => individuals[n]);
    
    let iteration = 0;
    const iterationLimit = individuals.length * 4;
    
    while(evolvedIndividuals.length < individuals.length && iteration++ < iterationLimit) {
        let method = selectEvolutionMethod();
        evolvedIndividuals = method(evolvedIndividuals);
    } 

    return evolvedIndividuals;
}

export const crossOverIndividuals = (crossOverExpression, selectParentAIndex, selectParentBIndex, selectNumChildren, individuals)  => {

    const newIndividuals = individuals.slice();
    //Select two parents for crossover
    const byFitness = individuals.map(n => n.fitness);
    
    const parentAIndex = selectParentAIndex(byFitness);
    const parentBIndex = selectParentBIndex(byFitness, [parentAIndex]);
    
    if(parentAIndex !== -1 && parentBIndex !== -1) {
        const numChildren = selectNumChildren();
        for(var i = 0; i < numChildren; i++) {
            newIndividuals.push({
                expression: crossOverExpression(individuals[parentAIndex].expression, individuals[parentBIndex].expression),
                fitness: Math.floor((individuals[parentAIndex].fitness + individuals[parentBIndex].fitness) / 2)
            });
        }
    }

    return newIndividuals;
}

export const mutateIndividual = (mutateExpression, selectIndividualIndex, individuals) => { 
   
    const selectedIndividualIndex = selectIndividualIndex(individuals);
    if(selectedIndividualIndex !== -1) {
        const newIndividuals =  [...individuals];
        newIndividuals.splice(selectedIndividualIndex, 1, {
            ...newIndividuals[selectedIndividualIndex],
            expression: mutateExpression(newIndividuals[selectedIndividualIndex].expression)
        });

        return newIndividuals;
    }
    return individuals;
};
