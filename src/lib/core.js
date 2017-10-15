// import { cloneDeep } from 'lodash';



// function mutateIndividual(tokenDefinitions, individual) {

//     let expression = [...individual.expression];
    
//     let index = getRandomInt(0, expression.length - 1);

//     let token = expression[index];

//     if(tokenDefinitions.hasSingleOperator(token)) {

//         //Swap token for another operand
//         expression.splice(index, 1, tokenDefinitions.getRandomSingleOperator());
//     }

//     if(tokenDefinitions.hasDoubleOperator(token)) {
//         //Swap token for another operand
//         expression.splice(index, 1, tokenDefinitions.getRandomDoubleOperator());
//     }

//     if(tokenDefinitions.hasOperand(token)) {
//         let chance = getRandomInt(0, 1);
//         switch(chance) {
//             case 0:
               
//                 //Swap token for another operand
//                 expression.splice(index, 1, tokenDefinitions.getRandomOperand());
//                 break;
//             case 1:
//             default:
//                 //Swap token for a subexpression
//                 expression.splice(index, 1, ...buildRpnExpression(tokenDefinitions, 0, 6, 0))
//                 break;
//         }
//     }
//     return {...individual, expression};
// }

// function crossOverIndividuals(individualA, individualB) {

//     let selection = getRandomInt(0, 1);
//     let parentFrom = selection === 1 ? individualB : individualA;
//     let parentTo = selection === 1 ? individualA : individualB;
    

//     let fromIndex = getRandomInt(0, parentFrom.expression.length - 1);
//     //Find all operator nodes
//     let expression = parentFrom.expression.slice(0, fromIndex);

//     let toIndex = getRandomInt(0, parentTo.expression.length - 1);

//     let individual = {...parentTo, id: ++ids.individuals, expression: [...parentTo.expression]};
//     individual.expression.splice(0, toIndex, ...expression);

//     return individual;
// }

// export const evolveIndividuals = function(tokenDefinitions, sourceIndividuals) {

//     let individuals = [];
//     let previousIndividuals = cloneDeep(sourceIndividuals);

//     let methods = [
//         {
//             type: 'elitism',
//             fitness: 0.5
//         }, 
//         {
//             type: 'crossover',
//             fitness: 0.5
//         }, 
//         {
//             type: 'mutation',
//             fitness: 0.5
//         }
//     ];


//     let selectedIndividualIndex;
//     let iteration = 0;
//     let limit = previousIndividuals.length;
//     while(individuals.length < limit && iteration < limit) {

//         iteration++;

//         //Determine what to do this iteration
//         let method = methods[rouletteWheelSelection(methods)];

//         switch(method.type) {   
//             case 'elitism':
//                 selectedIndividualIndex = rouletteWheelSelection(previousIndividuals);
//                 if(selectedIndividualIndex !== -1) {
//                     individuals.push(previousIndividuals.splice(selectedIndividualIndex, 1)[0]);
//                 } else {
//                     limit--;
//                 }
                
//                 break;

//             //Crossover
//             case 'crossover':
//                 //Select two parents for crossover
//                 let parentAIndex = rouletteWheelSelection(previousIndividuals);
//                 let parentBIndex = rouletteWheelSelection(previousIndividuals, [parentAIndex]);

//                 if(parentAIndex !== -1 && parentBIndex !== -1) {
//                     //determine number of children to produce 
//                     let numChildren = getRandomInt(1, 3);

//                     //Generate children via crossover
//                     for(let i = 0; i < numChildren; i++) {
//                         individuals.push(crossOverIndividuals(previousIndividuals[parentAIndex], previousIndividuals[parentBIndex]));
//                     }
//                 }

//                 break;

//             //Mutation
//             case 'mutation':
//                 selectedIndividualIndex = rouletteWheelSelection(previousIndividuals);
//                 if(selectedIndividualIndex !== -1) {
//                     individuals.push(mutateIndividual(tokenDefinitions, previousIndividuals.splice(selectedIndividualIndex, 1)[0]));
//                 } else {
//                     limit--;
//                 }

//                 break;
//             default:
//                 break;
//         }
//     }
    

//     return individuals;
// }

