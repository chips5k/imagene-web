import React from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';

function HomeContainer() {
    return <Home />
}

const mapStateToProps = (state, ownProps) => { return {}; }

export default connect(mapStateToProps)(HomeContainer);