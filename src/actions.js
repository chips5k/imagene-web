
export const updatePopulation = (population) => ({
    type: 'UPDATE_POPULATION',
    population
});

export const updateGeneration = (generation) => ({
    type: 'UPDATE_GENERATION',
    generation
});

export const newGeneration = (population) => ({
    type: 'NEW_GENERATION',
    population: population
});