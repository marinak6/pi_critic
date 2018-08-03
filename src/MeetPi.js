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
  setRedirect = () => {
    this.setState({
      redirect:true
    })
  }

  render() {
    return (
      <div className = "Meet_editor">
        {this.state.redirect && <Redirect to='/paper-input'/>}
        <div className = "Back_link">
          <Button type="primary" onClick = {this.setRedirect}>
            <Icon type="left" />
            {" "}
            back
          </Button>
        </div>
          <img id = "pi"src ={editor}/> 
      </div>
    );
  }
}
