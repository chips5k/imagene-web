import React from 'react';
import * as actionCreators from '../actions/actions';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

function SidebarContainer(props) {
    return <Sidebar location={props.location} generations={props.generations} onClickNewGeneration={props.createInitialGeneration} />;
}

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.router.location.pathname,
        generations: Object.values(state.generations.byId)
    }
};

const mapDispatchToProps = {
    createInitialGeneration: actionCreators.createInitialGeneration
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);