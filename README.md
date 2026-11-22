# Imagene Web

An interactive in-browser genetic programming application that evolves mathematical expressions into procedural RGB imagery. Built with React, HTML5 Canvas, and Redux.

Live Demo: https://chips5k.github.io/imagene-web/

## Quickstart

1. Clone the repository:
   ```bash
   git clone https://github.com/chips5k/imagene-web.git
   ```
2. Install dependencies:
   ```bash
   cd imagene-web && yarn install
   ```
3. Start the development server:
   ```bash
   yarn start
   ```

## Overview

Imagene Web is a JavaScript rebuild of the original Imagene C++ application implementing genetic programming in the browser.

Users generate initial populations of random mathematical expressions. Image samples are produced by randomly selecting three mathematical expressions from the population to compute the Red, Green, and Blue pixel channels across Cartesian or polar coordinates.

Users evaluate and rank sample visual fitness. The application applies elitism, mutation, and crossover to evolve subsequent generations toward emergent visual patterns.

## React & Redux Architecture

The application implements a CQRS and Event-Sourcing mental model to structure state transitions cleanly:

- **Commands:** Triggered by UI user callbacks.
- **Command Handlers:** Execute business logic and emit discrete state events.
- **Actions/Events:** Immutable representations of past state occurrences.
- **Reducers:** Pure functions mapping events into application state.

## Application Data Structure

```json
{
    "generations": [{
        "individuals": [1, 2, 3],
        "samples": [1, 2, 3, 4]
    }],
    "individuals": [{
        "id": 0,
        "expression": [],
        "fitness": 0,
        "previousId": 0,
        "parentA": 0,
        "parentB": 0
    }],
    "samples": [{
        "id": 0,
        "redExpressionId": 0,
        "greenExpressionId": 0,
        "blueExpressionId": 0,
        "fitness": 0,
        "redThreshold": [0, 255],
        "greenThreshold": [0, 255],
        "blueThreshold": [0, 255],
        "width": 320,
        "height": 320,
        "type": "polar|cartesian",
        "symmetric": true
    }],
    "config": {
        "numberOfIndividuals": 24,
        "minExpressionDepth": 0,
        "maxExpressionDepth": 0
    }
}
```
