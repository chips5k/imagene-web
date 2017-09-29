import React, { Component } from 'react';
import GenerationSampleWorker from './GenerationSample.worker.js';

export default class GenerationSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            processing: true
        };
    }

    componentDidMount() {
        const worker = new GenerationSampleWorker();
        
        let ctx = this.refs.canvas.getContext('2d');
        let image = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);

        worker.postMessage({
            sample: this.props.sample,
            redIndividual: this.props.redIndividual,
            greenIndividual: this.props.greenIndividual,
            blueIndividual: this.props.blueIndividual,
            coordinateType: this.props.coordinateType,
            image: image,
        });

        worker.onmessage = e => {

            ctx.putImageData(e.data, 0, 0);

            if(this.props.symmetric) {
                let degrees180 = 180 * (Math.PI/180); 
                
                //Setup temp canvas to hold rotated copy of a cropped top left canvas
                let tempCanvas = document.createElement('canvas');
                tempCanvas.width = e.data.width / 2;
                tempCanvas.height = e.data.height / 2;
                let tempCtx = tempCanvas.getContext('2d');
                tempCtx.putImageData(ctx.getImageData(0, 0, e.data.width / 2, e.data.height / 2), 0, 0);

                ctx.clearRect(0, 0, e.data.width, e.data.height);
                //Rotate the quadrant image 180 degrees
                tempCtx.save();
                tempCtx.translate(e.data.width / 2, e.data.height / 2);
                tempCtx.rotate(degrees180);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore(); 
                
               
                //Draw left hand side
                ctx.drawImage(tempCanvas, 0, 0);

                tempCtx.save();
                // //Next mirror the quadrant onto itself by using negative scaling
                tempCtx.scale(-1, 1);
                tempCtx.translate(-e.data.width / 2, 0);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();


                //Draw the right hand side
                ctx.drawImage(tempCanvas, e.data.width / 2, 0);

                tempCtx.save();
                tempCtx.scale(1, -1);
                tempCtx.translate(0, -e.data.height / 2);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();

                //Draw the right hand side
                ctx.drawImage(tempCanvas, e.data.width / 2, e.data.height / 2);


                tempCtx.save();
                tempCtx.scale(-1, 1);
                tempCtx.translate(-e.data.width / 2, 0);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();

                //Draw the right hand side
                ctx.drawImage(tempCanvas, 0, e.data.height / 2);    
            }


            this.props.cacheSampleData(this.props.sample, this.props.type, e.data);
            this.setState({
                processing: false
            });
        };
    }


    render() {
        return (
            <div className="generation-sample" style={{maxWidth: this.props.sample.width + 'px'}}>
                <div className="generation-sample__header">
                    <h3 className="generation-sample__title">Sample {this.props.sample.id}</h3>
                </div>
                <div className="generation-sample__canvas-wrap">
                    {this.state.processing && <div className="generation-sample__canvas-loader" />}
                    <canvas ref="canvas" className="generation-sample__canvas" width={this.props.sample.width} height={this.props.sample.height} />
                </div>
                <div className="generation-sample__details">
                    <ul>
                        <li><b>Red: </b> {this.props.redIndividual.expression.join(" ")}</li>
                        <li><b>Green: </b> {this.props.greenIndividual.expression.join(" ")}</li>
                        <li><b>Blue: </b> {this.props.blueIndividual.expression.join(" ")}</li>
                    </ul>
                </div>
                <div className="generation-sample__actions">

                </div>
            </div>
        );
    }
}
                                    