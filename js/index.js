// var React = require('react');
var ReactDom = require('react-dom');

import React from 'react';

import PlustarApp from '../components/plustar-app';

var App;

var YohoModule = {
    PLUSTAR: Symbol('plustar')
};

window.YohoDispatcher = function(moduleName) {
    switch (moduleName) {
        case YohoModule.PLUSTAR:
            App = PlustarApp;
            break;
    }

    var container = document.getElementById('yoho-container');
    var $props = document.getElementById('props-store');
    var props = JSON.parse($props.innerHTML);

    ReactDom.render(<App data={props} />, container);

    //Remove props data script from dom
    $props.parentNode.removeChild($props);
};

window.YohoModule = YohoModule;