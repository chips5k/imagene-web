import React, { Component } from 'react';

export default class StepperFormControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? this.props.value : 0
        }
    }

    get value() {
        return this.state.value;
    }

    componentWillReceiveProps(props) {
        this.state = {...props}
    }

    increase() {
        let maxValue = this.props.maxValue ? this.props.maxValue : false;
        let value = parseInt(this.state.value, 10) + 1;
        if(maxValue) {
            if(value > maxValue) {
                value = maxValue;
            }
        }

        this.setState({
            value: value
        });
    }

    decrease() {
        let minValue = this.props.minValue ? this.props.minValue : 0;
        let value = parseInt(this.state.value, 10) - 1;
        if(value < minValue) {
            value = minValue;
        }

        this.setState({
            value: value
        });
    }

    onChange(e) {
        let maxValue = this.props.maxValue ? this.props.maxValue : false;
        let minValue = this.props.minValue ? this.props.minValue : 0;

        let value = e.target.value;

        if(maxValue) {
            if(value > maxValue) {
                value = maxValue;
            }
        }

        if(value < minValue) {
            value = minValue;
        }

        this.setState({
            value: value
        });

    }


    render() {
        return (
            <span className="stepper-input">
                <input className="stepper-input__input" type="text" value={this.state.value} onChange={this.onChange.bind(this)}/>
                <button className="stepper-input__first-button" onClick={this.increase.bind(this)}><i className="fa fa-plus"></i></button>
                <button className="stepper-input__last-button"  onClick={this.decrease.bind(this)}><i className="fa fa-minus"></i></button>
            </span>
        );
    } 
}
