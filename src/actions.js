
export const generateIndividuals = (generation, size, minDepth, maxDepth) => ({
    type: 'GENERATE_INDIVIDUALS',
    generation,
    size,
    minDepth,
    maxDepth
});

export const generateSamples = (generation, config) => ({
    type: 'GENERATE_SAMPLES',
    generation,
    config
});

export const createGeneration = (generation) => ({
    type: 'NEW_GENERATION',
    generation
});


export const increaseSampleFitness = (generation, sample) => ({
    type: 'INCREASE_SAMPLE_FITNESS',
    generation, sample
})

export const decreaseSampleFitness = (generation, sample) => ({
    type: 'DECREASE_SAMPLE_FITNESS',
    generation, sample
})