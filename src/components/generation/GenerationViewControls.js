import React from 'react';

const GenerationViewControls = (props) => {
    return (
        <div className="generation-nav">
            <div style={{float: 'left'}}>
                <a className="generation-nav__toggle generation-nav__toggle--active" href="">
                    <i className="fa fa-users"></i>{' '}  Individuals
                </a>
                <a className="generation-nav__toggle" href="" style={{marginRight: '1rem'}}>
                    <i className="fa fa-image"></i>{' '} Samples
                </a>
            </div>

            <div style={{float: 'right'}}>
                <a className="generation-nav__toggle generation-nav__toggle--alternate" href="">
                    <i className="fa fa-globe"></i>{' '}  Polar
                </a>
                <a className="generation-nav__toggle generation-nav__toggle--alternate generation-nav__toggle--active" href="">
                    <i className="fa fa-th"></i>{' '}  Cartesian
                </a>

                <a className="generation-nav__toggle generation-nav__toggle--alternate" href="">
                    <i className="fa fa-angle-left"></i> 
                    {' '}
                    <i className="fa fa-angle-right"></i> 
                    {' '}
                    Symmetric
                </a>
                <a className="generation-nav__toggle generation-nav__toggle--alternate generation-nav__toggle--active" href="">
                    <i className="fa fa-angle-right"></i> 
                    {' '}
                    <i className="fa fa-angle-left"></i> 
                    {' '}
                    Asymmetric
                </a>
            </div>
        </div>
    );
}

export default GenerationViewControls;