import React from 'react';
import { GenerationSample } from './';

const GenerationSamples = (props) => {
    
    return (
        <div className="generation-samples">
            {props.samples.length > 0 &&
                <div className="flex-grid">
                    {props.samples.map(s => 
                        <GenerationSample 
                            key={s.id} 
                            sample={s} 
                            coordinateType={props.coordinateType}
                            symmetric={props.symmetric}
                            onClickIncreaseSampleFitness={props.increaseSampleFitness}
                            onClickDecreaseSampleFitness={props.decreaseSampleFitness}
                            generateSampleData={props.generateSampleData}
                            selected={(props.selectedSamples.indexOf(s.id) !== -1)}
                            toggleSample={props.toggleSample}
                        />
                    )}
                </div>
            }

            {props.samples.length === 0  && 
                    <div style={{textAlign: 'center'}}>
                       <h2>Generate Samples</h2>
                       <p>You have not generated any samples, please use the sidebar/click settings to customize sample generation, or click the button below.</p>
   
                       <button onClick={props.generateSamples} className="button button--primary button--extra-large">
                           <i className="fa fa-refresh"></i> Generate Samples
                       </button>
                    </div>
            }
        </div>
    );
}

export default GenerationSamples;