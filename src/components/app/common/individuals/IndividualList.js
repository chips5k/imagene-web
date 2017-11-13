import React from 'react';
import PropTypes from 'prop-types';
import Individual from './Individual';

const IndividualList = props => (
    <ul className="individual-list">
        {props.children ? 
            props.children.map((child, i) => 
                <li key={i} className="individual-list__item">
                    {child}
                </li>
            )
            :
            props.individuals.map((individual, i) => 
                <li key={i} className="individual-list__item">
                    <Individual individual={individual} />
                </li>
            )
        }
    </ul>
);

IndividualList.propTypes = {
    individuals: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        fitness: PropTypes.number,
        expression: PropTypes.array
    })),
    children: PropTypes.arrayOf(PropTypes.element)
}

export default IndividualList;