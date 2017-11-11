import React from 'react';
import IndividualList from '../IndividualList';

const GenerationIndividuals = props => (
    <div className="generation__individuals">
        {props.individuals.length > 0 &&
            <div>
                <h2>Individuals/Population</h2>
                <p>If you are happy with the individuals below, tap "generate samples" to proceed. Alternatively, tap settings to customize the generation of samples.</p>

                <p>Note, you may choose to rollback/re-evolve from a generation by tapping the "evolve" button. If you would like to regenerate a population, use the main menu and navigate back to the initial generation.</p>

                <IndividualList individuals={props.individuals} />
            </div>
        }
        {props.individuals.length === 0  &&
            <div className="generation__individuals-no-result">
                <h2>Generate Individuals/Population</h2>
                <p>You have not generated any individuals, please use the sidebar/click settings to customize individual generation, or click the button below.</p>

                <button onClick={props.onGenerateIndividualsClick} className="button button--primary button--extra-large">
                    <i className="fa fa-refresh"></i> Generate Individuals
                </button>
            </div>
        }
    </div>
);

export default GenerationIndividuals;