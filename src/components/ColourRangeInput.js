import React, { Component } from 'react';

export default class ColourRangeInput extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: this.props.value ? this.props.value : 0
        }
    }



    render() {
        let baseClass = `colour-range-input colour-range-input--${this.props.colour}`;
        return (
            <span className={baseClass}>
                <div className="colour-range-input__track" />
                <div className="colour-range-input__selection" style={{left: 0, right:0}}>
                    <div className="colour-range-input_handle"  style={{left: 0}}/>
                    <div className="colour-range-input_handle" style={{right: 0}}/>
                </div>
            </span>
        );
    } 
}
