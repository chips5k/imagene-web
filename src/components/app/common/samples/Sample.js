import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Individual from '../../common/individuals/Individual';
import IndividualList from '../../common/individuals/IndividualList';

export default class Sample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    componentDidMount() {
        this.props.onRedraw(this.refs.canvas);
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.onRedraw(this.refs.canvas);
    }

    handleToggleDetailsClick() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }

    render() {
        return (
            <div className={`sample ${this.props.selected ? 'sample--selected' : ''}`}>
                <div className="sample__header">
                    <label className="sample__label" onClick={this.props.onLabelClick}>
                        <span className="sample__checkbox">
                            <i className={`fa ${this.props.selected ? 'fa-check-square-o' : 'fa-square-o'}`}></i>
                        </span>

                        <span className="sample__title">
                            Sample {this.props.sample.id} {' '}
                            ({this.props.symmetric ? 'Symmetric' : 'Asymmetric'})
                        </span>

                    </label>

                    <button className="sample__control" onClick={this.props.onEditClick}>
                        <i className="fa fa-cog"></i>
                    </button>

                    <button className="sample__control" onClick={this.props.onRemoveClick}>
                        <i className="fa fa-remove"></i>
                    </button>

                </div>

                <div className="sample__canvas-wrap">
                    
                    <div className={`sample__canvas-loader ${this.props.sample.processing ? 'sample__canvas-loader--visible' : ''}`} />

                    <canvas 
                        ref="canvas" 
                        className="sample__canvas" 
                        width={this.props.sample.width} 
                        height={this.props.sample.height}
                    />

                </div>

                <div className={this.state.showDetails ? 'sample__details sample__details--open' : 'sample__details'}>
                    <IndividualList >
                        <Individual 
                            name="R"
                            individual={this.props.sample.redIndividual}
                        />
                        <Individual 
                            name="G"
                            individual={this.props.sample.greenIndividual}
                        />
                        <Individual 
                            name="B"
                            individual={this.props.sample.blueIndividual}
                        />
                    </IndividualList>
                </div>

                <div className="sample__actions">

                    <div className="sample__fitness">Fitness: <b>{this.props.sample.fitness}</b></div>

                    <div className="sample__controls">

                        <button className="sample__control" onClick={this.props.onIncreaseFitnessClick}>
                            <i className="fa fa-plus"></i>
                        </button>
                        
                        <button className="sample__control" onClick={this.props.onDecreaseFitnessClick}>
                            <i className="fa fa-minus"></i>
                        </button>

                        <button className="sample__control" onClick={this.props.onSaveClick.bind(this)}>
                            <i className="fa fa-save"></i>
                        </button>
                        
                        <button className="sample__control" onClick={this.handleToggleDetailsClick.bind(this)}>
                            <i className={this.state.showDetail ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                        </button>
                        
                    </div>
                </div>
            </div>
        );
    }
}

Sample.propTypes = {
    onSaveClick: PropTypes.func.isRequired,
    onDecreaseFitnessClick: PropTypes.func.isRequired,
    onIncreaseFitnessClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onEditClick: PropTypes.func.isRequired,
    onLabelClick: PropTypes.func.isRequired,
    onRedraw: PropTypes.func.isRequired,
    sample: PropTypes.shape({
        id: PropTypes.number,
        fitness: PropTypes.number,
        redIndividual: PropTypes.shape({
            id: PropTypes.number,
            fitness: PropTypes.number,
            expression: PropTypes.array
        }),
        greenIndividual: PropTypes.shape({
            id: PropTypes.number,
            fitness: PropTypes.number,
            expression: PropTypes.array
        }),
        blueIndividual: PropTypes.shape({
            id: PropTypes.number,
            fitness: PropTypes.number,
            expression: PropTypes.array
        }),
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        processing: PropTypes.bool.isRequired
    }).isRequired,
    selected: PropTypes.bool.isRequired
};