
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
