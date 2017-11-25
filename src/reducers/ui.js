export default (state = { exporting: false}, action) => {
    switch(action.type) {
        case 'START_IMPORT':
            return {
                ...state,
                importing: true
            }
        
        default:
            return state;
    }
}