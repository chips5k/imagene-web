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
            symmetric: false,
            contentSidebarVisible: true
        };
    }

    generateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth) {
        this.props.generateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth);
        this.setState({
            activeView: 'individuals'
        });
    }
    
    generateSamples(numSamples, width, height, redThreshold, greenThreshold, blueThreshold) {
        this.props.generateSamples(this.props.generation, numSamples, width, height, redThreshold, greenThreshold, blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
        });
    }

    evolveGeneration(e) {
        e.preventDefault();
        this.props.evolveGeneration(this.props.generation);
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

    toggleContentSidebar(e) {
        e.preventDefault();
        this.setState({
            contentSidebarVisible: !this.state.contentSidebarVisible
        });
    }

    render() {

        return (
            <Content>
                <ContentHeader toggleSidebar={this.props.toggleSidebar}>
                    Generation {this.props.generation.id}
                </ContentHeader>
                <ContentBody contentSidebarVisible={this.state.contentSidebarVisible}>
                    <ContentPrimary>
                        <GenerationViewControls 
                            view={this.state.activeView} 
                            symmetry={this.state.symmetric ? 'symmetric' : 'asymmetric'} 
                            coordinateType={this.state.coordinateType} 
                            onClickView={this.changeActiveView.bind(this)} 
                            onClickCoordinateType={this.changeCoordinateType.bind(this) }
                            onClickSymmetry={this.changeSymmetry.bind(this)} 
                            toggleContentSidebar={this.toggleContentSidebar.bind(this)}
                        />

                        {this.state.activeView === 'individuals' && 
                            <GenerationIndividuals individuals={this.props.generation.individuals}/>
                        }
                        {this.state.activeView === 'samples' &&
                            <GenerationSamples
                                 samples={this.props.generation.samples} 
                                 coordinateType={this.state.coordinateType} 
                                 symmetric={this.state.symmetric}
                                 increaseSampleFitness={this.props.increaseSampleFitness}
                                 decreaseSampleFitness={this.props.decreaseSampleFitness}
                                 generateSampleData={this.props.generateSampleData}
                            />
                        }
                    </ContentPrimary>
                    <ContentSidebar toggleContentSidebar={this.toggleContentSidebar.bind(this)}>
                        {this.props.generation.id === 1 && 
                            <GenerationIndividualsPanel 
                                config={this.props.config} 
                                onClickGenerateIndividuals={this.generateIndividuals.bind(this)}
                            />
                        }

                        {this.props.generation.individuals.length > 0 && 
                            <GenerationSamplesPanel 
                                onClickGenerateSamples={this.generateSamples.bind(this)}
                            />
                        }
                        
                        {this.props.generation.samples.length > 0 && 
                           <GenerationEvolutionPanel onClickEvolveGeneration={this.evolveGeneration.bind(this)} />
                        }
                    </ContentSidebar>
                </ContentBody>
            </Content>
        );
    }
}