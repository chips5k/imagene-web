import * as core from './core.js';

/**
 * Generate Population
 * @param {integer} numIndividuals the number of individuals to generate 
 * @param {*} minExpressionDepth the minimum nesting level of individual expressions
 * @param {*} maxExpressionDepth the maximum nesting level of individual expressions
 */
export const generatePopulation = (numIndividuals, minExpressionDepth, maxExpressionDepth) => {

    return {
        type: 'GENERATE_POPULATION',
        individuals: core.generateIndividuals(numIndividuals, minExpressionDepth, maxExpressionDepth),
        minExpressionDepth,
        maxExpressionDepth
    };
}

/**
 * Evolve Population
 * @param {integer} generationId the generation id of the received individuals 
 * @param {array} individuals the individuals to evolve 
 */
export const evolvePopulation = (generationId, individuals) => {
    return {
        type: 'EVOLVE_POPULATION',
        individuals: core.evolveIndividuals(individuals)
    };
};

export const generateSamples = (generationId, individuals, numSamples, width, height, redThreshold, greenThreshold, blueThreshold) => {
    
    let samples = [];
    for(let i = 0; i < numSamples; i++) {
        samples.push(core.createSample(generationId, individuals, width, height, redThreshold, greenThreshold, blueThreshold))
    }

    return {
        type: 'GENERATE_SAMPLES',
        samples
    }
};


// export const generateIndividuals = (generation, size, minDepth, maxDepth) => ({
//     type: 'GENERATE_INDIVIDUALS',
//     generation,
//     size,
//     minDepth,
//     maxDepth
// });




export const increaseSampleFitness = (generation, sample) => ({
    type: 'INCREASE_SAMPLE_FITNESS',
    generation, sample
})

export const decreaseSampleFitness = (generation, sample) => ({
    type: 'DECREASE_SAMPLE_FITNESS',
    generation, sample
})

/** New Action Creators */

/*
export const updateOperandFitness = () => {
    // - all of the above update the fitness values of operands, and operators
}
export const updateDoubleOperatorFitness = () => {
    // - all of the above update the fitness values of operands, and operators
}   
export const updateSingleOperatorFitness = () => {
    // - all of the above update the fitness values of operands, and operators
}

export const createInitialGeneration = () => {
    // - creates a new generation object with id 1
    // - removes all generations, individuals and samples from the store
    // - adds the new generation to the store
}

export const createInitialGenerationPopulation = () => {
    // - creates a set of individuals from specified config
    // - assigns individual ids to the initial generation
    // - updates the store with the new individuals
    // - updates the store with the updated generation
    // - updates initialGenerationConfig in the store
}

export const createSamples = () => {
    // - creates a set of samples for selected generation, based on config panel
    // - assigns the sample ids to the selected generation
    // - updates the store with the updated generation
    // - adds the samples to the store
}

export const updateSampleFitness = () => {
    // - updates fitness value of a sample
    // - distributes fitness value to underlying r,g,b individuals
    // - updates individuals in store
    // - updates sample in store
 }

export const evolveNewGeneration = () => {
    // - creates a new generation object
    // - generates new individuals from previous generation
    // - updates store with new individuals
    // - assigns individuals to new generation
    // - updates store with new generation
}

export const updateSample = () => {
    // - updates store with current data for sample
}

export const updateSamples = () => {
    // - updates a set of samples
}*/


/** Helper Functions */
/*
export const getLatestGenerationId = () => {
    //derived value
}
*/