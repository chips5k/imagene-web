import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import initReactFastclick from 'react-fastclick';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


//Our components
import Layout from '../components/app/layout';
import GenerationViewContainer from './GenerationViewContainer';
import HomeView from '../components/app/views/HomeView';
import ExportModal from '../components/app/common/ExportModal';
import ImportModal from '../components/app/common/ImportModal';
import VideoModal from '../components/app/common/VideoModal';
import HelpModal from '../components/app/common/HelpModal';
class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarVisible: false,
            helpModalOpen: false,
            videoModalOpen: false
        }
    }

    componentDidMount() {
        initReactFastclick();
    }

    handleNavSidebarToggleClick(e) {
        e.preventDefault();
        this.refs.layout.toggleNavSidebar();
    }

    handleNavSidebarLinkClick(url, e) {
        e.preventDefault(e);
       
        if(window.innerWidth < 1224) {
            this.refs.layout.toggleNavSidebar();
        }

        switch(url) {
            case '/new-generation':
                this.props.actionCreators.createInitialGeneration();
                break;
            case '/video':
                this.handleVideoAction();
                break;
            case '/help':
                this.handleHelpAction();
                break;
            case '/export':
                this.handleExportAction();
                break;
            case '/import':
                this.handleImportAction();
                break;
                
            default:
                this.props.actionCreators.redirect(url);
        }
    }

    handleExportAction() {
        this.setState({
            exportModalOpen: true
        });
    }   

    handleExportModalExportClick(e) {
        
        e.preventDefault();

        const json = JSON.stringify(this.props.slicer(this.props.currentState));
        const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(json)}`;
        const exportName = `imagene-${Date.now()}.json`;

        const anchor = document.createElement('a');
        anchor.setAttribute('href', dataUri);
        anchor.setAttribute('download', exportName);

        anchor.click();

        this.setState({
            exportModalOpen: false
        });
    }

    handleExportModalCloseClick(e) {
        e.preventDefault();
        this.setState({
            exportModalOpen: false
        });
    }

    handleImportAction() {
        this.setState({
            importModalOpen: true
        });
        this.refs.importModal.refs.file.value = null;
    }

    handleImportModalImportClick(e) {
        e.preventDefault();

        const file = this.refs.importModal.refs.file.files[0];
        
        if(file) {

            const reader = new FileReader();

            reader.onload = e => {
                try {
                    const json = JSON.parse(e.target.result);
                    this.props.actionCreators.importState(json);
                } catch (e) {   
                    console.log(e);
                }

                this.setState({
                    importModalOpen: false
                });
            }

            reader.readAsText(file);
        }

        

    }

    handleImportModalCloseClick(e) {
        e.preventDefault();
        this.setState({
            importModalOpen: false
        });
    }

    handleVideoAction(e) {
        if(e) {
            e.preventDefault();
        }
        
        this.setState({
            videoModalOpen: true
        });
    }

    handleVideoModalCloseClick(e) {
        e.preventDefault();
        this.setState({
            videoModalOpen: false
        });
    }

    handleHelpAction(e) {
        if(e) {
            e.preventDefault();
        }
        
        this.setState({
            helpModalOpen: true
        });
    }

    handleHelpModalCloseClick(e) {
        e.preventDefault();
        this.setState({
            helpModalOpen: false
        });
    }

    handleHomeGetStartedClick(e) {
        e.preventDefault();
        if(this.props.generations.lengths > 0) {
            this.props.actionCreators.redirect('/generations/' + this.props.currentGenerationId);
        } else {
            this.props.actionCreators.createInitialGeneration();
        }
        
    }

    render() {
        return (
            <div>
            <Layout
                ref="layout"
                onToggleClick={this.handleSidebarToggleClick} 
                onBlockerClick={this.handleSidebarToggleClick}
                visible={this.state.sidebarVisible} 
                generations={this.props.generations}
                location={this.props.location}
                onSidebarLinkClick={this.handleNavSidebarLinkClick.bind(this)}
            >
                <Route exact path="/" render={ ({match}) => 
                    <HomeView match={match} 
                        onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)} 
                        onGetStartedClick={this.handleHomeGetStartedClick.bind(this)}
                        onWatchTutorialClick={this.handleVideoAction.bind(this)}
                        onViewHelpClick={this.handleHelpAction.bind(this)}
                    />
                }/>
                <Route exact path="/generation/:id" render={ ({match}) => 
                    <GenerationViewContainer 
                        match={match}
                        onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)}
                        actionCreators={this.props.actionCreators}
                        addToWorkerQueue={this.props.addToWorkerQueue}
                    />
                }/>
            </Layout>
                <ExportModal 
                    onCloseModalClick={this.handleExportModalCloseClick.bind(this)} 
                    onExportClick={this.handleExportModalExportClick.bind(this)}
                    open={this.state.exportModalOpen}
                />

                <ImportModal 
                    ref="importModal"
                    onCloseModalClick={this.handleImportModalCloseClick.bind(this)} 
                    onImportClick={this.handleImportModalImportClick.bind(this)}
                    open={this.state.importModalOpen}
                />

                <VideoModal 
                    onCloseModalClick={this.handleVideoModalCloseClick.bind(this)} 
                    open={this.state.videoModalOpen}
                />
                <HelpModal 
                    onCloseModalClick={this.handleHelpModalCloseClick.bind(this)} 
                    open={this.state.helpModalOpen}
                />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentGenerationId: Math.max.apply(null, state.generations.allIds),
    generations: Object.values(state.generations.byId),
    location: state.router.location.pathname,
    addToWorkerQueue: ownProps.addToWorkerQueue,
    currentState: state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actionCreators: bindActionCreators(ownProps.actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);