import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';

function SidebarContainer(props) {
    return <Sidebar location={props.location} generations={props.generations} onClickNewGeneration={props.actions.createInitialGeneration}
    toggleSidebar={props.toggleSidebar} />;
}

const mapStateToProps = (state, ownProps) => {
    return {
        location: state.router.location.pathname,
        generations: Object.values(state.generations.byId)
    }
};


export default connect(mapStateToProps)(SidebarContainer);