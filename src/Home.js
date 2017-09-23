import React, { Component } from 'react';
import Sample1 from './img/samples/1.png';
import { Link } from 'react-router-dom';

export default class Home extends Component {

    render() {
        return (
            <div className="main">
                <div className="main__header">
                    <div className="main__title">Home</div>
                </div>
                <div className="main__body"> 
                    <div className="main__content">
                        <div className="home hbox">
                            <div style={{marginRight: 20, minWidth: 300}}>
                                <h2>Welcome</h2>

                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget ante vitae massa convallis efficitur. Sed mattis, tortor et dapibus aliquet, nisi dui pharetra quam, posuere vehicula purus sem sed eros. Nam sed urna placerat, mattis orci vitae, tempor libero. Quisque non mauris id nisl sagittis pretium a et magna. Nullam non malesuada metus, in gravida erat. Nunc maximus tincidunt velit et lobortis. Nulla faucibus volutpat diam eu ultrices. Praesent porta aliquam fermentum. Aenean at pharetra justo. Quisque urna risus, mattis sit amet lacinia id, imperdiet ut arcu. Aenean ac interdum eros. Aliquam sit amet egestas nulla. Integer orci turpis, ornare et laoreet sed, dapibus ac diam. Nullam volutpat massa sit amet nunc mattis ullamcorper. Integer aliquam tempor sollicitudin.
                                </p>

                                <p>
                                    Proin sed sollicitudin libero. Suspendisse placerat sem varius sapien viverra, cursus porta mi mattis. Integer consequat ex libero, quis sollicitudin tellus imperdiet vitae. Quisque ac magna sed dolor tristique posuere at vitae nunc. Pellentesque ut erat convallis, posuere diam in, tempus dui. Nam suscipit enim leo, id facilisis sapien pellentesque pharetra. Vivamus elementum molestie ex, eu pellentesque nisi ornare id.
                                </p>

                                <Link to="/population" className="button button--primary">Create Population</Link>
                            </div>

                            
                            <div className="media" style={{minWidth: 200, maxWidth: 300, marginTop:50}}>
                                <img className="media__image" src={Sample1} alt="Sample" />
                                <div className="media__caption" >Sample output of Imagene</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        );
    }
}