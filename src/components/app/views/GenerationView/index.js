import React, { Component } from 'react';

import { ActionBar, ActionBarItem } from '../../../common/ActionBar';

import IndividualsTab from './IndividualsTab';
import SamplesTab from './SamplesTab';

import Header, { HeaderButton, HeaderTitle } from '../../layout/Header';
import VerticalFlexBox from '../../../common/VerticalFlexBox';
import PanelSidebar from '../../layout/PanelSidebar';

import ManageGenerationPanel from '../../common/generations/ManageGenerationPanel';
import ManageIndividualsPanel from '../../common/individuals/ManageIndividualsPanel';
import ManageSamplesPanel from '../../common/samples/ManageSamplesPanel'; 
import ExportSamplesModal from '../../common/samples/ExportSamplesModal';

export default class GenerationView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeView: 'individuals',
            coordinateType: 'cartesian',
            selectedSamples: [],
            symmetric: false,
            exportSamplesModalOpen: false,
            exportedSamples: [],
            panelSidebarVisible: window.innerWidth >= 1224
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.generation.individuals.length === 0) {
            this.setState({
                activeView: 'individuals'
            });
        }
    }
      
    determineClass = (className, property, value) => {
        return className + (this.state[property] === value ? ' main__content-top-nav-item--active' : '');
    }

    openExportSamplesModal() {
        this.setState({
            exportSamplesModalOpen: true,
            exportedSamples: []
        });
    }

    closeExportSamplesModal() {
        this.setState({
            exportSamplesModalOpen: false,
            exportedSamples: []
        });
    }

    togglePanelSidebar() {
        this.setState({
            panelSidebarVisible: !this.state.panelSidebarVisible
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
        
    }
    
    handleIndividualsPanelGenerateIndividualsClick(e) {
        e.preventDefault();
        const data = this.refs["population-panel"].getFormData();
        this.props.generateIndividuals(data.size, data.minDepth, data.maxDepth); 

        if(window.innerWidth < 1224) {
            this.togglePanelSidebar();
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
            panelSidebarVisible: window.innerWidth <= 1224 ? false : this.state.panelVVisible
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
        this.togglePanelSidebar();
    }

    handleSamplesPanelUpdateSamplesClick(e) {
        const data = this.refs['samples-panel'].getFormData();
        this.props.updateSamples(this.props.generation.samples.filter((n) => this.state.selectedSamples.indexOf(n.id) !== -1), data.redThreshold, data.greenThreshold, data.blueThreshold);
        this.setState({
            activeView: 'samples'
        });

        if(window.innerWidth < 1224) {
            this.togglePanelSidebar();
        }
    }
    
    handleGenerateSamplesClick(e) {
        e.preventDefault();
        const data = this.refs['samples-panel'].getFormData();
        this.props.generateSamples(this.props.generation, data.numSamples, 320, 320, data.redThreshold, data.greenThreshold, data.blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
        });
    }

    handleSamplesPanelGenerateSamplesClick(e) {
        e.preventDefault();
        const data = this.refs['samples-panel'].getFormData();
        this.props.generateSamples(this.props.generation, data.numSamples, 320, 320, data.redThreshold, data.greenThreshold, data.blueThreshold, this.props.lastSampleId);
        this.setState({
            activeView: 'samples'
        });

        if(window.innerWidth < 1224) {
            this.togglePanelSidebar();
        }
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
                    if(exportedSamples[i]) {
                        exportedSamples[i].data =  Uint8ClampedArray.from(e.data);
                        exportedSamples[i].processing = false;
                        exportedSamples[i].symmetricDataUrl = this.props.renderImageDataToDataUrl(n.sample.width, n.sample.height, n.data, true);
                        exportedSamples[i].asymmetricDataUrl = this.props.renderImageDataToDataUrl(n.sample.width, n.sample.height, n.data, false)
                        this.setState({
                            exportedSamples,
                            exporting: this.state.exportedSamples.filter(n => n.processing).length < this.state.exportedSamples.length
                        });
                    }
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
        this.setState({
            selectedSamples: this.state.selectedSamples.filter(n => n !== sample.id)
        });
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

        if(!this.state.panelSidebarVisible) {
            this.togglePanelSidebar();
        }
    }

    handleSampleSaveClick(sample, e) {
        e.preventDefault();
        this.setState({
            selectedSamples: [sample.id]
        });

        this.openExportSamplesModal();
    }

    handlePanelSidebarToggleClick(e) {
        this.togglePanelSidebar();
    }


    render() {
        return (
            <div className={`view-container  ${this.state.panelSidebarVisible ? '' : 'view-container--panel-sidebar-offscreen'}`}>
                <Header>
                    <HeaderButton iconClass="fa fa-bars" onClick={this.props.onNavSidebarToggleClick} />
                    <HeaderTitle>Generation {this.props.generation.id}</HeaderTitle>
                    <HeaderButton iconClass="fa fa-cog" onClick={this.handlePanelSidebarToggleClick.bind(this)}>Settings</HeaderButton>
                </Header>
                <div className="view-content">
                    <VerticalFlexBox>
                        
                        {this.state.selectedSamples.length > 0 && 
                            <ActionBar>
                                <ActionBarItem active>
                                    <b>{this.state.selectedSamples.length}</b> sample(s) selected
                                </ActionBarItem>
                            </ActionBar>
                        }

                        {this.state.selectedSamples.length === 0 && 
                            <ActionBar>
                                <ActionBarItem 
                                    iconClass={`fa fa-users`} 
                                    text='Individuals' 
                                    onClick={this.handleChangeActiveViewClick.bind(this, 'individuals')} 
                                    active={this.state.activeView === 'individuals'} 
                                />
                                {this.props.generation.individuals.length > 0 &&
                                    <ActionBarItem 
                                        iconClass={`fa fa-image`} 
                                        text='Samples' 
                                        onClick={this.handleChangeActiveViewClick.bind(this, 'samples')} 
                                        active={this.state.activeView === 'samples'} 
                                    />
                                }
                            </ActionBar>
                        }
                        
                        <div className="flex-fill padding-1">
                            {this.state.activeView === 'individuals' && 
                                <IndividualsTab
                                    individuals={this.props.generation.individuals} 
                                    onGenerateIndividualsClick={this.handleGenerateIndividualsClick.bind(this)}
                                />
                            }

                            {this.state.activeView === 'samples' && 
                                <SamplesTab
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
                        </div>

                        {this.state.selectedSamples.length > 0 &&
                            <ActionBar>
                                <ActionBarItem iconClass={`fa fa-remove`} text='Clear' onClick={this.handleClearSelectedSamplesClick.bind(this)} />
                                <ActionBarItem iconClass={`fa fa-cog`} text='Edit' onClick={this.handleEditSelectedSamplesClick.bind(this)} />
                                <ActionBarItem iconClass={`fa fa-save`} text='Export' onClick={this.handleClickExportSamples.bind(this)} />
                            </ActionBar>
                        }

                        {this.state.selectedSamples.length === 0 && 
                            <ActionBar>
                                {this.state.activeView === 'individuals' && this.props.generation.id === 1 && 
                                    <ActionBarItem 
                                        iconClass={`fa fa-refresh`} 
                                        text={this.props.generation.individuals.length ? 'Regenerate' : 'Generate'} 
                                        onClick={this.handleGenerateIndividualsClick.bind(this)}
                                        />
                                }

                                {this.props.generation.samples.length > 0 && 
                                    <ActionBarItem 
                                        iconClass={`fa fa-sitemap`}
                                        text="Evolve"
                                        onClick={this.handleEvolveGenerationClick.bind(this)}
                                    />
                                }

                                {this.state.activeView === 'samples' &&
                                    <ActionBarItem 
                                        iconClass={`fa ${this.state.coordinateType === 'cartesian' ? 'fa-th' : 'fa-globe'}`}
                                        text={this.state.coordinateType === 'cartesian' ? 'Cartesian' : 'Polar'}
                                        onClick={this.handleCoordinateTypeClick.bind(this)}
                                    />
                                }

                                {this.state.activeView === 'samples' &&
                                    <ActionBarItem 
                                        iconClass={`fa ${this.state.symmetric ? 'fa-angle-left' : 'fa-angle-right'}`}
                                        text={this.state.symmetric ? 'Symmetric' : 'Asymmetric'}
                                        onClick={this.handleSymmetryClick.bind(this)}
                                    />
                                }

                                {this.state.activeView === 'individuals' &&  this.props.generation.individuals.length > 0 && 
                                    <ActionBarItem 
                                        iconClass="fa fa-image"
                                        text="Generate Samples"
                                        onClick={this.handleGenerateSamplesClick.bind(this)} 
                                        width={160}
                                    />
                                }

                                {this.state.activeView === 'samples' &&
                                    <ActionBarItem 
                                        iconClass="fa fa-image"
                                        text="Generate"
                                        onClick={this.handleGenerateSamplesClick.bind(this)}
                                    />
                                }
                            </ActionBar>
                        }

                    </VerticalFlexBox>
                </div>
                <PanelSidebar onBlockerClick={this.handlePanelSidebarToggleClick.bind(this)}>
                    {this.props.generation.id === 1 && this.state.activeView === 'individuals' && 
                        <ManageIndividualsPanel 
                            ref="population-panel"
                            config={this.props.config} 
                            generation={this.props.generation}
                            onGenerateIndividualsClick={this.handleIndividualsPanelGenerateIndividualsClick.bind(this)}
                            togglePanelSidebar={this.togglePanelSidebar.bind(this)}
                        />
                    }

                    {this.props.generation.individuals.length > 0 &&
                        <ManageSamplesPanel 
                            ref="samples-panel"
                            togglePanelSidebar={this.togglePanelSidebar.bind(this)}
                            selectedSamples={this.state.selectedSamples}
                            samples={this.props.generation.samples}
                            onGenerateSamplesClick={this.handleSamplesPanelGenerateSamplesClick.bind(this)}
                            onUpdateSamplesClick={this.handleSamplesPanelUpdateSamplesClick.bind(this)}
                            onRemoveSamplesClick={this.handleRemoveSamplesClick.bind(this)}
                            onExportSamplesClick={this.handleOpenExportSamplesModal.bind(this)}
                        />
                    }
                    
                    {this.state.selectedSamples.length === 0 && this.props.generation.samples.length > 0 && 
                    <ManageGenerationPanel 
                        onEvolveGenerationClick={this.handleEvolveGenerationClick.bind(this)}
                        togglePanelSidebar={this.togglePanelSidebar.bind(this)} />
                    }

                </PanelSidebar> 
                
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