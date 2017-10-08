import * as core from '../lib/core.js';
import { push } from 'react-router-redux';


/**
 * Create Initial Generation
 */
export const createInitialGeneration = () => {
    return (dispatch) => {
        dispatch({
            type: 'CREATE_INITIAL_GENERATION',
            generationId: 1
        });

        dispatch(push('generation/1'));
    }
}

/**
 * Generate Individuals
 * @param {integer} numIndividuals the number of individuals to generate 
 * @param {*} minExpressionDepth the minimum nesting level of individual expressions
 * @param {*} maxExpressionDepth the maximum nesting level of individual expressions
 */
export const generateIndividuals = (numIndividuals, minExpressionDepth, maxExpressionDepth) => {
    let id = 1;
    return {
        type: 'GENERATE_INDIVIDUALS',
        generationId: 1,
        individuals: core.generateIndividuals(numIndividuals, minExpressionDepth, maxExpressionDepth).map(n => { return {...n, generationId: 1, id: id++ }; }),
        minExpressionDepth,
        maxExpressionDepth
    };
}

/**
 * Evolve Individuals
 * @param {integer} generationId the generation id of the received individuals 
 * @param {array} individuals the individuals to evolve 
 */
export const evolveIndividuals = (sourceGenerationId, individuals, lastIndividualId) => {

    let generationId = ++sourceGenerationId;

    return {
        type: 'EVOLVE_INDIVIDUALS',
        generationId,
        individuals: core.evolveIndividuals(individuals).map(n => { return {...n, generationId, id: ++lastIndividualId }; })
    };
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
export const generateSamples = (generationId, individuals, numSamples, width, height, redThreshold, greenThreshold, blueThreshold, lastSampleId) => {
    
     let samples = [];
    for(let i = 0; i < numSamples; i++) {

        let indexes = [];
        
        indexes.push(core.rouletteWheelSelection(individuals)); 
        indexes.push(core.rouletteWheelSelection(individuals, indexes)); 
        indexes.push(core.rouletteWheelSelection(individuals, indexes)); 

        samples.push({
            generationId,
            id: ++lastSampleId,
            redIndividualId: individuals[indexes[0]].id,
            greenIndividualId: individuals[indexes[1]].id,
            blueIndividualId: individuals[indexes[2]].id,
            width, height,
            redThreshold, greenThreshold, blueThreshold,
            fitness: 0      
        });
    }

    return {
        type: 'GENERATE_SAMPLES',
        generationId,
        samples
    }
};



