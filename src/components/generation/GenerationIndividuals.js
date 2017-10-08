import React from 'react';

const GenerationIndividuals = (props) => {
    return (
        <div className="generation-individuals">
            <ul>
                {props.individuals.map((n, i) => 
                    <li key={i}><b>Fitness:</b> {n.fitness}, <b>Expression:</b> {n.expression.join(" ")}</li>
                )}
            </ul>
            {props.individuals.length === 0  && <p>You have not generated any individuals, please use the sidebar to proceed.</p>}
        </div>
    );
}

export default GenerationIndividuals;