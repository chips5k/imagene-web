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
            contentSidebarVisible: true
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
                                <i className="fa fa-users"></i> Individuals
                            </a>
                            <a href="" className={`main__content-top-nav-item ${this.state.activeView === 'samples' ? 'main__content-top-nav-item--active' : ''}`}  onClick={this.changeActiveView.bind(this, 'samples')}>
                                <i className="fa fa-image"></i> Samples
                            </a>

                            

                            
                            <div className="visible-tall hidden-narrow" style={{marginLeft: 'auto', display: 'flex'}}>             
                                {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                    <a className="main__content-bottom-nav-item " href="" onClick={this.onClickGenerateIndividuals.bind(this)}>
                                        <i className="fa fa-refresh"></i> {this.props.generation.individuals.length ? 'Regenerate' : 'Generate'}
                                    </a>
                                }

                                {this.state.activeView === 'samples' &&
                                    <div style={{display: 'flex'}}>
                                        <a className="main__content-bottom-nav-item "href="" onClick={this.onClickGenerateSamples.bind(this)}>
                                            <i className="fa fa-image"></i> Generate
                                        </a>

                                        <a className="main__content-bottom-nav-item" href="" onClick={this.evolveGeneration.bind(this)}>
                                            <i className="fa fa-chevron-right"></i> Evolve
                                        </a>
                                    
                                        <a href="" className="main__content-bottom-nav-item " onClick={this.toggleCoordinateType.bind(this)}>
                                            <i className={`fa ${this.state.coordinateType === 'cartesian' ? 'fa-th' : 'fa-globe'}`}></i>
                                            {' '}  {this.state.coordinateType === 'cartesian' ? 'Cartesian' : 'Polar'}
                                        </a>

                                        <a href="" className="main__content-bottom-nav-item" onClick={this.toggleSymmetry.bind(this)}>
                                        
                                            <i className={`fa ${this.state.symmetric ? 'fa-angle-left' : 'fa-angle-right'}`}></i> 
                                            <i className={`fa ${this.state.symmetric ? 'fa-angle-right' : 'fa-angle-left'}`}></i> 
                                            {this.state.symmetric ? 'Symmetric' : 'Asymmetric'}
                                        </a>
                                    </div>
                                }
                            </div>

                        </ContentPrimaryTopNav>
                        <ContentPrimaryBody topNav bottomNav>
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
                        </ContentPrimaryBody>
                        <ContentPrimaryBottomNav>

                            <div className="visible-short visible-narrow">
                                {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateIndividuals.bind(this)}>
                                        <i className="fa fa-refresh"></i> {this.props.generation.individuals.length ? 'Regenerate' : 'Generate'}
                                    </a>
                                }

                                {this.state.activeView === 'samples' &&
                                    <div style={{display: 'flex'}}>
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateSamples.bind(this)}>
                                            <i className="fa fa-image"></i> Generate
                                        </a>

                                        <a className="main__content-bottom-nav-item" href="" onClick={this.evolveGeneration.bind(this)}>
                                            <i className="fa fa-chevron-right"></i> Evolve
                                        </a>
                                    
                                        <a className="main__content-bottom-nav-item" href="" className="main__content-bottom-nav-item" onClick={this.toggleCoordinateType.bind(this)}>
                                            <i className={`fa ${this.state.coordinateType === 'cartesian' ? 'fa-th' : 'fa-globe'}`}></i>
                                            {' '}  {this.state.coordinateType === 'cartesian' ? 'Cartesian' : 'Polar'}
                                        </a>
                        
                                        <a href="" className="main__content-bottom-nav-item" onClick={this.toggleSymmetry.bind(this)}>
                                            <i className={`fa ${this.state.symmetric ? 'fa-angle-left' : 'fa-angle-right'}`}></i> 
                                            <i className={`fa ${this.state.symmetric ? 'fa-angle-right' : 'fa-angle-left'}`}></i> 
                                            {this.state.symmetric ? 'Symmetric' : 'Asymmetric'}
                                        </a>
                                    </div>
                                }
                            </div>
                            
                        </ContentPrimaryBottomNav>
                    </ContentPrimary>
                    <ContentSidebar toggleContentSidebar={this.toggleContentSidebar.bind(this)}>
                        {this.props.generation.id === 1 && 
                            <GenerationIndividualsPanel 
                                ref="population-panel"
                                config={this.props.config} 
                                onClickGenerateIndividuals={this.generateIndividuals.bind(this)}
                            />
                        }

                        {this.props.generation.individuals.length > 0 && 
                            <GenerationSamplesPanel 
                                ref="samples-panel"
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