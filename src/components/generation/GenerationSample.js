import React, { Component } from 'react';

export default class GenerationSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    renderImage() {
        let key = this.props.coordinateType;
        if(this.props.sample.cache[key]) {
            let ctx = this.refs.canvas.getContext('2d');
            let image = ctx.getImageData(0, 0, this.refs.canvas.width, this.refs.canvas.height);
            image.data.set(this.props.sample.cache[key]);
            ctx.putImageData(image, 0, 0);

            if(this.props.symmetric) {
                let degrees180 = 180 * (Math.PI/180); 
                
                //Setup temp canvas to hold rotated copy of a cropped top left canvas
                let tempCanvas = document.createElement('canvas');
                tempCanvas.width = image.width / 2;
                tempCanvas.height = image.height / 2;
                let tempCtx = tempCanvas.getContext('2d');
                tempCtx.putImageData(ctx.getImageData(0, 0, image.width / 2, image.height / 2), 0, 0);

                ctx.clearRect(0, 0, image.width, image.height);
                //Rotate the quadrant image 180 degrees
                tempCtx.save();
                tempCtx.translate(image.width / 2, image.height / 2);
                tempCtx.rotate(degrees180);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore(); 
                
                //Draw left hand side
                ctx.drawImage(tempCanvas, 0, 0);

                tempCtx.save();
                // //Next mirror the quadrant onto itself by using negative scaling
                tempCtx.scale(-1, 1);
                tempCtx.translate(-image.width / 2, 0);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();


                //Draw the right hand side
                ctx.drawImage(tempCanvas, image.width / 2, 0);

                tempCtx.save();
                tempCtx.scale(1, -1);
                tempCtx.translate(0, -image.height / 2);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();

                //Draw the right hand side
                ctx.drawImage(tempCanvas, image.width / 2, image.height / 2);


                tempCtx.save();
                tempCtx.scale(-1, 1);
                tempCtx.translate(-image.width / 2, 0);
                tempCtx.drawImage(tempCanvas, 0, 0);
                tempCtx.restore();

                //Draw the right hand side
                ctx.drawImage(tempCanvas, 0, image.height / 2);    
            }
        } else {
            if(this.props.sample.processing === false) {
                this.props.generateSampleData(this.props.sample, this.props.coordinateType);
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.renderImage();
    }

    toggleDetails() {
        this.setState({
            showDetails: !this.state.showDetails
        });
    }


    componentDidMount() {
        this.renderImage();
    }

  

    onClickIncreaseFitness(e) {
        e.preventDefault();
        this.props.onClickIncreaseFitness();
    }

    onClickDecreaseFitness(e) {
        e.preventDefault();
        this.props.onClickDecreaseFitness();
    }

    render() {
        return (
            <div className="generation-sample" style={{maxWidth: this.props.sample.width + 'px'}}>
                <div className="generation-sample__header">
                    <h3 className="generation-sample__title">Sample {this.props.sample.id} ({this.props.symmetric ? 'Symmetric' : 'Asymmetric'})</h3>
                    <button className="generation-sample__edit-button" onClick={this.props.editSample}><i className="fa fa-cog"></i></button>
                </div>
                <div className="generation-sample__canvas-wrap">
                    {this.props.sample.processing && <div className="generation-sample__canvas-loader" />}
                    <canvas ref="canvas" className="generation-sample__canvas" width={this.props.sample.width} height={this.props.sample.height} />
                </div>
                <div className={this.state.showDetails ? 'generation-sample__details generation-sample__details--open' : 'generation-sample__details'}>
                    <ul>
                        <li><b>Red: </b><br/><b>Fitness:</b> {this.props.sample.redIndividual.fitness}, <b>Expression:</b> {this.props.sample.redIndividual.expression.join(" ")}</li>
                        <li><b>Green: </b><br/><b>Fitness:</b> {this.props.sample.greenIndividual.fitness}, <b>Expression:</b> {this.props.sample.greenIndividual.expression.join(" ")}</li>
                        <li><b>Blue: </b><br/><b>Fitness:</b> {this.props.sample.blueIndividual.fitness}, <b>Expression:</b> {this.props.sample.blueIndividual.expression.join(" ")}</li>
                    </ul>
                </div>
                <div className="generation-sample__actions">
                    <div className="generation-sample__fitness">{this.props.sample.fitness}</div>
                    <div className="generation-sample__controls">
                        <button onClick={this.toggleDetails.bind(this)}><i className={this.state.showDetail ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></button>
                        <button onClick={this.onClickIncreaseFitness.bind(this)}><i className="fa fa-plus"></i></button>
                        <button onClick={this.onClickDecreaseFitness.bind(this)}><i className="fa fa-minus"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}
                                    