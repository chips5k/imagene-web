import React, { Component } from 'react';

import {
    Content,
    ContentHeader,
    ContentBody,
    ContentPrimary,
    ContentSidebar
} from '../content';

import { 
    GenerationViewControls,
    GenerationSamples,
    GenerationIndividuals,
    GenerationEvolutionPanel,
    GenerationIndividualsPanel, 
    GenerationSamplesPanel 
} from './';

export default class Generation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'individuals',
            coordinateType: 'cartesian',
            symmetric: false
        };
    }

    onClickGenerateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth) {
        this.props.onClickGenerateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth);
        this.setState({
            activeView: 'individuals'
        });
    }

    onClickGenerateSamples(numSamples, sampleWidth, sampleHeight, redThreshold, greenThreshold, blueThreshold) {
        this.props.onClickGenerateSamples(
            this.props.generation,
            {
                numSamples, sampleWidth, sampleHeight,
                redThreshold, greenThreshold, blueThreshold
            }
        );

        this.setState({
            activeView: 'samples'
        });
    }


    onClickIncreaseFitness(sample) {
        this.props.increaseSampleFitness(this.props.generation, sample);
    }

    onClickDecreaseFitness(sample) {
        this.props.decreaseSampleFitness(this.props.generation, sample);
    }

    onClickEvolveNewGeneration(e) {
        e.preventDefault();
        this.props.evolveNewGeneration(this.props.generation);
    }
    
    changeView() {

    }
    changeCoordinateType() {

    }
    changeSymmetry() {
        
    }

    render() {

        return (
            <Content>
                <ContentHeader>
                    Generation {this.props.generation.id}
                </ContentHeader>
                <ContentBody>
                    <ContentPrimary>
                        <GenerationViewControls 
                            activeView={this.state.activeView} 
                            symmetric={this.state.symmetric} 
                            coordinateType={this.state.coordinateType} 
                            onClickView={this.changeActiveView} 
                            onClickCoordinateType={this.changeCoordinateType} 
                            onClickSymmetry={this.changeSymmetry} 
                        />

                        {this.state.activeView === 'individuals' && 
                            <GenerationIndividuals individuals={this.props.generation.individuals}/>
                        }
                        {this.state.activeView === 'samples' &&
                            <GenerationSamples
                                 samples={this.props.generation.samples} 
                                 coordinateType={this.state.coordinateType} 
                                 symmetric={this.state.symmetric}
                                 onClickIncreaseFitness={this.onClickIncreaseFitness}
                                 onClickDecreaseFitness={this.onClickDecreaseFitness}
                            />
                        }
                    </ContentPrimary>
                    <ContentSidebar>
                        {this.props.generation.id === 1 && 
                            <GenerationIndividualsPanel 
                                config={this.props.config} 
                                onClickGenerateIndividuals={this.onClickGenerateIndividuals.bind(this)}
                            />
                        }

                        {this.props.generation.individuals.length > 0 && 
                            <GenerationSamplesPanel 
                                onClickGenerateSamples={this.onClickGenerateSamples.bind(this)}
                            />
                        }
                        
                        {this.props.generation.samples.length > 0 && 
                           <GenerationEvolutionPanel onClickEvolveGeneration={this.onClickEvolveNewGeneration.bind(this)} />
                        }
                    </ContentSidebar>
                </ContentBody>
            </Content>
            
        );
    }
}