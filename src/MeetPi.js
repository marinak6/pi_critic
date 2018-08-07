// define imports
import React, { Component } from 'react';
import './App.css';
import {Card, Tooltip, Icon, Button} from "antd";
import {Link, Redirect} from 'react-router-dom';
import editor from "./pi_boy.png"

export default class MeetPi extends Component {

  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }
  // method to update state
  setRedirect = () => {
    this.setState({
      redirect:true
    })
  }

  render() {
    return (
      <div className = "Meet_editor">
      {/* Activate Redirect from Route when the state attribute, redirect, is true*/}
        {this.state.redirect && <Redirect to='/'/>}
        <div className = "Back_link">
          {/* set redirect to true when button is clicked*/}
          <Button type="primary" onClick = {this.setRedirect}>
            <Icon type="left" />
            {" "}
            back
          </Button>
        </div>
          {/* display image */}
          <img id = "pi"src ={editor}/> 
      </div>
    );
  }
}
