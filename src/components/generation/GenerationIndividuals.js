import React from 'react';

const GenerationIndividuals = (props) => {
    return (
        <div className="generation-individuals">
            
            {props.individuals.length > 0 &&
                <div>
                    <h2>Individuals/Population</h2>
                    <p>If you are happy with the individuals below, tap "generate samples" to proceed. Alternatively, tap settings to customize the generation of samples.</p>

                    <p>Note, you may choose to rollback/re-evolve from a generation by tapping the "evolve" button. If you would like to regenerate a population, use the main menu and navigate back to the initial generation.</p>

                    <ul className="individuals">
                        {props.individuals.map((n, i) => 
                            <li key={i} className="individual">
                                <div className="individual__id">
                                    <div className="individual__id-label">Id</div>
                                    <div className="individual__id-value">{n.id}</div>
                                </div>
                                <div className="individual__fitness">
                                    <div className="individual__fitness-label">Fitness</div>
                                    <div className="individual__fitness-value">{n.fitness}</div>
                                </div>
                                <div className="individual__expression">
                                    <div className="individual__expression-label">Expression</div>
                                    <div className="individual__expression-value">{n.expression.join(" ")}</div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            }
            {props.individuals.length === 0  &&
                 <div style={{textAlign: 'center'}}>
                    <h2>Generate Individuals/Population</h2>
                    <p>You have not generated any individuals, please use the sidebar/click settings to customize individual generation, or click the button below.</p>

                    <button onClick={props.generateIndividuals} className="button button--primary button--extra-large">
                        <i className="fa fa-refresh"></i> Generate Individuals
                    </button>

                 </div>
            }
        </div>
    );
}

export default GenerationIndividuals;