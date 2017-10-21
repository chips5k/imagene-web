import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

function HomeContainer(props) {
    return <Home toggleSidebar={props.toggleSidebar} />
}

const mapStateToProps = (state, ownProps) => { return {}; }

export default connect(mapStateToProps)(HomeContainer);