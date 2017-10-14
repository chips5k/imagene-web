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

export default addToWorkerQueue;