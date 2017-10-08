import * as core from '../lib/core.js';
import { push } from 'react-router-redux';
import GenerationSampleWorker from '../lib/GenerationSampleWorker.worker.js';


const workerQueue = [];
const activeWorkers = [];
const inactiveWorkers = [];

const MAX_WORKERS = 6;
const addToWorkerQueue = (payload, callback) => {
    workerQueue.push({payload, callback});
    processWorkerQueue();
}

const processWorkerQueue = () => {
    if(workerQueue.length > 0) {
        if(inactiveWorkers.length > 0) {
            let worker = inactiveWorkers.pop();
            activeWorkers.push(worker);
            let item = workerQueue.shift();
            if(item) {
                worker.postMessage(item.payload);
                worker.onmessage = (e) => {
                    item.callback(e);
                    activeWorkers.splice(activeWorkers.indexOf(worker), 1);
                    inactiveWorkers.push(worker);
                    processWorkerQueue();
                }
            }
        } else {
            if(activeWorkers.length < MAX_WORKERS) {
                inactiveWorkers.push(new GenerationSampleWorker());
                processWorkerQueue();
            }
        }
    }
}

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
export const generateSamples = (generation, coordinateType, numSamples, width, height, redThreshold, greenThreshold, blueThreshold, lastSampleId) => {
    
    
    return (dispatch) => {
        let usedIndexes = [];
        
        for(let i = 0; i < numSamples; i++) {
            if(usedIndexes.length === generation.individuals.length) {
                usedIndexes = [];
            }
            
            
            usedIndexes.push(core.rouletteWheelSelection(generation.individuals, usedIndexes)); 
            usedIndexes.push(core.rouletteWheelSelection(generation.individuals, usedIndexes)); 
            usedIndexes.push(core.rouletteWheelSelection(generation.individuals, usedIndexes)); 

            let sample = {
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
                processing: true
            };

            dispatch({
                type: 'GENERATE_SAMPLE',
                generationId: generation.id,
                sample
            });

            addToWorkerQueue({
                redIndividual: generation.individuals[usedIndexes[usedIndexes.length - 3]],
                greenIndividual: generation.individuals[usedIndexes[usedIndexes.length - 2]],
                blueIndividual: generation.individuals[usedIndexes[usedIndexes.length - 1]],
                width, height,
                redThreshold, greenThreshold, blueThreshold,
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
        
    }
};

export const generateSampleData = (sample, coordinateType) => {
    return (dispatch) => {

        dispatch({
            type: 'SAMPLE_DATA_GENERATING',
            sampleId: sample.id, 
            coordinateType
        });

        addToWorkerQueue({
            redIndividual: sample.redIndividual,
            greenIndividual: sample.greenIndividual,
            blueIndividual: sample.blueIndividual,
            width: sample.width, height: sample.height,
            redThreshold: sample.redThreshold, 
            greenThreshold: sample.greenThreshold, 
            blueThreshold: sample.blueThreshold,
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
}
