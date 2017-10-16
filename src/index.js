//React Dependencies
import React from 'react';
import ReactDOM from 'react-dom';

//Redux dependencies
import { createStore, combineReducers, applyMiddleware, bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';

//Router dependencies
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

//Thunk for multi dispatch
import thunk from 'redux-thunk';

//Other dependencies
import Random from 'random-js';

//Our functions
import addToWorkerQueue from './lib/generationSampleWorkerQueue';
import reducers from './reducers';
import { getToken, tokenCreators, buildExpression, mutateExpression, crossOverExpressions } from './lib/expressions';
import {selectRoulette} from './lib/utilities';
import {selectEvolutionMethod, evolveIndividuals, mutateIndividual, crossOverIndividuals} from './lib/individuals';
import * as actionCreators from './actionCreators';

//Our components
import Layout from './components/Layout';

//Our containers
import Generation from './containers/Generation';
import Home from './containers/Home';
import Sidebar from './containers/Sidebar';


// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
export const store = createStore(
    combineReducers({
      ...reducers,
      router: routerReducer
    }),
    applyMiddleware(historyMiddleware, thunk)
);


//Initialite our random engine
const random = new Random(Random.engines.mt19937().autoSeed());

//Setup the random functions we plan to use 
const getRandomReal = (min, max) => {
    return random.real(min, max, true);
}
const getRandomInteger = (min, max) => {
    return random.integer(min, max);
}

//Bind functions
const tokenSelector = getToken.bind(null, tokenCreators, getRandomReal, getRandomInteger);
const expressionBuilder = buildExpression.bind(null, tokenSelector, getRandomInteger);
const rouletteSelector = selectRoulette.bind(null, getRandomReal); 
const evolutionMethodSelector = selectEvolutionMethod.bind(null, rouletteSelector);
const individualSelector = rouletteSelector;
const expressionMutator = mutateExpression.bind(null);
const expressionBreeder = crossOverExpressions.bind(null)
const individualMutator = mutateIndividual.bind(null, expressionMutator);
const individualBreeder = crossOverIndividuals.bind(null, expressionBreeder)
const individualsEvolver = evolveIndividuals.bind(null, tokenSelector, evolutionMethodSelector, individualSelector, individualMutator, individualBreeder);

// bind action creators to required functions
let partiallyAppliedActionCreators = {
    ...actionCreators,
    redirect: push,
    createInitialGeneration: actionCreators.createInitialGeneration.bind(null, push),
    generateIndividuals: actionCreators.generateIndividuals.bind(null, expressionBuilder),
    generateSamples: actionCreators.generateSamples.bind(null, getRandomReal),
    generateSampleData: actionCreators.generateSampleData.bind(null, addToWorkerQueue),
    evolveIndividuals: actionCreators.evolveIndividuals.bind(null, individualsEvolver)
}


//Bind action creators to dispatch
const mapStateToProps = () => ({  });
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators(partiallyAppliedActionCreators, dispatch)  
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)((props) => {
    return (
        <ConnectedRouter history={history}>
            <Layout>
                <Sidebar {...props} />
                {/* explicitly calling render on these routes in order to pass the match object to the routed component */}
                <Route exact path="/" render={({ match }) => <Home match={match} {...props} />} />
                <Route exact path="/generation/:id" render={({ match }) => <Generation match={match} {...props}/>} />
            </Layout> 
        </ConnectedRouter>
    );
});

// //Setup root element - this is easier to test with jest,
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

//Render the app, note we pass down the "Route" component and our actions as props
ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    root
);