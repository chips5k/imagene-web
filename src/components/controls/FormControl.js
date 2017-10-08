import React, { Component } from 'react';

export default class StepperFormControl extends Component {

    render() {
        return (
            <div className="form-control" style={this.props.last ? {marginRight: 0} : {}}>
                <label className="form-control__label">{this.props.label}</label>
                <div className="form-control__input">
                    {this.props.children}
                </div>
            </div>
        );
    } 
}
