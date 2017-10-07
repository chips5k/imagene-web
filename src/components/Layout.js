import React from 'react';
import 'roboto-fontface';
import 'font-awesome/css/font-awesome.css';
import '../assets/css/index.css';

const Layout = function(props) {
    return (
        <div className="container">
            {props.children}
        </div>
    );
}

export default Layout;