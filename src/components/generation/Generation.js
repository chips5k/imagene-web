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
            selectedSamples: [],
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
        this.props.generateSamples(this.props.generation, data.numSamples, 320, 320, data.redThreshold, data.greenThreshold, data.blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
        });

    }

    onClickUpdateSamples() {
        const data = this.refs['samples-panel'].getFormData();
        this.props.updateSamples(this.props.generation.samples.filter((n) => this.state.selectedSamples.indexOf(n.id) !== -1), data.redThreshold, data.greenThreshold, data.blueThreshold);
        this.setState({
            activeView: 'samples',
            selectedSamples: []
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
    
    toggleSample(sample) {
        
        const index = this.state.selectedSamples.indexOf(sample.id);
        const selectedSamples = this.state.selectedSamples.slice(0);
        if(index !== -1) {
            selectedSamples.splice(index, 1);
        } else {
            selectedSamples.push(sample.id);
        }

        
        this.setState({
            selectedSamples: selectedSamples
        });
    }
    
    determineClass = (className, property, value) => {
        return className + (this.state[property] === value ? ' main__content-top-nav-item--active' : '');
    }

    onClickRemoveSamples(e) {
        e.preventDefault();

        this.props.removeSamples(this.props.generation.id, this.state.selectedSamples);
        this.setState({
            selectedSamples: [],
            contentSidebarVisible: window.innerWidth <= 1224 ? false : this.state.contentSidebarVisible
        });
    }

    onClickRemoveSample(sampleId) {
        this.props.removeSamples(this.props.generation.id, [sampleId]);
    }

    clearSelectedSamples(e) {
        e.preventDefault();
        this.setState({
            selectedSamples: []
        });
    }
    editSelectedSamples(e) {
        this.toggleContentSidebar(e);

    }
    openExportSelectedSamplesModal(e) {
        e.preventDefault();

    }

    render() {

        return (
            <Content>
                <ContentHeader toggleSidebar={this.props.toggleSidebar} toggleContentSidebar={this.toggleContentSidebar.bind(this)} contentSidebar>
                    Generation {this.props.generation.id}
                </ContentHeader>
                <ContentBody contentSidebarVisible={this.state.contentSidebarVisible} sidebar={true}>
                    <ContentPrimary>
                        {this.state.selectedSamples.length > 0 && 
                            <ContentPrimaryTopNav>
                                <span className="main__content-top-nav-item main__content-top-nav-item--active" style={{width: '100%'}}><b>{this.state.selectedSamples.length}</b>&nbsp;sample(s) selected</span>
                            </ContentPrimaryTopNav>
                        }
                        {this.state.selectedSamples.length === 0 && 
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
                        }
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
                                    selectedSamples={this.state.selectedSamples}
                                    removeSample={this.onClickRemoveSample.bind(this)}
                                    toggleSample={this.toggleSample.bind(this)}
                                />
                            }
                        </ContentPrimaryBody>
                        
                        {this.state.selectedSamples.length > 0 &&
                            <ContentPrimaryBottomNav>
                                <a className="main__content-bottom-nav-item" href="" onClick={this.clearSelectedSamples.bind(this)}>
                                    <i className="main__content-bottom-nav-item-icon fa fa-remove"></i> Clear
                                </a>
                                {this.state.contentSidebarVisible === false && 
                                <a className="main__content-bottom-nav-item" href="" onClick={this.editSelectedSamples.bind(this)}>
                                    <i className="main__content-bottom-nav-item-icon fa fa-cog"></i> Edit
                                </a>}
                                <a className="main__content-bottom-nav-item" href="" onClick={this.openExportSelectedSamplesModal.bind(this)}>
                                    <i className="main__content-bottom-nav-item-icon fa fa-save"></i> Export
                                </a>    
                            </ContentPrimaryBottomNav>
                        }

                        {this.state.selectedSamples.length === 0 && 
                            <ContentPrimaryBottomNav>
                                {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.onClickGenerateIndividuals.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-refresh"></i> {this.props.generation.individuals.length ? 'Regenerate' : 'Generate'}
                                    </a>
                                }

                                {this.props.generation.samples.length > 0 && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.evolveGeneration.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-sitemap"></i> Evolve
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

                            </ContentPrimaryBottomNav>
                        }
                            
                    </ContentPrimary>
                    <ContentSidebar toggleContentSidebar={this.toggleContentSidebar.bind(this)}>
                                
                        {this.props.generation.id === 1 && this.state.activeView === 'individuals' && 
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
                                selectedSamples={this.state.selectedSamples}
                                samples={this.props.generation.samples}
                                onClickUpdateSelectedSamples={this.onClickUpdateSamples.bind(this)}
                                onClickRemoveSamples={this.onClickRemoveSamples.bind(this)}
                            />
                        }
                        
                        {this.state.selectedSamples.length === 0 && this.props.generation.samples.length > 0 && 
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