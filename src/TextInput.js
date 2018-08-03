import React, { Component } from 'react';
import './App.css';
import RandomOutput from './RandomOutput.js'
import {Link} from 'react-router-dom';
import {Input, Button} from "antd";
import axios from "axios";
import pie from "./pie.jpg";
export default class TextInput extends Component {

  // define initial state of the component
  constructor(props){
    super(props);
    this.state = {
      text_string: "",
      text_split_array: [],
      random_numbers: [],
      rating: "0"
    }
  }

  // button onclick function
  generate = e => { 
    // prevent default action of button click
    e.preventDefault;
    // split text based on line breaks
    let splitted = this.state.text_string.split("\n");
    // initialize temp array to filter splitted
    let text_split_array = []
    // filter splitted to include line count and exclude empty lines
    let count = 1;
    splitted.forEach((text) => {
      if (text) {
        text_split_array.push({text: text, line_number: count})
        count++;
      }
    });
    this.setState({
      text_split_array: text_split_array,
      rating: "0",
      random_numbers: []
    }, () => {
      // compute 31.4% of lines 
      let pi_lines = Math.round((this.state.text_split_array.length*(Math.PI*10)/100));
      let max_line = this.state.text_split_array.length;
      if (pi_lines > 0){
        this.random_api_call(pi_lines,max_line) // make sure function call happens after state is set because setState is asynchronous 
        this.rating_api_call()
      }
    });
  }
  random_api_call = (num,max) => {
    console.log("api call")
    let random_line_numbers = [];
    let filter_random_numbers = [];
      let url = "https://www.random.org/sequences/?min=1&max="+max+"&col=1&format=plain&rnd=new"
      console.log(url)
      axios.get(url).then(response=>{
        console.log(response)
        let data = response.data.toString();
        random_line_numbers = data.split(/(?:\r\n|\r|\n)/g);
        if(random_line_numbers.includes("")){
          random_line_numbers.pop();
        }
        for(let i = 0; i < num; i++){
          filter_random_numbers.push(random_line_numbers[i]);
        }

        this.setState({
          random_numbers: filter_random_numbers
        })
      })
  }

  rating_api_call = () => {
    let url = "https://www.random.org/integers/?num=1&min=1&max=10&col=1&replacement=false&base=10&format=plain&rnd=new"
    axios.get(url).then(response=>{
      this.setState({
        rating: response.data.toString()
      })
    })
  }

  render() {
    return (
      <div className = "Content">
        <center>
          <div className = "Title"> <h>Every Pi's a Critic </h> <img id = "pie_image" src = {pie} /> </div>
          <div className = "Subtitle"> <p> A very serious paper critique </p> </div>
        </center>
        <div className = "Input_Area">
          <Input.TextArea 
            style = {{"border": "1px solid #d0d9f2", "border-radius": "7px"}}
            value = {this.state.text_string}
            placeholder = "Enter your paper here for some slicing and dicing!"
            onChange = {e=>this.setState({text_string:e.target.value})}
            rows = {7}
          />
          <div className = "Button_generate">
          <center>
            <Button
              type = "primary"
              onClick = {this.generate}
              style = {{"borderColor":"#859ad3"}}
            >
              Generate
            </Button>
          </center>
          </div>
        </div>
        <div className = "Output_Area">
        <center>
        </center>
        {this.state.text_split_array.length > 0 
          && <RandomOutput rating = {this.state.rating} random_numbers = {this.state.random_numbers} text_split_array = {this.state.text_split_array}/>}
      </div>
        <div className="Link_Critic">
        <center>
          <Link to="/meet-critic">Meet the Critic</Link>
        </center>
        </div>
      </div>

    );
  }
}