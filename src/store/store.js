import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducers'; // Or wherever you keep your reducers
import { routerReducer, routerMiddleware } from 'react-router-redux';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const initialState = {
    generations: [],
    individuals: [],
    samples: [],
    config: {
        numberOfIndividuals: 0,
        minExpressionDepth: 0,
        maxExpressionDepth: 12
    }
};

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    initialState,
    applyMiddleware(middleware, thunk)
);

export default store;

  
  