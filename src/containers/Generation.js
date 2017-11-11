import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Generation } from '../components/generation';

class GenerationContainer extends Component {

    componentDidMount() {
        if(!this.props.generation) {
            this.props.actions.redirect('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.generation) {
            this.props.actions.redirect('/');
        }
    }

    renderImageDataToDataUrl(width, height, imageData, symmetric) {
        let exportCanvas = document.createElement('canvas');
        exportCanvas.width = width;
        exportCanvas.height = height;
        this.renderImageToCanvas(exportCanvas, imageData, symmetric);

        return exportCanvas.toDataURL();
    }

    renderImageToCanvas = (canvas, imageData, symmetric) => {
        
        const ctx = canvas.getContext('2d');
       
        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, image.width, image.height);
        image.data.set(imageData);
        ctx.putImageData(image, 0, 0);
    
        if(symmetric) {
            const degrees180 = 180 * (Math.PI/180); 
            //Setup temp canvas to hold rotated copy of a cropped top left canvas
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = image.width / 2;
            tempCanvas.height = image.height / 2;
            const tempCtx = tempCanvas.getContext('2d');
            tempCtx.putImageData(ctx.getImageData(0, 0, image.width / 2, image.height / 2), 0, 0);
    
           
    
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
    }

    handleSampleRedraw(coordinateType, symmetric, sample, canvas) {
        
        if(sample.cache[coordinateType]) {
            this.renderImageToCanvas(canvas, sample.cache[coordinateType], symmetric);
        } else {
            if(sample.processing === false) {
                this.props.actions.generateSampleData(sample, coordinateType);
            }
        }
    }

    render() {
        if(this.props.generation) {
            return ( 
                <Generation 
                    generation={this.props.generation} 
                    config={this.props.config} 
                    increaseSampleFitness={this.props.actions.increaseSampleFitness}
                    decreaseSampleFitness={this.props.actions.decreaseSampleFitness}
                    generateIndividuals={this.props.actions.generateIndividuals}
                    generateSamples={this.props.actions.generateSamples}
                    updateSamples={this.props.actions.updateSamples}
                    removeSamples={this.props.actions.removeSamples}
                    evolveGeneration={this.props.actions.evolveIndividuals}
                    lastSampleId={this.props.lastSampleId}
                    toggleSidebar={this.props.toggleSidebar}
                    onSampleRedraw={this.handleSampleRedraw.bind(this)}
                    renderImageDataToDataUrl={this.renderImageDataToDataUrl.bind(this)}
                    addToWorkerQueue={this.props.addToWorkerQueue}
                />
            );
        }
        return <div />;           
         
    }
}

const mapStateToProps = (state, ownProps) => {
    let generation = state.generations.byId[ownProps.match.params.id];

    if(generation) {
        generation = {...generation};
        //Hydrate the individuals
        generation.individuals = generation.individuals.map(n => {
            return state.individuals.byId[n];
        });

        //Hydrate the samples
        generation.samples = generation.samples.map(n => {
            let sample = state.samples.byId[n];
            return {
                ...sample,
                 //Hydrate the samples individual data
                redIndividual: state.individuals.byId[sample.redIndividualId],
                greenIndividual: state.individuals.byId[sample.greenIndividualId],
                blueIndividual: state.individuals.byId[sample.blueIndividualId]
            }
        });

        generation.samples.reverse();
    }
    
    return {
        generation: generation,
        lastSampleId: state.samples.allIds.reduce((n, a) => Math.max(n, a), 0),
        config: state.config
    }
};


export default connect(mapStateToProps)(GenerationContainer);