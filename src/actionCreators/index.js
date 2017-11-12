/**
 * Create Initial Generation
 */
export const createInitialGeneration = (redirect) => {
    return (dispatch) => {
        dispatch({
            type: 'CREATE_INITIAL_GENERATION',
            generationId: 1
        });
        dispatch(redirect('/generation/1'));
    }
};

export const removeSamples = (generationId, sampleIds) => {
    return {
        type: 'REMOVE_SAMPLES',
        generationId: generationId,
        sampleIds: sampleIds
    }
}

/**
 * Generate Individuals
 * @param {integer} numIndividuals the number of individuals to generate 
 * @param {*} minExpressionDepth the minimum nesting level of individual expressions
 * @param {*} maxExpressionDepth the maximum nesting level of individual expressions
 */
export const generateIndividuals = (expressionBuilder, numIndividuals, minExpressionDepth, maxExpressionDepth) => {
    let id = 1;
    return {
        type: 'GENERATE_INDIVIDUALS',
        generationId: 1,
        individuals: new Array(numIndividuals).fill(1).map(n => {
            return {
                generationId: 1,
                id: id++,
                expression: expressionBuilder(minExpressionDepth, maxExpressionDepth),
                fitness: numIndividuals
            }
        }),
        minExpressionDepth,
        maxExpressionDepth
    };
};

/**
 * Evolve Individuals
 * @param {integer} generationId the generation id of the received individuals 
 * @param {array} individuals the individuals to evolve 
 */
export const evolveIndividuals = (individualsEvolver, redirect, generation) => {

    let generationId = generation.id + 1;
    let lastIndividualId = generation.individuals.reduce((a, n) => Math.max(a, n.id), 0);

    return (dispatch) => {
        
        dispatch({
            type: 'EVOLVE_INDIVIDUALS',
            generationId,
            individuals: individualsEvolver(generation.individuals).map(n => { return {...n, generationId, id: ++lastIndividualId }; })
        });

        dispatch(redirect(`/generation/${generationId}`));

    }
    
};

/**
 * Generate Samples from supplied data
 * @param {id} generationId Id of the generation the sample will belong to
 * @param {array} individuals array of individual objects from which to generate samples
 * @param {integer} numSamples number of sample objects to create
 * @param {int} width desired sample data width (image width)
 * @param {int} height desired sample data height (image height)
 * @param {[0, 255]} redThreshold array containing min/max red colour values
 * @param {[0, 255]} greenThreshold array containing min/max green colour values
 * @param {[0, 255]} blueThreshold array containing min/max blue colour values
 * @param {integer} lastSampleId (last sample id in the store)
 */
export const generateSamples = (selectByFitness, generation, numSamples, width, height, redThreshold, greenThreshold, blueThreshold, lastSampleId) => {
    
    let usedIndexes = [];
    let samples = [];

    for(let i = 0; i < numSamples; i++) {
        
        if(usedIndexes.length === generation.individuals.length) {
            usedIndexes = [];
        }
        
        usedIndexes.push(selectByFitness(generation.individuals.map(n => n.fitness), usedIndexes.slice())); 
        usedIndexes.push(selectByFitness(generation.individuals.map(n => n.fitness), usedIndexes.slice())); 
        usedIndexes.push(selectByFitness(generation.individuals.map(n => n.fitness), usedIndexes.slice())); 

        samples.push({
            generationId: generation.id,
            id: ++lastSampleId,
            redIndividualId: generation.individuals[usedIndexes[usedIndexes.length - 3]].id,
            greenIndividualId: generation.individuals[usedIndexes[usedIndexes.length - 2]].id,
            blueIndividualId: generation.individuals[usedIndexes[usedIndexes.length - 1]].id,
            width, height,
            redThreshold, greenThreshold, blueThreshold,
            fitness: 0,
            cache: {
                polar: null,
                cartesian: null,
            },
            processing: false
        });
    }

    return {
        type: 'GENERATE_SAMPLES',
        generationId: generation.id,
        samples
    };
};

export const updateSamples = (samples, redThreshold, greenThreshold, blueThreshold) => {
    return {
        type: 'UPDATE_SAMPLES',
        samples: samples.map((sample) => {
            return {
                ...sample,
                redThreshold,
                greenThreshold,
                blueThreshold
            }
        })
    }
}

export const generateSampleData = (addToWorkerQueue, sample, coordinateType) => {
    return (dispatch) => {

        dispatch({
            type: 'SAMPLE_DATA_GENERATING',
            sampleId: sample.id, 
            coordinateType
        });

        addToWorkerQueue({
            sample,
            coordinateType
        },
        (e) => {
            dispatch({
                type: 'SAMPLE_DATA_GENERATED',
                sampleId: sample.id,
                data: e.data,
                coordinateType
            });
        });
    }
};

export const increaseSampleFitness = (sample) => {
    return {
        type: 'INCREASE_SAMPLE_FITNESS',
        sampleId: sample.id,
        redIndividualId: sample.redIndividualId,
        greenIndividualId: sample.greenIndividualId,
        blueIndividualId: sample.blueIndividualId
    }
};

export const decreaseSampleFitness = (sample) => {
    return {
        type: 'DECREASE_SAMPLE_FITNESS',
        sampleId: sample.id,
        redIndividualId: sample.redIndividualId,
        greenIndividualId: sample.greenIndividualId,
        blueIndividualId: sample.blueIndividualId
    }
};

