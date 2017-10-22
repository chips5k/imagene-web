import React, { Component } from 'react';

import {
    Content,
    ContentHeader,
    ContentBody,
    ContentPrimary,
    ContentPrimaryTopNav,
    ContentPrimaryBottomNav,
    ContentPrimaryBody,
    ContentSidebar
} from '../content';

import { 
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
            contentSidebarVisible: window.innerWidth >= 1224
        };
    }

    generateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth) {
        this.props.generateIndividuals(numberOfIndividuals, minExpressionDepth, maxExpressionDepth);
        this.setState({
            activeView: 'individuals'
        });
    }

    onClickGenerateIndividuals(e) {
        e.preventDefault();
        const data = this.refs["population-panel"].getFormData();
        this.props.generateIndividuals(data.size, data.minDepth, data.maxDepth);   
    }
    
    

    onClickGenerateSamples(e) {
        e.preventDefault();
        const data = this.refs['samples-panel'].getFormData();
        this.props.generateSamples(this.props.generation, data.numSamples, data.width, data.height, data.redThreshold, data.greenThreshold, data.blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
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
        this.setState({
            activeView: 'individuals'
        });
        this.props.evolveGeneration(this.props.generation);
        
    }

    changeActiveView(view, e) {
        console.log(view);
        e.preventDefault();
        this.setState({
            activeView: view
        });
    }   

    toggleCoordinateType(e) {
        e.preventDefault();
        this.setState({
            coordinateType: this.state.coordinateType === 'polar' ? 'cartesian' : 'polar'
        });
    }
    toggleSymmetry(e) {
        e.preventDefault();
        this.setState({
            symmetric: !this.state.symmetric
        });
    }

    toggleContentSidebar(e) {
        e.preventDefault();
        this.setState({
            contentSidebarVisible: !this.state.contentSidebarVisible
        });
    }
    
    determineClass = (className, property, value) => {
        return className + (this.state[property] === value ? ' main__content-top-nav-item--active' : '');
    }

    render() {

        return (
            <Content>
                <ContentHeader toggleSidebar={this.props.toggleSidebar} toggleContentSidebar={this.toggleContentSidebar.bind(this)} contentSidebar>
                    Generation {this.props.generation.id}
                </ContentHeader>
                <ContentBody contentSidebarVisible={this.state.contentSidebarVisible} sidebar={true}>
                    <ContentPrimary>
                        <ContentPrimaryTopNav>

                            <a href="" className={`main__content-top-nav-item ${this.state.activeView === 'individuals' ? 'main__content-top-nav-item--active' : ''}`} onClick={this.changeActiveView.bind(this, 'individuals')}>
                                <i className="main__content-top-nav-item-icon fa fa-users"></i> Individuals
                            </a>
                            
                            {this.props.generation.individuals.length > 0 &&
                                <a href="" className={`main__content-top-nav-item ${this.state.activeView === 'samples' ? 'main__content-top-nav-item--active' : ''}`}  onClick={this.changeActiveView.bind(this, 'samples')}>
                                    <i className="main__content-top-nav-item-icon fa fa-image"></i> Samples
                                </a>
                            }

                        </ContentPrimaryTopNav>
                        <ContentPrimaryBody topNav bottomNav>
                            {this.state.activeView === 'individuals' && 
                                <GenerationIndividuals individuals={this.props.generation.individuals} generateIndividuals={this.onClickGenerateIndividuals.bind(this)}/>
                            }
                            {this.state.activeView === 'samples' &&
                                <GenerationSamples
                                    samples={this.props.generation.samples} 
                                    coordinateType={this.state.coordinateType} 
                                    symmetric={this.state.symmetric}
                                    increaseSampleFitness={this.props.increaseSampleFitness}
                                    decreaseSampleFitness={this.props.decreaseSampleFitness}
                                    generateSampleData={this.props.generateSampleData}
                                    generateSamples={this.onClickGenerateSamples.bind(this)}
                                />
                            }
                        </ContentPrimaryBody>
                        <ContentPrimaryBottomNav>

                                {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateIndividuals.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-refresh"></i> {this.props.generation.individuals.length ? 'Regenerate' : 'Generate'}
                                    </a>
                                }

                                {this.state.activeView === 'individuals' &&  this.props.generation.individuals.length > 0 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateSamples.bind(this)} style={{width: 160}}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-image"></i> Generate Samples
                                    </a>
                                }

                                {this.state.activeView === 'samples' &&
                                <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateSamples.bind(this)}>
                                    <i className="main__content-bottom-nav-item-icon fa fa-image"></i> Generate
                                </a>
                                }
                                
                                {this.state.activeView === 'samples' &&
                                <a className="main__content-bottom-nav-item" href="" onClick={this.toggleCoordinateType.bind(this)}>
                                    <i className={`main__content-bottom-nav-item-icon fa ${this.state.coordinateType === 'cartesian' ? 'fa-th' : 'fa-globe'}`}></i>
                                    {' '}  {this.state.coordinateType === 'cartesian' ? 'Cartesian' : 'Polar'}
                                </a>
                                }


                                {this.state.activeView === 'samples' &&
                                <a href="" className="main__content-bottom-nav-item" onClick={this.toggleSymmetry.bind(this)}>
                                    <i className={`main__content-bottom-nav-item-icon fa ${this.state.symmetric ? 'fa-angle-left' : 'fa-angle-right'}`}></i> 
                                    {this.state.symmetric ? 'Symmetric' : 'Asymmetric'}
                                </a>
                                }

                                {this.props.generation.samples.length > 0 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.evolveGeneration.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-sitemap"></i> Evolve
                                    </a>
                                }
                            
                        </ContentPrimaryBottomNav>
                    </ContentPrimary>
                    <ContentSidebar toggleContentSidebar={this.toggleContentSidebar.bind(this)}>
                        {this.props.generation.id === 1 && 
                            <GenerationIndividualsPanel 
                                ref="population-panel"
                                config={this.props.config} 
                                generation={this.props.generation}
                                onClickGenerateIndividuals={this.generateIndividuals.bind(this)}
                                toggleContentSidebar={this.toggleContentSidebar.bind(this)}
                            />
                        }

                        {this.props.generation.individuals.length > 0 && 
                            <GenerationSamplesPanel 
                                ref="samples-panel"
                                onClickGenerateSamples={this.generateSamples.bind(this)}
                                toggleContentSidebar={this.toggleContentSidebar.bind(this)}
                            />
                        }
                        
                        {this.props.generation.samples.length > 0 && 
                           <GenerationEvolutionPanel 
                            onClickEvolveGeneration={this.evolveGeneration.bind(this)}
                            toggleContentSidebar={this.toggleContentSidebar.bind(this)} />
                        }
                    </ContentSidebar>
                </ContentBody>
            </Content>
        );
    }
}