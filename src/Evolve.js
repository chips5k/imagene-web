import React, { Component } from 'react';
import Sample1 from './img/samples/1.png';
import Sample2 from './img/samples/2.png';
import Sample3 from './img/samples/3.png';
import Sample4 from './img/samples/4.png';
import Sample5 from './img/samples/6.png';
import Sample6 from './img/samples/7.png';
import {Link} from 'react-router-dom';

export default class Evolve extends Component {

    render() {
        return (
            <div className="evolve">
                <div className="content">

                    <div className="tabs">
                        <div className="tabs__links">
                            <a className="tabs__link tabs__link--active">Asymmetric</a>
                            <a className="tabs__link">Polar</a>
                            <a className="tabs__link">Symmetric</a>
                            <a className="tabs__link tabs__link--last">Parse Tree</a>
                        </div>
                        <div className="tabs__pane-wrapper">
                            <div className="tabs__pane">


                                <div className="media">
                                    <img className="media__image" src={Sample1} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                                <div className="media">
                                    <img className="media__image" src={Sample2} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                                <div className="media">
                                    <img className="media__image" src={Sample3} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                                <div className="media">
                                    <img className="media__image" src={Sample4} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                                <div className="media">
                                    <img className="media__image" src={Sample5} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                                <div className="media">
                                    <img className="media__image" src={Sample6} style={{maxWidth: '200px', height: 'auto' }} alt="Sample" />
                                    <figure className="media__caption" >Sample output of Imagene</figure>
                                </div>

                            </div>

                            <div className="tabs__pane">
                            
                            </div>

                            <div className="tabs__pane">
                            
                            </div>

                            <div className="tabs__pane">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}