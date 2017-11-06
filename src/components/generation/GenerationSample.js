import React, { Component } from 'react';

export default class GenerationSample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    removeSample(e) {
        e.preventDefault();
        this.props.removeSample(this.props.sample.id);
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
        this.props.onClickIncreaseSampleFitness(this.props.sample);
    }

    onClickDecreaseFitness(e) {
        e.preventDefault();
        this.props.onClickDecreaseSampleFitness(this.props.sample);
    }

    toggleSample(e) {
        this.props.toggleSample(this.props.sample);
    }

    handleClickExportSample(e) {
        e.preventDefault();
        this.props.onClickExportSample(this.props.sample.id);
    }

    render() {
        return (
            <div className="generation-sample">
                <div className="generation-sample__header">
                    <label className="generation-sample__label">
                        <input type="checkbox" className="generation-sample__checkbox" checked={this.props.selected} onChange={this.toggleSample.bind(this)}/>
                        <span className="generation-sample__title">Sample {this.props.sample.id} ({this.props.symmetric ? 'Symmetric' : 'Asymmetric'})</span>
                    </label>
                    <button className="generation-sample__edit-button" onClick={this.props.editSample}><i className="fa fa-cog"></i></button>
                    <button className="generation-sample__edit-button" onClick={this.removeSample.bind(this)}><i className="fa fa-remove"></i></button>
                </div>
                <div className="generation-sample__canvas-wrap">
                    {this.props.sample.processing && <div className="generation-sample__canvas-loader" />}
                    <canvas ref="canvas" className="generation-sample__canvas" width={this.props.sample.width} height={this.props.sample.height} />
                </div>
                <div className={this.state.showDetails ? 'generation-sample__details generation-sample__details--open' : 'generation-sample__details'}>
                    <ul className="individuals">
                        <li className="individual">
                            <div className="individual__ref">
                                <div className="individual__ref-label">#</div>
                                <div className="individual__ref-value">R</div>
                            </div>
                            <div className="individual__id">
                                <div className="individual__id-label">Id</div>
                                <div className="individual__id-value">{this.props.sample.redIndividual.id}</div>
                            </div>
                            <div className="individual__fitness">
                                <div className="individual__fitness-label">Fitness</div>
                                <div className="individual__fitness-value">{this.props.sample.redIndividual.fitness}</div>
                            </div>
                            <div className="individual__expression">
                                <div className="individual__expression-label">Expression</div>
                                <div className="individual__expression-value">{this.props.sample.redIndividual.expression.join(" ")}</div>
                            </div>
                        </li>
                        <li className="individual">
                            <div className="individual__ref">
                                <div className="individual__ref-label">#</div>
                                <div className="individual__ref-value">G</div>
                            </div>
                            <div className="individual__id">
                                <div className="individual__id-label">Id</div>
                                <div className="individual__id-value">{this.props.sample.greenIndividual.id}</div>
                            </div>
                            <div className="individual__fitness">
                                <div className="individual__fitness-label">Fitness</div>
                                <div className="individual__fitness-value">{this.props.sample.greenIndividual.fitness}</div>
                            </div>
                            <div className="individual__expression">
                                <div className="individual__expression-label">Expression</div>
                                <div className="individual__expression-value">{this.props.sample.greenIndividual.expression.join(" ")}</div>
                            </div>
                        </li>
                        <li className="individual">
                            <div className="individual__ref">
                                <div className="individual__ref-label">#</div>
                                <div className="individual__ref-value">B</div>
                            </div>
                            <div className="individual__id">
                                <div className="individual__id-label">Id</div>
                                <div className="individual__id-value">{this.props.sample.blueIndividual.id}</div>
                            </div>
                            <div className="individual__fitness">
                                <div className="individual__fitness-label">Fitness</div>
                                <div className="individual__fitness-value">{this.props.sample.blueIndividual.fitness}</div>
                            </div>
                            <div className="individual__expression">
                                <div className="individual__expression-label">Expression</div>
                                <div className="individual__expression-value">{this.props.sample.blueIndividual.expression.join(" ")}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="generation-sample__actions">
                    <div className="generation-sample__fitness">Fitness: <b>{this.props.sample.fitness}</b></div>
                    <div className="generation-sample__controls">
                        <button className="generation-sample__control" onClick={this.onClickIncreaseFitness.bind(this)}><i className="fa fa-plus"></i></button>
                        <button className="generation-sample__control" onClick={this.onClickDecreaseFitness.bind(this)}><i className="fa fa-minus"></i></button>
                        <button className="generation-sample__control" onClick={this.handleClickExportSample.bind(this)}><i className="fa fa-save"></i></button>
                        <button className="generation-sample__control" onClick={this.toggleDetails.bind(this)}><i className={this.state.showDetail ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></button>
                        
                    </div>
                </div>
            </div>
        );
    }
}
                                    