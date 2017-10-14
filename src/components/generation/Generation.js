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

    onClickGenerateSamples(numSamples, width, height, redThreshold, greenThreshold, blueThreshold) {
        this.props.onClickGenerateSamples(numSamples, width, height, redThreshold, greenThreshold, blueThreshold);
        this.setState({
            activeView: 'samples'
        });
    }

    onClickEvolveNewGeneration(e) {
        e.preventDefault();
        this.props.onClickEvolveNewGeneration(this.props.generation);
    }

    changeActiveView(view) {
        this.setState({
            activeView: view
        });
    }   
    changeCoordinateType(coordinateType) {
        this.setState({
            coordinateType: coordinateType
        });
    }
    changeSymmetry(symmetry) {
        this.setState({
            symmetric: symmetry === 'symmetric'
        });
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
                            view={this.state.activeView} 
                            symmetry={this.state.symmetric ? 'symmetric' : 'asymmetric'} 
                            coordinateType={this.state.coordinateType} 
                            onClickView={this.changeActiveView.bind(this)} 
                            onClickCoordinateType={this.changeCoordinateType.bind(this) }
                            onClickSymmetry={this.changeSymmetry.bind(this)} 
                        />

                        {this.state.activeView === 'individuals' && 
                            <GenerationIndividuals individuals={this.props.generation.individuals}/>
                        }
                        {this.state.activeView === 'samples' &&
                            <GenerationSamples
                                 samples={this.props.generation.samples} 
                                 coordinateType={this.state.coordinateType} 
                                 symmetric={this.state.symmetric}
                                 onClickIncreaseSampleFitness={this.props.onClickIncreaseSampleFitness}
                                 onClickDecreaseSampleFitness={this.props.onClickDecreaseSampleFitness}
                                 generateSampleData={this.props.generateSampleData}
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
                           <GenerationEvolutionPanel onClickEvolveNewGeneration={this.onClickEvolveNewGeneration.bind(this)} />
                        }
                    </ContentSidebar>
                </ContentBody>
            </Content>
        );
    }
}