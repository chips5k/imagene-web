import React, { Component } from 'react';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';

import { updatePopulation } from './actions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class Population extends Component {

    onClickSave() {
        this.props.updatePopulation({
            individuals: [],
            config: {
                size: this.refs.size.value,
                minDepth: this.refs.minDepth.value,
                maxDepth: this.refs.maxDepth.value
            }
        });
    }

    onClickCancel() {
        
    }

    render() {
        
        let content = null;
        if(this.props.population.individuals.length === 0) {
            content = (
                <div>
                    <h2>Configure and generate initial population</h2>
                    <p>Please configure the initial population via the sidebar, and click <b>generate population</b> to proceed</p>
                </div>
            );
        } else {
            content = (
                <div> 
                <h2>Current Population</h2>
                <p>If you are unhappy with the current population, you may regenerate it by clicking the <b>generate population</b> button in the sidebar.</p>

                <p className="alert alert--warning">Note, if you have already created generations from this population, they will be destroyed upon altering/regenerating the population</p>

                    <ul>
                        {this.props.population.individuals.map((n, i) => 
                            <li key={i}>{n.expression.join(" ")}</li>
                        )}
                    </ul>

                    <Link to="/generations">Proceed</Link>
                </div>

              
            )

        }

        return (
            <div className="main">
                <div className="main__header">
                    <div className="main__title">Population</div>
                </div>
                <div className="main__body"> 
                    <div className="main__content">
                        {content}
                    </div>
                    <div className="main__sidebar">
                        

                    <div className="main-sidebar-panel">
                            <div className="main-sidebar-panel__header">
                                <div className="main-sidebar-panel__title">
                                   <i className="fa fa-globe" /> Configure Population
                                </div>
                            </div>
                            <div className="main-sidebar-panel__body">
                                <FormControl label="Population Size">
                                    
                                    <StepperInput ref="size" value={this.props.population.config.size} />  
                                </FormControl>

                                <FormControl label="Min Depth">
                                    <StepperInput ref="minDepth" value={this.props.population.config.minDepth} />
                                </FormControl>

                                <FormControl label="Max Depth" last>
                                    <StepperInput  ref="maxDepth" value={this.props.population.config.maxDepth} />
                                </FormControl>
                            </div>
                            <div className="main-sidebar-panel__actions">
                                <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.onClickSave.bind(this)}>
                                    <i className="fa fa-refresh"></i> Generate Population
                                </button> 
                                <button className="button button--cancel" onClick={this.onClickCancel.bind(this)}>
                                    <i className="fa fa-undo"></i> Revert
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    updatePopulation
};

export default connect(mapStateToProps, mapDispatchToProps)(Population);
