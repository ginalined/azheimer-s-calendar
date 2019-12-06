
import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import {TODAY} from '../constants';
import { Button, View , Text} from "react-native";
import Next from './next';

export default class MyDatePicker extends Component {
  constructor(props){
    super(props)

    this.state = {date:TODAY}
  }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"

        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
    )
  }
}
//export default withNavigation(PickTime);
//
// class PickTime extends Component {
//   constructor(props) {
//      super(props);
//      this.state = {
//        isDateTimePickerVisible: false
//      };
//    }
//    static navigationOptions = {
//     header: null,
//   };
//
//    showDateTimePicker = () => {
//      this.setState({ isDateTimePickerVisible: true });
//    };
//
//    hideDateTimePicker = () => {
//      this.setState({ isDateTimePickerVisible: false });
//    };
//
//    handleDatePicked = date => {
//      console.log("A date has been picked: ", date);
//      this.hideDateTimePicker();
//    };
//
//    render() {
//      return (
//        <>
//          <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
//          <DateTimePicker
//            isVisible={this.state.isDateTimePickerVisible}
//            onConfirm={this.handleDatePicked}
//            onCancel={this.hideDateTimePicker}
//            mode= 'datetime'
//          />
//           <Text style={{width:20, height:20}} onPress={()=>this.props.navigation.navigate('PickTime')}>Hello Click</Text>
//        </>
//      );
//    }
// }
