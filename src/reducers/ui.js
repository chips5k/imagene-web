export default (state = { exporting: false}, action) => {
    switch(action.type) {
        case 'PROCESS_IMPORT':
            return {
                importing: false
            }

        default:
            return state;
    }
}