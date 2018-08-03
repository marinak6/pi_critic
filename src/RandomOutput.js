import React, { Component } from 'react';
import './App.css';
import {Card} from "antd";
import axios from "axios";
export default class RandomOutput extends Component {


  get_lines = () => {
    let random_lines = [];
    for(let i = 0; i < this.props.random_numbers.length; i++){
      for(let j = 0; j < this.props.text_split_array.length; j++){
        if(this.props.random_numbers[i] == (this.props.text_split_array[j]).line_number){
          random_lines.push(this.props.text_split_array[j]);
          console.log(random_lines)
          break;
        }
      }
    }
    return random_lines;
  }

  get_rating = () => {
    let url = "https://www.random.org/integers/?num=1&min=1&max=10&col=1&replacement=false&base=10&format=plain&rnd=new"
    axios.get(url).then(response=>{
      this.setState({
        rating: response.data.toString()
      })
    })
  }

  render() {
    let lines = this.get_lines();
    let card_content = lines.map((element) => {
      return <p> Paragraph {element.line_number}: {element.text}</p>
    })
    return (
        <Card style={{width:"70%", margin:'auto', "border-color":"#d0d9f2", "border-radius": "7px"}}>
          <center>
            <p style = {{"color":"#8699c9"}}>Rating: {this.props.rating}</p>
          </center>
          {card_content.length > 0 && <p> The critic suggests the following paragraphs are exceptional: </p>}
          <center>{card_content.length == 0 && <p> The critic does not appreciate your work. </p>}</center>
          {card_content}
        </Card>
    );
  }
}
