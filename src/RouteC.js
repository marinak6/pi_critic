// define imports
import React, { Component } from 'react';
import './App.css';
import TextInput from './TextInput.js';
import MeetPi from './MeetPi.js';
import {BrowserRouter, Route, Link,Redirect} from 'react-router-dom'

// Route Component 
// renders a page if the current URL location matches path prop specified
export default class RouteC extends Component{
    render(){
        return(
            // relate path with component  
            // exact is used to indicate that this route should only render when the url is exactly "/" otherwise it would render with other paths
            // use BrowserRouter when using a dynamic server that can handle dynamic URLs 
            <BrowserRouter>
                <div> 
                    <Route exact path = "/" component = {TextInput}/> 
                    <Route path = "/meet-critic" component = {MeetPi}/>
                </div>
            </BrowserRouter>
        );
    }
}