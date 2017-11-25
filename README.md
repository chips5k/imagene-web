# Imagene Web

https://chips5k.github.io/imagene-web/

[![Build Status](https://travis-ci.org/chips5k/imagene-web.svg?branch=master)](https://travis-ci.org/chips5k/imagene-web)

Imagene Web is a rebuild of the existing Imagene C++ application.
The application is a basic implementation of genetic programming.

Users create initial populations of math expressions.
From this population, image samples are generated by randomly selecting three individuals of the population to become the inputs for the R, G and B components of each pixel coordinate.

Upon generating samples, users may rank the fitness of each sample. The ranking/fitness assigned is averaged and applied to the underlying individuals for the R, G and B Components.

Once a user is happy with the fitness levels of the current generation/population individuals, they may choose to "evolve" the population into a new generation.

Evolving a population creates a new generation by applying elitism, mutation and crossover to the previous individuals. 

You can view the application in action here: 
https://chips5k.github.io/imagene-web/

### React/Redux Usage
Due to the flexible nature of both react and redux, and the many possible interpretations of how to structure applications utilizing these technologies, i have outlined below, my approach. Ultimately my approach can be seen as an interpretation of CQRS and Event sourcing. This made the most sense for my application and assisted in identifying where responsibilities lie in a clean manner.

#### Action Creators
I have chosen to consider Action Creators, and the act of calling/triggering them analoguous to Command Handlers and Commands.

When an event is performed in the UI, a callback is triggered, i consider this to be the "Command".

The callback being trigger is considered to be the "Command Handler" and is responsible for performing any "Business Logic". The Command Handler then emits "Events" (actions), describing the change that occured, which are processed by the reducers and converted into state. 

#### Actions
As described previously, actions are treated as events, e.g something that HAS occured (past tense). The actions/events, should and do contain enough data to represent the result of a command being processed.

#### Reducers
Reducers are responsible for converting an event into state.


#### Container Components
At this moment in time, i have chosen to implement a single container component, that is responsible for both bootstrapping the application with relevant components such as routers, stores/reducers etc... and providing my components with the data and functions they require as "props". This intended to keep my components unaware of redux.


## Application Data Structure

```json
{
    generations: [{
        individuals: [1, 2, 3],
        samples: [1, 2, 3, 4]
    }],
    individuals: [{
        id: 0,
        expression: [...],
        fitness: 0
        previousId: 0,
        parentA: 0,
        parentB: 0
    }],
    samples: [{
        id: 0,
        redExpressionId: 0,
        greenExpressionId: 0,
        blueExpressionId: 0,
        fitness: 0,
        redThreshold: [0, 255],
        greenThreshold: [0, 255],
        blueThreshold: [0, 255],
        width: 320,
        height: 320,
        type: 'polar|cartesian'
        symmetric: true,
        cache: []
    }],
    config: {
        numberOfIndividuals: 24,
        minExpressionDepth: 0,
        maxExpressionDepth: 0,
    },
    operands: [{
        key: 'pX',
        value: (x, y) => x,
        fitness: 0
    }],
    doubleOperators: [{
        key: '+',
        value: (a, b) => a + b,
        fitness: 0
    }],
    singleOperators: [{
        key: 'sin',
        value: (n) => Math.sin(n)
    }]
}
```

    

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).