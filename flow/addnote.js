import React, { Component } from 'react';
import { Button, View ,TextInput, Text} from "react-native";
import Next from './next';

export default class Notes extends React.Component {

 render(){
   return(
     <TextInput
         multiline={true}
         numberOfLines={4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}/>

   )
 }

}
