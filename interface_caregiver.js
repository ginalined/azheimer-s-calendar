import React from 'react';
import {useSelector} from 'react-redux';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { createAppContainer } from 'react-navigation';
import Displayday from './displayday';
import planner from './planner';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import DateTimePickerTester from './flow/add_event_home';
import moment from 'moment';
class HomeScreen extends React.Component {

  constructor(props) {

  super(props);
  dataarray=this.getdata();

  this.state = {selected:
  dataarray,marked:{
      '2019-12-16': {selected: true, marked: true, selectedColor: 'blue'},
      '2019-12-17': {marked: true},
      '2019-12-18': {marked: true, dotColor: 'red', activeOpacity: 0},
      '2019-12-19': {disabled: true, disableTouchEvent: true}
    }
};

  this.onDayPress = this.onDayPress.bind(this);
}

componentDidMount(){
  this.getdata();
}

//markedDates={{
  //  '2017-10-25': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
  // '2017-10-26': {dots: [massage, workout], disabled: true}
//   }}
getdata=()=>{
    newarray={};
   AsyncStorage.getItem('givenlist', (err, result) => {
       let temp=JSON.parse(result);
       temp.l.forEach(value=>{
         v=JSON.parse(value);
         let vday=v.start.split(" ")[0];

         newarray[vday]= {marked: true};

       }

       );
       this.setState({good:newarray});
       return newarray;

   });



}

onDayPress(day) {
  this.props.navigation.navigate('Day',{
              itemId: day.dateString,
              otherParam: 'anything you want here',
            });
  this.setState({
    selected: day.dateString
  });
}
  render() {

    return (
      <Calendar
      onDayPress={
        this.onDayPress
    }

    markedDates={this.state.good}

      theme={{
        selectedDayBackgroundColor: '#ffddf5',
        textDayFontSize: 20,
        textMonthFontSize: 30,
    textDayHeaderFontSize: 15,
          'stylesheet.day.basic':{
            'base':{
              width:  100,
              height:100
            }
          }
      }} />
    );
  }
}


class Daydisplay extends React.Component{
  constructor(props) {
  super(props);
  this.state = {selected:
    ['2019-12-20','2019-12-25']
};
}


  render(){
    const { navigation } = this.props;
    currentday=moment().format('YYYY-MM-DD')
    let day= navigation.getParam('itemId', currentday);

    return(
      <Displayday day={day}/>
    )
  }
}
const TabNavigator = createMaterialTopTabNavigator({
  Month: HomeScreen,
  Day: Daydisplay,
},{tabBarOptions: {
  labelStyle: {
    fontSize: 16,
  },

  style: {
    backgroundColor: '#F19F5D',
  },
}});

export default createAppContainer(TabNavigator);
