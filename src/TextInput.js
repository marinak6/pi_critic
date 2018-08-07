// define imports
import React, { Component } from 'react';
import './App.css';
import RandomOutput from './RandomOutput.js'
import {Link} from 'react-router-dom';
import {Input, Button} from "antd";
import axios from "axios";
import pie from "./pie.jpg";

export default class TextInput extends Component {

  // define initial state of the component
  // state is data that this component is responsible for managing and updating
  // changing the state rerenders the component and its children
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
  // takes input field and splits the string into array elements, counts the number of lines and makes the appropriate api calls to generate random numbers
  generate = e => { 
    // prevent default action of button click
    e.preventDefault;
    // split text based on line breaks
    let splitted = this.state.text_string.split("\n");
    // initialize temp array to filter splitted array
    let text_split_array = []

    let count = 1; // iterate through line numbers
    splitted.forEach((text) => {
      if (text) { // omit blank lines
        text_split_array.push({text: text, line_number: count}) // push object with text and its corresponding line number to the array
        count++; // increment line number
      }
    });

    // update state
    this.setState({
      text_split_array: text_split_array, 
    }, () => { // weird syntax to ensure that the following happens after the state has been updated because setState is asynchronous 
      // compute 31.4% of lines 
      let pi_lines = Math.round((this.state.text_split_array.length*(Math.PI*10)/100));
      // find the last line 
      let max_line = this.state.text_split_array.length;

      // make api calls if pi_lines > 0; otherwise it will throw an error in the api call
      // these api calls happen asynchronously, saving time 
      if (pi_lines > 0){
        this.random_api_call(pi_lines,max_line)
        this.rating_api_call()
      }
      else{
        // adjust state accordingly if pi_lines is 0 
        this.setState({
          rating: 0,
          random_numbers: []
        })
      }
    });
  }

  // make api call to get a sequence of random integers
  // random.org actually uses a JSON RPC that can be accessed with a POST request
  // axios is so much more simple, but it does not support JSON RPCs, so I just used random.org's custom URL to make an API call 
  // the following method avoids the JSON RPC by using the sequence url. The sequence url does not allow you to specify the number of integers
  random_api_call = (num,max) => {  // num => number of integers to retrieve(pi_lines) max => last line (max_line)
    // initialize variables 
    let random_line_numbers = []; // array to contain the sequence of random numbers retrieved from axios request
    let filter_random_numbers = []; // array to contain the specified (pi_lines, num) number of integers

    // configure url for a random sequence of integers from 1 to whatever the last line number is
    let url = "https://www.random.org/sequences/?min=1&max="+max+"&col=1&format=plain&rnd=new"
    // make axios request with url
    axios.get(url).then(response=>{
      let data = response.data.toString();
      random_line_numbers = data.split(/(?:\r\n|\r|\n)/g); // split the response data by the new line indication
      if(random_line_numbers.includes("")){
        random_line_numbers.pop();  // remove last element because it is an empty line
      }

      // populate array up to the number of lines needed (pi_lines)
      for(let i = 0; i < num; i++){
        filter_random_numbers.push(random_line_numbers[i]);
      }

      // update state 
      this.setState({
        random_numbers: filter_random_numbers 
      })
    })
  }

  // make api call to get a random integer for the rating
  rating_api_call = () => {
    // configure url to get a random integer between 1 and 10
    let url = "https://www.random.org/integers/?num=1&min=1&max=10&col=1&replacement=false&base=10&format=plain&rnd=new"
    // make axios request with url
    axios.get(url).then(response=>{
      // update the state 
      this.setState({
        rating: response.data.toString()
      })
    })
  }

  // render is a required method - tells React what you actually want displayed 
  // called when mounting a component (occurs when instance of a component is created and inserted into the DOM) 
  // during mounting, the following methods are called in this order: constructor -> componentWillMount -> render -> componentDidMount
  // component is rerendered each time there is a change in its props or state
  render() {
    return (
      <div className = "Content">
        <center>
          <div className = "Title"> <h>Every Pi's a Critic </h> <img id = "pie_image" src = {pie} /> </div>
          <div className = "Subtitle"> <p> A very serious paper critique </p> </div>
        </center>
        <div className = "Input_Area">
          {/*the state attribute, text_string is updated each time the user types something in the input field*/}
          <Input.TextArea 
            style = {{"border": "1px solid #d0d9f2", "border-radius": "7px"}}
            value = {this.state.text_string}
            placeholder = "Enter your paper here for some slicing and dicing!"
            onChange = {e=>this.setState({text_string:e.target.value})}
            rows = {7}
          />
          <div className = "Button_generate">
          <center>
            {/* the generate method is invoked when the button is pressed*/}
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
        {
          // pass props to RandomOutput which invokes its render method (conditional rendering) 
          // props is data passed down from the parent aka creation parameters
        }
        {this.state.text_split_array.length > 0 
          && <RandomOutput rating = {this.state.rating} random_numbers = {this.state.random_numbers} text_split_array = {this.state.text_split_array}/>}
      </div>
        <div className="Link_Critic">
        <center>
          {/* link object from Route */}
          <Link to="/meet-critic">Meet the Critic</Link>
        </center>
        </div>
      </div>

    );
  }
}