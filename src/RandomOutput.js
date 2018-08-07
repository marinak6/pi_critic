// define imports
import React, { Component } from 'react';
import './App.css';
import {Card} from "antd";
import axios from "axios";

export default class RandomOutput extends Component {

  // method that links the random line numbers generated to the corresponding text inputted by the user
  // returns an array of random lines and the corresponding line number
  get_lines = () => {
    // initalize variables
    let random_lines = []; 
    // iterate through the prop, random numbers, generated from the api call 
    for(let i = 0; i < this.props.random_numbers.length; i++){
      // iterate through all of the lines/paragraphs enterred by the user (text_split_array is an array of objects {text, linenumber} )
      for(let j = 0; j < this.props.text_split_array.length; j++){
        // push the object ({text,linenumber}) to the initialized array if its line number matches the number in the random_numbers array
        if(this.props.random_numbers[i] == (this.props.text_split_array[j]).line_number){
          random_lines.push(this.props.text_split_array[j]);
          break;
        }
      }
    }
    // return the array
    return random_lines;
    console.log(random_lines)
  }

  render() {
    // get the generated array of line numbers and corresponding text
    let lines = this.get_lines();
    console.log(lines)

    // map each line of the lines generated to an array of html elements for the card content
    let card_content = lines.map((element) => {
      return <p> Paragraph {element.line_number}: {element.text}</p>
    })

    return (
        <Card style={{width:"70%", margin:'auto', "border-color":"#d0d9f2", "border-radius": "7px"}}>
          <center>
            <p style = {{"color":"#8699c9"}}>Rating: {this.props.rating}</p>
          </center>
          {/* display the following only if there is nothing in the card content*/}
          {card_content.length > 0 && <p> The critic suggests the following paragraphs are exceptional: </p>}
          <center>{card_content.length == 0 && <p> The critic does not appreciate your work. </p>}</center>
          {/* display the card content*/}
          {card_content}
        </Card>
    );
  }
}
