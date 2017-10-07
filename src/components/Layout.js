import React from 'react';
import ReactDOM from 'react-dom';
import 'roboto-fontface';
import 'font-awesome/css/font-awesome.css';
import './css/index.css';

export default function(props) {
    return (
        <div class="container">
            {...props.children}
        </div>
    );
}