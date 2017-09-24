import React, { Component } from 'react';
            
import { solveRpnExpression } from './core';

export default class GenerationSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: true
        };
    }

    componentDidMount() {

        let worker = new Worker('/sample-worker.js');

        let ctx = this.refs.canvas.getContext('2d');
        let image = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        worker.postMessage({
            red: this.props.red,
            green: this.props.green,
            blue: this.props.blue,
            image: image,
        });

        worker.onmessage = e => {
            ctx.putImageData(e.data, 0, 0);
        };

    }

    render() {
        return (
            <div className="generation-sample">
                <h3>Sample {this.props.sample.id}</h3>
                {this.state.processing && <div className="loader" />}
                <canvas ref="canvas" className="generation-sample__canvas" width={this.props.config.sampleWidth} height={this.props.config.sampleHeight} />
                <ul>
                    <li><b>Red: </b> {this.props.red.expression.join(" ")}</li>
                    <li><b>Green: </b> {this.props.green.expression.join(" ")}</li>
                    <li><b>Blue: </b> {this.props.blue.expression.join(" ")}</li>
                </ul>
            </div>
        );
    }
}
                                    