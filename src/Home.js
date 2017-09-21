import React, { Component } from 'react';
import Sample1 from './img/samples/1.png';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    render() {
        return (
            <div className="home">

                <div className="content">
                    <div className="grid">
                        <div className="grid__column" style={{paddingRight: '4rem'}}>
                            <h2>Welcome</h2>

                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget ante vitae massa convallis efficitur. Sed mattis, tortor et dapibus aliquet, nisi dui pharetra quam, posuere vehicula purus sem sed eros. Nam sed urna placerat, mattis orci vitae, tempor libero. Quisque non mauris id nisl sagittis pretium a et magna. Nullam non malesuada metus, in gravida erat. Nunc maximus tincidunt velit et lobortis. Nulla faucibus volutpat diam eu ultrices. Praesent porta aliquam fermentum. Aenean at pharetra justo. Quisque urna risus, mattis sit amet lacinia id, imperdiet ut arcu. Aenean ac interdum eros. Aliquam sit amet egestas nulla. Integer orci turpis, ornare et laoreet sed, dapibus ac diam. Nullam volutpat massa sit amet nunc mattis ullamcorper. Integer aliquam tempor sollicitudin.
                            </p>

                            <p>
                                Proin sed sollicitudin libero. Suspendisse placerat sem varius sapien viverra, cursus porta mi mattis. Integer consequat ex libero, quis sollicitudin tellus imperdiet vitae. Quisque ac magna sed dolor tristique posuere at vitae nunc. Pellentesque ut erat convallis, posuere diam in, tempus dui. Nam suscipit enim leo, id facilisis sapien pellentesque pharetra. Vivamus elementum molestie ex, eu pellentesque nisi ornare id.
                            </p>

                            <Link to="/evolve" className="button button--primary">Begin</Link>

                            <hr style={{margin:'2rem'}} />
                        
                            <small>Logo made by <a rel="noopener noreferrer" href="http://www.freepik.com" title="Freepik">Freepik</a> from <a rel="noopener noreferrer" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" rel="noopener noreferrer"  target="_blank">CC 3.0 BY</a></small>

                        </div>

                        <div className="grid__column" style={{minWidth:320, paddingTop: 20}}>
                            <div className="media">
                                <img className="media__image" src={Sample1} style={{maxWidth: '100%', height: 'auto' }} alt="Sample" />
                                <figure className="media__caption" >Sample output of Imagene</figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}