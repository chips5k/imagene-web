export default (state = { numberOfIndividuals: 0, minExpressionDepth: 0, maxExpressionDepth: 0}, action) => {
    
    switch(action.type) {

        case 'PROCESS_IMPORT':
            return action.data.config;
        

        case 'CREATE_INITIAL_GENERATION':
            return {
                numberOfIndividuals: 24,
                minExpressionDepth: 0,
                maxExpressionDepth: 12
            };
            
        case 'GENERATE_INDIVIDUALS':
            return {
                numberOfIndividuals: action.individuals.length,
                minExpressionDepth: action.minExpressionDepth,
                maxExpressionDepth: action.maxExpressionDepth
            };

        default:
            return state;
    }
}