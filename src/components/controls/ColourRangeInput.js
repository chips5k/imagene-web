import React, { Component } from 'react';

export default class ColourRangeInput extends Component {

    constructor(props) {
        super(props);
        
        let minValue = this.props.minValue > 0 ? this.props.minValue < 255 ? this.props.minValue : 255 : 0;
        let maxValue = this.props.maxValue > 0 ? this.props.maxValue < 255 ? this.props.maxValue : 255 : 0;
        
        this.state = {
            dragStart: false,
            activeHandle: false,
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

        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        
       
    }

    get value() {
        return [this.min, this.max];
    }
    get min() {
        return this.state.handles.min.value;
    }

    get max() {
        return this.state.handles.max.value;
    }

    
    componentDidMount() {
        
        let state = {...this.state};

        
        //Convert the actual values into percent values
        state.handles.min.left = 100 / 255 * this.state.handles.min.value;
        state.handles.max.left = 100 / 255 * this.state.handles.max.value;

        this.setState(state);
    }


    
    handleDragStart(ref, e) {
        let state = {...this.state, activeHandle: ref };
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        state.dragStart = clientX;
        state.handles[ref].prevLeft = state.handles[ref].left;

        this.setState(state);

        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragStop);
        document.addEventListener('touchmove', this.handleDrag);
        document.addEventListener('touchend', this.handleDragStop);
    }

    handleDrag(e) {
       
        let state = {...this.state};
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let currentLeft = (this.state.handles[this.state.activeHandle].prevLeft + (clientX - this.state.dragStart) / this.refs.track.getBoundingClientRect().width * 100);

        if(currentLeft < 0) {
            currentLeft = 0;
        }

        if(currentLeft > 100) {
            currentLeft = 100;
        }

        //TODO Add checks for preventing overlaps;
        


        //Calculate value from pixel positions
        state.handles[this.state.activeHandle].value = Math.round(255 / 100 * currentLeft);

        //Adjust for overhang visually
        state.handles[this.state.activeHandle].left = currentLeft > 100 ? currentLeft : currentLeft;
        

        this.setState(state);
    }

    handleDragStop(e) {
       

        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragStop);
        document.removeEventListener('touchmove', this.handleDrag);
        document.removeEventListener('touchstop', this.handleDragStop);
    }
    

    render() {
        
        let baseClass = `colour-range-input colour-range-input--${this.props.colour}`;
        
        return (
            <span className={baseClass}>
                <div className="colour-range-input__track" ref="track" />
                <div className="colour-range-input__handle" onTouchStart={this.handleDragStart.bind(this, 'min')} onMouseDown={this.handleDragStart.bind(this, 'min')} style={{left: (this.state.handles.min.left + '%')}}/>
                <div className="colour-range-input__handle colour-range-input__handle-right"  onTouchStart={this.handleDragStart.bind(this, 'max')} onMouseDown={this.handleDragStart.bind(this, 'max')} style={{left: (this.state.handles.max.left + '%')}}/>
            </span>
        );
    
    } 
}
