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

import ExportSamplesModal from '../ExportSamplesModal';

export default class Generation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'individuals',
            coordinateType: 'cartesian',
            selectedSamples: [],
            symmetric: false,
            exportSamplesModalOpen: false,
            exportedSamples: [],
            contentSidebarVisible: window.innerWidth >= 1224
        };
    }
      
    determineClass = (className, property, value) => {
        return className + (this.state[property] === value ? ' main__content-top-nav-item--active' : '');
    }

    openExportSamplesModal() {
        this.setState({
            exportSamplesModalOpen: true
        });
    }

    closeExportSamplesModal() {
        this.setState({
            exportSamplesModalOpen: false
        });
    }

    toggleContentSidebar(e) {
        if(e) { e.preventDefault(); }
        this.setState({
            contentSidebarVisible: !this.state.contentSidebarVisible
        });
    }

    handleOpenExportSamplesModal(e) {
        e.preventDefault();
        this.openExportSamplesModal();
    }

    handleChangeActiveViewClick(view, e) {
        e.preventDefault();
        this.setState({
            activeView: view
        });
    }

    handleCoordinateTypeClick(e) {
        e.preventDefault();
        this.setState({
            coordinateType: this.state.coordinateType === 'polar' ? 'cartesian' : 'polar'
        });
    }

    handleSymmetryClick(e) {
        e.preventDefault();
        this.setState({
            symmetric: !this.state.symmetric
        });
    }

    

    handleGenerateIndividualsClick(e) {
        e.preventDefault();
        const data = this.refs["population-panel"].getFormData();
        this.props.generateIndividuals(data.size, data.minDepth, data.maxDepth); 

        if(window.innerWidth < 1224) {
            this.toggleContentSidebar(e);
        }  
    }
    
    handleEvolveGenerationClick(e) {
        e.preventDefault();
        this.setState({
            activeView: 'individuals'
        });
        this.props.evolveGeneration(this.props.generation);  
    }

    handleRemoveSamplesClick(e) {
        e.preventDefault();

        this.props.removeSamples(this.props.generation.id, this.state.selectedSamples);
        this.setState({
            selectedSamples: [],
            contentSidebarVisible: window.innerWidth <= 1224 ? false : this.state.contentSidebarVisible
        });
    }

    handleClearSelectedSamplesClick(e) {
        e.preventDefault();
        this.setState({
            selectedSamples: []
        });
    }

    handleEditSelectedSamplesClick(e) {
        e.preventDefault();
        this.toggleContentSidebar();
    }

    handleUpdateSamplesClick(e) {
        const data = this.refs['samples-panel'].getFormData();
        this.props.updateSamples(this.props.generation.samples.filter((n) => this.state.selectedSamples.indexOf(n.id) !== -1), data.redThreshold, data.greenThreshold, data.blueThreshold);
        this.setState({
            activeView: 'samples'
        });
    }
    
    handleGenerateSamplesClick(e) {
        e.preventDefault();
        const data = this.refs['samples-panel'].getFormData();
        this.props.generateSamples(this.props.generation, data.numSamples, 320, 320, data.redThreshold, data.greenThreshold, data.blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
        });
    }

    handleClickExportSamples(e) {
        e.preventDefault();
        this.openExportSamplesModal();
    }
    
    handleExportSamplesModalExportClick(e) {
        const formData = this.refs.exportSamplesModal.getFormData();
        const exportedSamples = [];
        
        this.props.generation.samples.filter(n => this.state.selectedSamples.indexOf(n.id) !== -1).forEach((sample, i) => {
            formData.coordinateTypes.forEach(coordinateType => {
                exportedSamples.push({ 
                    name: `Sample ${sample.id} ${coordinateType} ${formData.width}x${formData.height}`,
                    data: [],
                    sample: {
                        width: formData.width,
                        height: formData.height,
                        redIndividual: sample.redIndividual,
                        greenIndividual: sample.greenIndividual,
                        blueIndividual: sample.blueIndividual,
                        redThreshold: formData.redThreshold,
                        greenThreshold: formData.greenThreshold,
                        blueThreshold: formData.blueThreshold,
                    },
                    coordinateType,
                    processing: true
                });
            });
        });

        this.setState({
            exporting: true,
            exportedSamples
        }, () => {
            this.state.exportedSamples.forEach((n, i) => {
                this.props.addToWorkerQueue({
                    sample: n.sample,
                    coordinateType: n.coordinateType
                }, (e) => {
                    const exportedSamples = this.state.exportedSamples.slice(0);
                    exportedSamples[i].data =  Uint8ClampedArray.from(e.data);
                    exportedSamples[i].processing = false;
                    exportedSamples[i].symmetricDataUrl = this.props.renderImageDataToDataUrl(n.sample.width, n.sample.height, n.data, true);
                    exportedSamples[i].asymmetricDataUrl = this.props.renderImageDataToDataUrl(n.sample.width, n.sample.height, n.data, false)
                    this.setState({
                        exportedSamples,
                        exporting: this.state.exportedSamples.filter(n => n.processing).length < this.state.exportedSamples.length
                    });
                });
            });
        });
    }

    handleExportSamplesModalCloseClick(e) {
        e.preventDefault();
        this.closeExportSamplesModal();
    }

    handleSampleLabelClick(sample, e) {
        
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

    handleSampleRemoveClick(sample, e) {
        e.preventDefault();
        this.props.removeSamples(this.props.generation.id, [sample.id]);
    }

    handleSampleIncreaseFitnessClick(sample, e) {
        e.preventDefault();
        this.props.increaseSampleFitness(sample);

    }

    handleSampleDecreaseFitnessClick(sample, e) {
        e.preventDefault();
        this.props.decreaseSampleFitness(sample);
    }
    
    handleSampleEditClick(sample, e) {
        e.preventDefault();
        this.setState({
            selectedSamples: [sample.id]
        });

        if(!this.state.contentSidebarVisible) {
            this.toggleContentSidebar();
        }
    }

    handleSampleSaveClick(sample, e) {
        e.preventDefault();
        this.setState({
            selectedSamples: [sample.id]
        });

        this.openExportSamplesModal();
    }

    render() {
        return (
            <div>
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

                                <a href="" className={`main__content-top-nav-item ${this.state.activeView === 'individuals' ? 'main__content-top-nav-item--active' : ''}`} onClick={this.handleChangeActiveViewClick.bind(this, 'individuals')}>
                                    <i className="main__content-top-nav-item-icon fa fa-users"></i> Individuals
                                </a>
                                
                                {this.props.generation.individuals.length > 0 &&
                                    <a href="" className={`main__content-top-nav-item ${this.state.activeView === 'samples' ? 'main__content-top-nav-item--active' : ''}`}  onClick={this.handleChangeActiveViewClick.bind(this, 'samples')}>
                                        <i className="main__content-top-nav-item-icon fa fa-image"></i> Samples
                                    </a>
                                }

                            </ContentPrimaryTopNav>
                            }
                            
                            <ContentPrimaryBody topNav bottomNav>

                                {this.state.activeView === 'individuals' && 
                                    <GenerationIndividuals
                                        individuals={this.props.generation.individuals} 
                                        onGenerateIndividualsClick={this.handleGenerateIndividualsClick.bind(this)}
                                    />
                                }

                                {this.state.activeView === 'samples' && 
                                    <GenerationSamples
                                        samples={this.props.generation.samples}
                                        selectedSamples={this.state.selectedSamples}
                                        onSampleIncreaseFitnessClick={this.handleSampleIncreaseFitnessClick.bind(this)}
                                        onSampleDecreaseFitnessClick={this.handleSampleDecreaseFitnessClick.bind(this)}
                                        onSampleRemoveClick={this.handleSampleRemoveClick.bind(this)}
                                        onSampleEditClick={this.handleSampleEditClick.bind(this)}
                                        onSampleLabelClick={this.handleSampleLabelClick.bind(this)}
                                        onSampleSaveClick={this.handleSampleSaveClick.bind(this)}
                                        onGenerateSamplesClick={this.handleGenerateSamplesClick.bind(this)}
                                        onSampleRedraw={this.props.onSampleRedraw.bind(null, this.state.coordinateType, this.state.symmetric)}
                                     />
                                }
                            </ContentPrimaryBody>
                            
                            {this.state.selectedSamples.length > 0 &&
                                <ContentPrimaryBottomNav>
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.handleClearSelectedSamplesClick.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-remove"></i> Clear
                                    </a>
                                    {this.state.contentSidebarVisible === false && 
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.handleEditSelectedSamplesClick.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-cog"></i> Edit
                                    </a>}
                                    <a className="main__content-bottom-nav-item" href="" onClick={this.handleClickExportSamples.bind(this)}>
                                        <i className="main__content-bottom-nav-item-icon fa fa-save"></i> Export
                                    </a>    
                                </ContentPrimaryBottomNav>
                            }

                            {this.state.selectedSamples.length === 0 && 
                                <ContentPrimaryBottomNav>
                                    {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.handleGenerateIndividualsClick.bind(this)}>
                                            <i className="main__content-bottom-nav-item-icon fa fa-refresh"></i> {this.props.generation.individuals.length ? 'Regenerate' : 'Generate'}
                                        </a>
                                    }

                                    {this.props.generation.samples.length > 0 && 
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.handleEvolveGenerationClick.bind(this)}>
                                            <i className="main__content-bottom-nav-item-icon fa fa-sitemap"></i> Evolve
                                        </a>
                                    }
                                    
                                    {this.state.activeView === 'samples' &&
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.handleCoordinateTypeClick.bind(this)}>
                                            <i className={`main__content-bottom-nav-item-icon fa ${this.state.coordinateType === 'cartesian' ? 'fa-th' : 'fa-globe'}`}></i>
                                            {' '}  {this.state.coordinateType === 'cartesian' ? 'Cartesian' : 'Polar'}
                                        </a>
                                    }

                                    {this.state.activeView === 'samples' &&
                                        <a href="" className="main__content-bottom-nav-item" onClick={this.handleSymmetryClick.bind(this)}>
                                            <i className={`main__content-bottom-nav-item-icon fa ${this.state.symmetric ? 'fa-angle-left' : 'fa-angle-right'}`}></i> 
                                            {this.state.symmetric ? 'Symmetric' : 'Asymmetric'}
                                        </a>
                                    }

                                    {this.state.activeView === 'individuals' &&  this.props.generation.individuals.length > 0 && 
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.handleGenerateSamplesClick.bind(this)} style={{width: 160}}>
                                            <i className="main__content-bottom-nav-item-icon fa fa-image"></i> Generate Samples
                                        </a>
                                    }

                                    {this.state.activeView === 'samples' &&
                                        <a className="main__content-bottom-nav-item" href="" onClick={this.handleGenerateSamplesClick.bind(this)}>
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
                                    onGenerateIndividualsClick={this.handleGenerateIndividualsClick.bind(this)}
                                    toggleContentSidebar={this.toggleContentSidebar.bind(this)}
                                />
                            }

                            {this.props.generation.individuals.length > 0 &&
                                <GenerationSamplesPanel 
                                    ref="samples-panel"
                                    toggleContentSidebar={this.toggleContentSidebar.bind(this)}
                                    selectedSamples={this.state.selectedSamples}
                                    samples={this.props.generation.samples}
                                    onGenerateSamplesClick={this.handleGenerateSamplesClick.bind(this)}
                                    onUpdateSamplesClick={this.handleUpdateSamplesClick.bind(this)}
                                    onRemoveSamplesClick={this.handleRemoveSamplesClick.bind(this)}
                                    onExportSamplesClick={this.handleOpenExportSamplesModal.bind(this)}
                                />
                            }
                            
                            {this.state.selectedSamples.length === 0 && this.props.generation.samples.length > 0 && 
                            <GenerationEvolutionPanel 
                                onClickEvolveGeneration={this.handleEvolveGenerationClick.bind(this)}
                                toggleContentSidebar={this.toggleContentSidebar.bind(this)} />
                            }

                        </ContentSidebar>
                    </ContentBody>
                </Content>
                <ExportSamplesModal 
                    ref="exportSamplesModal"
                    open={this.state.exportSamplesModalOpen} 
                    selectedSamples={this.state.selectedSamples}
                    exportedSamples={this.state.exportedSamples}
                    exporting={this.state.exporting}
                    onExportSamplesClick={this.handleExportSamplesModalExportClick.bind(this)} 
                    onCloseModalClick={this.handleExportSamplesModalCloseClick.bind(this)}
                    samples={this.props.generation.samples}
                />
            </div>
            
        );
    }
}