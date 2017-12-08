import React from 'react';
import Sample1 from '../../../assets/img/samples/1.png';
import ImagenePaper from '../../../assets/pdf/imagene.pdf';

import Header, { HeaderButton, HeaderTitle } from '../layout/Header';

export const HomeView = props => (
    <div className="view-container">
        <Header>
            <HeaderButton iconClass="fa fa-bars" onClick={props.onNavSidebarToggleClick} />
            <HeaderTitle>Home </HeaderTitle>
        </Header>
        
        <div className="home flex-fill padding-1">
            
            <div>
                <h2>Get Started</h2>

                <p>To create a new population/generation, click the <b>"New Generation"</b> button in the left hand menu. 
                    Alternatively, you may import existing data by clicking the <b>"Import button"</b>. This will all you to view
                    previous data sets or continue where you left off. 
                </p>

                <div style={{paddingTop: '1rem', paddingBottom: '1rem'}}>
                    <a className="button button--primary button--extra-large" style={{float: 'left', marginTop: '0.5rem'}} onClick={props.onGetStartedClick}>Get Started</a>
                    <a className="button button--info button--extra-large" style={{float: 'left', marginTop: '0.5rem'}} onClick={props.onWatchTutorialClick}>Video Walkthrough</a>
                    <a className="button button--alt button--extra-large" style={{float: 'left', marginTop: '0.5rem'}} onClick={props.onViewHelpClick}>View Help/Instructions</a>
                    <div style={{clear: 'both'}}></div>
                </div>
                <hr/>

                <h2>About Imagene Web</h2>
                

                <p>Imagene Web is a rebuild of the existing Imagene C++ application.
                The application is a very basic implementation of genetic programming.</p>

                <p>Users create initial populations of math expressions.
                From this population, image samples are generated by randomly selecting three individuals of the population to become the inputs for the R, G and B components of each pixel coordinate.</p>

                <p>Upon generating samples, users may rank the fitness of each sample. The ranking/fitness assigned is averaged and applied to the underlying individuals for the R, G and B Components.</p>

                <p>Once a user is happy with the fitness levels of the current generation/population individuals, they may choose to "evolve" the population into a new generation.</p>

                <p>Evolving a population creates a new generation by applying elitism, mutation and crossover to the previous individuals.</p> 

                <p><a href={ImagenePaper} target="_BLANK">You can download a copy of the original paper relating to the c++ application here.</a></p>
            </div>
            
            <div className="media" style={{ minWidth: 200, maxWidth: 300}}>
                <img className="media__image" src={Sample1} alt="Sample" />
                <div className="media__caption" >Sample output of Imagene</div>
            </div>
        </div>
        
    </div>
                        
);


export default HomeView;