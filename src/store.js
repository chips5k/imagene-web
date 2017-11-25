import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducers from './reducers';

import persistState from 'redux-localstorage'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

export const slicer = (state) => {

    const samples = {};

    for(let id in state.samples.byId) {
        let sample = state.samples.byId[id];

        samples[id] = {
            ...sample,
            cache: {}
        }
    }

    return {
        ...state,
        samples: {
            ...state.samples,
            byId: samples
        }
    };

};  

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    compose(
        applyMiddleware(historyMiddleware, thunk),
        persistState(null, { slicer: (paths) => slicer })
    )
);

export default store;