import React, { Component } from 'react';
                               

export default class GenerationSample extends Component {

    render() {
        return (
            <div className="generation-sample">
                <h3>Sample {this.props.sample.id}</h3>
                <canvas className="generation-sample__canvas" width={this.props.config.sampleWidth} height={this.props.config.sampleHeight} />
                <ul>
                    <li><b>Red: </b> {this.props.red.expression.join(" ")}</li>
                    <li><b>Green: </b> {this.props.green.expression.join(" ")}</li>
                    <li><b>Blue: </b> {this.props.blue.expression.join(" ")}</li>
                </ul>
            </div>
        );
    }
}
                                    