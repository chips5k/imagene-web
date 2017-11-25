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

class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarVisible: false
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

    render() {
        return (
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
                    <HomeView match={match} onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)} />
                }/>
                <Route exact path="/generation/:id" render={ ({match}) => 
                    <GenerationViewContainer 
                        match={match}
                        onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)}
                        actionCreators={this.props.actionCreators}
                        addToWorkerQueue={this.props.addToWorkerQueue}
                    />
                }/>

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
            </Layout>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    currentState: state,
    generations: Object.values(state.generations.byId),
    location: state.router.location.pathname,
    addToWorkerQueue: ownProps.addToWorkerQueue
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actionCreators: bindActionCreators(ownProps.actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);