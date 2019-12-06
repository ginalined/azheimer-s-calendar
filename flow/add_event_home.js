import React, { Component } from 'react';
import { Button, AsyncStorage,View ,TextInput, Text, StyleSheet} from "react-native";
import Next from './next'
import DatePicker from 'react-native-datepicker';
import {TODAY} from '../constants';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DateTimePicker from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import ModalDropdown from 'react-native-modal-dropdown';
import Check from '../reduxing.js'



let now=moment().format('YYYY-MM-DD hh:mm:ss');
console.log(now);
let eventlist={
  start:now ,
  end:now,
  title:'',
  summary:'',
  reminder:'Never',
  repeat:'Never',
}
let newlist={
  l:[JSON.stringify(eventlist)]
};
// start: '2017-09-08 01:20:00',
// end: '2017-09-08 02:20:00',
// title: 'Dr. Mariana Joseph',
// summary: '3412 Piedmont Rd NE, GA 3032',
class AddEvent extends React.Component{
constructor(props){
  super(props)

  this.state={text:''}
}


  static navigationOptions = {
   header: null,
 };
   //this.props.navigation.navigate('PickTime')
  render(){
    return(
      <View style={styles.overall}>
      <TextInput
      style={styles.message}
      numberOfLines={4}
      placeholder='Add your event'
      onChangeText={(text) => {
        this.setState({text});

      }}
      value={this.state.text}
    />
    <View style={styles.container}>
    <Text style={styles.next} onPress={()=>{
      console.log(this.state.text);
      eventlist.title=this.state.text;
      this.props.navigation.navigate('PickTime')}}>Next</Text></View></View>
    )
  }
}


class PickTime extends Component {
  constructor(props){

     super(props);

     this.state = {
       date:moment().format('YYYY-MM-DD'),
       time:moment().format('hh:mm:ss'),
       isDateTimePickerVisible: false,
       repeat:'Never',
       reminder:'Never'
     };
   }
   static navigationOptions = {
    header: null,
  };

   showDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: true });
   };
   hideDateTimePicker = () => {
     this.setState({ isDateTimePickerVisible: false });
   };
   handleDatePicked = date => {
     //start: '2017-09-08 01:20:00',

     let datestring=moment(date).format('YYYY-MM-DD hh:mm:ss');
     let update_date=moment(date).format('YYYY-MM-DD');
     let update_time=moment(date).format('hh:mm:ss');

     let end=moment(date).add(1, 'hour').format('YYYY-MM-DD hh:mm:ss');
     this.setState({date:update_date, time:update_time})
     eventlist.start=datestring;
     eventlist.end=end;
     this.hideDateTimePicker();
   };

   updaterepeat(value){

     this.setState({repeat:value}, ()=>console.log('hello'));

   }
   render() {
     return (
       <View style={styles.overall}>
        <View style={styles.drawdown}><Text style={styles.opt}>Date:             {this.state.date}       <Icon name="calendar" onPress={this.showDateTimePicker} size={30} color="#888888" /> </Text></View>
        <View style={styles.drawdown}><Text style={styles.opt}>Time:             {this.state.time}       </Text></View>

        <View style={styles.drawdown}><ModalDropdown  defaultIndex={0} onSelect={(idx, value) =>{eventlist.repeat=value; this.updaterepeat(value)}} options={['Never', 'Every Day', 'Every Week', 'Every Month']}><Text style={styles.opt}>Repeat:         {eventlist.repeat}     </Text></ModalDropdown></View>
        <ModalDropdown  style={styles.drawdown} defaultIndex={0} onSelect={(idx, value) => {eventlist.reminder=value;this.updaterepeat(value)}} options={['Never', '1 min before', '5 min before', '30 min before', '1 hour before']}><Text style={styles.opt}>Reminder:    {eventlist.reminder}    </Text></ModalDropdown>
         <DateTimePicker
           isVisible={this.state.isDateTimePickerVisible}
           onConfirm={this.handleDatePicked}
           onCancel={this.hideDateTimePicker}
           mode= 'datetime'
         />
         <View style={styles.container}>

         <Text style={styles.next} onPress={()=>{this.props.navigation.navigate('Notes')}}>Next</Text></View>
       </View>
     );
   }

}

class Notes extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       text:""
     };
   }
  static navigationOptions = {
   header: null,
 };

 storeData = async () => {
  try {
    await AsyncStorage.setItem('allevents', 'stored value')
  } catch (e) {
    // saving error
  }
};

finish(){

  // });

    AsyncStorage.getItem('givenlist',(err, result) => {
temp=JSON.parse(result);

temp.l.push(JSON.stringify(eventlist));
  AsyncStorage.setItem('givenlist', JSON.stringify(temp), () => {
console.log('saved');

  });



  });

  // AsyncStorage.getItem('newlist', (err, result) => {
  //      let temp=JSON.parse(result);
  //
  //       strevent=JSON.stringify(eventlist);
  //       console.log(strevent)
  //      temp.l.push(strevent);
  //      console.log(temp.l);
  //      AsyncStorage.setItem('newlist', JSON.stringify(newlist), () => {
  //        console.log('saved');
  //
  //    });
  //
  // //   console.log('saved');
  //  });


}
 render(){
   return(
     <View style={styles.overall}>
<Text style={styles.head}>Notes</Text>


     <TextInput multiline={true} style={styles.note}  placeholder="write your notes here" onChangeText={(text) => this.setState({text})}
         value={this.state.text}/>

         <View style={styles.container}>

         <Text style={styles.next} onPress={()=>{this.props.navigation.navigate('AddEvent');this.finish();}}>Complete</Text></View>


</View>
   )
 }}
 // start: '2017-09-08 01:20:00',
 // end: '2017-09-08 02:20:00',
 // title: 'Dr. Mariana Joseph',
 // summary: '3412 Piedmont Rd NE, GA 3032',
 const styles = StyleSheet.create({
   head:{
     fontSize:60,
    position:'absolute',
    top:'18%'
  },

   overall:{
     flex:1,
     alignItems:'center',
     justifyContent: 'center',
     textAlignVertical: 'center',

   },
   note:{
     height:'40%',
     width:'80%',
     borderBottomColor:'black',
     borderWidth:1,
     borderRadius:20,
     textAlignVertical: "top",
     fontSize:20,
     padding:20
   },
   container: {
     width:'60%',
     position:'absolute',
     top:'75%',
      borderRadius:30,
       backgroundColor:'#F19F5D',
       textAlign: 'center',
       alignItems:'center',
       justifyContent: 'center',
   },
   next:{
     fontSize:70,
     color:'white'
   },
   opt:{
     fontSize:40,

     alignItems:'flex-start',

   },
   message: {
     fontSize:60,
     borderBottomColor: 'black',
      borderBottomWidth: 1,
    width:'80%',
   },
   drawdown:{
     width:'70%',

     marginTop:30,
     alignItems:'flex-start',
     textAlign: 'left',
   },
   warning: {
     color: 'red'
   }
 });


Day=createAppContainer(
  createSwitchNavigator(
    {
      AddEvent: AddEvent,
      PickTime: PickTime,
      Notes:Notes
    }
  )
);
export default class flows extends React.Component{
  constructor(props){
    super(props);
    //console.log(this.props.movie);
  }
  render(){
    return(
    <Day/>
  )
  }
}
