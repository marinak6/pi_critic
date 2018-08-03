import React, { Component } from 'react';
import './App.css';
import TextInput from './TextInput.js';
import MeetPi from './MeetPi.js';

import {BrowserRouter, Route, Link,Redirect} from 'react-router-dom'

export default class RouteC extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                <Redirect to='/paper-input' />    
                <Route path = "/paper-input" component = {TextInput}/>
                <Route path = "/meet-critic" component = {MeetPi}/>
                </div>
            </BrowserRouter>
        );
    }
}