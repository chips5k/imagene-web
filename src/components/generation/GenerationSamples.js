import React from 'react';
import { GenerationSample } from './';

const GenerationSamples = (props) => {
    return (
        <div className="generation-samples">
            <div className="flex-grid">
                {props.samples.map(s => 
                    <GenerationSample 
                        key={s.id} 
                        sample={s} 
                        coordinateType={props.coordinateType}
                        symmetric={props.symmetric}
                        onClickIncreaseFitness={props.onClickIncreaseFitness.bind(s)}
                        onClickDecreaseFitness={props.onClickDecreaseFitness.bind(s)}
                    />
                )}
            </div>
            {props.samples.length === 0  && <p>You have not generated any samples, please use the sidebar to proceed.</p>}
        </div>
    );
}

export default GenerationSamples;