import React from 'react';
import PropTypes from 'prop-types';

const Individual = props => (
    
    <div className="individual">
        <div className="individual__id">
            <div className="individual__id-label">Id</div>
            <div className="individual__id-value">{props.individual.id}</div>
        </div>
        <div className="individual__fitness">
            <div className="individual__fitness-label">Fitness</div>
            <div className="individual__fitness-value">{props.individual.fitness}</div>
        </div>
        <div className="individual__expression">
            <div className="individual__expression-label">Expression</div>
            <div className="individual__expression-value">{props.individual.expression.join(" ")}</div>
        </div>
    </div>
);

Individual.propTypes = {
    individual: PropTypes.shape({
        id: PropTypes.number,
        fitness: PropTypes.number,
        expression: PropTypes.array
    }).isRequired
}

export default Individual;