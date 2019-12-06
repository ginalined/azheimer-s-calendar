import React from 'react';
import { Dimensions, View,AsyncStorage } from 'react-native';

import EventCalendar from './src/EventCalendar';

let { width } = Dimensions.get('window');
const start=6
export default class displayday extends React.Component {
  constructor(props) {
    super(props);


  let newarray=this.getdata();
     this.state = {
       events: newarray
     };

  }
getdata=()=>{
    newarray=[];
   AsyncStorage.getItem('givenlist', (err, result) => {
       let temp=JSON.parse(result);

    

       temp.l.forEach(value=>{
         v=JSON.parse(value);

         newarray.push(v);
       }
       )

   });
   return newarray;

}
  _eventTapped(event) {
    alert(JSON.stringify(event));
  }

  render() {
    d=this.props.day;

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
          width={width}
          start={6}
          initDate={d}


        />
      </View>
    );
  }
}
