import React, { Component } from 'react';

export default class GenerationViewControls extends Component {

    onClickSymmetry(value, e) {
        e.preventDefault();
        this.props.onClickSymmetry(value);
    }

    onClickView(value, e) {
        e.preventDefault();
        this.props.onClickView(value);
    }

    onClickCoordinateType(value, e) {
        e.preventDefault();
        this.props.onClickCoordinateType(value);
    }

    determineClass = (className, property, value) => {
        return className + (this.props[property] === value ? ' generation-nav__toggle--active' : '');
    }

    render() {
        return (
            <div className="generation-nav">
                <div style={{float: 'left'}}>
                    <a className={this.determineClass('generation-nav__toggle', 'view', 'individuals')} onClick={this.onClickView.bind(this, 'individuals')}>
                        <i className="fa fa-users"></i>{' '}  Individuals
                    </a>
                    <a className={this.determineClass('generation-nav__toggle', 'view', 'samples')}  style={{marginRight: '1rem'}} onClick={this.onClickView.bind(this, 'samples')}>
                        <i className="fa fa-image"></i>{' '} Samples
                    </a>
                </div>
    
                <div style={{float: 'right'}}>
                    <a className={this.determineClass('generation-nav__toggle generation-nav__toggle--alternate', 'coordinateType', 'cartesian')} onClick={this.onClickCoordinateType.bind(this, 'cartesian')}>
                        <i className="fa fa-th"></i>{' '}  Cartesian
                    </a>

                    <a className={this.determineClass('generation-nav__toggle generation-nav__toggle--alternate', 'coordinateType', 'polar')} onClick={this.onClickCoordinateType.bind(this, 'polar')} style={{marginRight: '0.5rem'}}>
                        <i className="fa fa-globe"></i>{' '}  Polar
                    </a>
                   
    
                    <a className={this.determineClass('generation-nav__toggle generation-nav__toggle--alternate', 'symmetry', 'symmetric')} onClick={this.onClickSymmetry.bind(this, 'symmetric')}>
                        <i className="fa fa-angle-left"></i> 
                        {' '}
                        <i className="fa fa-angle-right"></i> 
                        {' '}
                        Symmetric
                    </a>
                    <a className={this.determineClass('generation-nav__toggle generation-nav__toggle--alternate', 'symmetry', 'asymmetric')} href="" onClick={this.onClickSymmetry.bind(this, 'asymmetric')}>
                        <i className="fa fa-angle-right"></i> 
                        {' '}
                        <i className="fa fa-angle-left"></i> 
                        {' '}
                        Asymmetric
                    </a>
                </div>
                <div style={{clear: 'both'}}></div>
            </div>
        );
    }

}