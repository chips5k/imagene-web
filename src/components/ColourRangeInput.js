import React, { Component } from 'react';

export default class ColourRangeInput extends Component {

    constructor(props) {
        super(props);
        
        let minValue = this.props.minValue > 0 ? this.props.minValue < 255 ? this.props.minValue : 255 : 0;
        let maxValue = this.props.maxValue > 0 ? this.props.maxValue < 255 ? this.props.maxValue : 255 : 0;
        
        this.state = {
            mouseStart: false,
            activeHandle: false,
            trackWidth: false,
            handles: {
                min: {
                    left: 0,
                    prevLeft: 0,
                    value: minValue
                },
                max: {
                    left: 0,
                    prevLeft: 0,
                    value: maxValue
                }
            }
        }

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        
       
    }

    get min() {
        return this.state.handles.min.value;
    }

    get max() {
        return this.state.handles.max.value;
    }

    componentDidMount() {
        
        let state = {...this.state};

        //Get pixel width of the track for this
        let trackWidth = this.refs.track.getBoundingClientRect().width;

        
         //Convert the actual values into pixel values
        state.handles.min.left = trackWidth / 255 * this.state.handles.min.value;
        state.handles.max.left = trackWidth / 255 * this.state.handles.max.value - 14;
        state.trackWidth = trackWidth;

        this.setState(state);
    }

    
    onMouseDown(ref, e) {
        e.preventDefault();
        
        let state = {...this.state, activeHandle: ref };
        state.mouseStart = e.clientX;
        state.handles[ref].prevLeft = state.handles[ref].left;

        this.setState(state);

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove(e) {
        e.preventDefault();
        let state = {...this.state};
        
        let currentLeft = this.state.handles[this.state.activeHandle].prevLeft + e.clientX - this.state.mouseStart;

        if(currentLeft < 0) {
            currentLeft = 0;
        }

        if(currentLeft > this.state.trackWidth) {
            currentLeft = this.state.trackWidth;
        }

        //TODO Add checks for preventing overlaps;
        


        //Calculate value from pixel positions
        state.handles[this.state.activeHandle].value = Math.round(255 / this.state.trackWidth * currentLeft);

        //Adjust for overhang visually
        state.handles[this.state.activeHandle].left = currentLeft > this.state.trackWidth - 14 ? currentLeft - 14 : currentLeft;
        

        this.setState(state);
    }

    onMouseUp(e) {
        e.preventDefault();

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }



    render() {
        let baseClass = `colour-range-input colour-range-input--${this.props.colour}`;
        return (
            <span className={baseClass}>
                <div className="colour-range-input__track" ref="track" />
                <div className="colour-range-input_handle" onMouseDown={this.onMouseDown.bind(this, 'min')} style={{left: this.state.handles.min.left}}/>
                <div className="colour-range-input_handle"  onMouseDown={this.onMouseDown.bind(this, 'max')} style={{left: this.state.handles.max.left}}/>
            </span>
        );
    } 
}
