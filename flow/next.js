import React, { Component } from 'react';
import { Button, View ,TextInput, Text} from "react-native";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
export default class Next extends React.Component {

 render(){
   return(
     <Text onPress={this.props.onPress}>Let's Go </Text>
   )
 }

}
