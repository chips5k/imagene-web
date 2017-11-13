import React from 'react';
import Sample from '../../common/samples/Sample';

const GenerationSamples = props => (
    <div className="generation__samples">
        {props.samples.length > 0 ? 
            (
                <div className="generation__samples-list">
                    <div className="flex-grid">
                        {props.samples.map((n, i) => 
                            <Sample
                                key={n.id}
                                sample={n}
                                coordinateType={props.coordinateType}
                                symmetric={props.symmetric} 
                                onIncreaseFitnessClick={props.onSampleIncreaseFitnessClick.bind(null, n)}
                                onDecreaseFitnessClick={props.onSampleDecreaseFitnessClick.bind(null, n)}
                                onRemoveClick={props.onSampleRemoveClick.bind(null, n)}
                                onEditClick={props.onSampleEditClick.bind(null, n)}
                                onLabelClick={props.onSampleLabelClick.bind(null, n)}
                                onSaveClick={props.onSampleSaveClick.bind(null, n)}
                                selected={props.selectedSamples.indexOf(n.id) !== -1}
                                onRedraw={props.onSampleRedraw.bind(null, n)}
                            />  
                        )}
                    </div>
                </div>
            ) :
            (
                <div className="generation__samples-no-result">
                    <h2>Generate Samples</h2>
                    <p>
                        You have not generated any samples, please use the sidebar/click settings to customize sample generation, or click the button below.
                    </p>
                    <button 
                        onClick={props.onGenerateSamplesClick} 
                        className="button button--primary button--extra-large"
                    >
                        <i className="fa fa-refresh"></i> Generate Samples
                    </button>
                </div>
            )
        }
    </div>
);

export default GenerationSamples;