import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Button
} from 'react-native';
import TabNavigator from './interface_caregiver';
import DateTimePickerTester from './flow/add_event_home';
import {
  createAppContainer,
  NavigationScreenProp,
  Themed,
  SafeAreaView,
  NavigationState,
} from 'react-navigation';
import {
  createStackNavigator,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTH= ["January","February","March","April","May","June","July","August","September","October","November","December"];
class DC extends React.Component{
  constructor(props){
    super(props);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds= date.getSeconds();

    let year = date.getFullYear();
    let month= date.getMonth();
    let day= date.getDate();
    let weekday=date.getDay();
    let thisday=`${MONTH[month]} ${day}, ${year}`;
    let thistime=`${hours}:${minutes}:${seconds}`;
    this.state={time: thistime, day:thisday, date:DAYS[weekday], gestureName: 'none',}
  }
  static navigationOptions = {
    header: null,
  }

  onPress = () => {
    this.props.navigation.push('Caregiver');
    /* this.props.navigation.navigate('HomeScreen'); */
  };

  getCurrentTime=()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds= date.getSeconds();
    let year = date.getFullYear();
    let month= date.getMonth();
    let day= date.getDate();
    let weekday=date.getDay();
    let thisday=`${MONTH[month]} ${day}, ${year}`;
    let thistime=`${hours}:${minutes}:${seconds}`;



    this.setState({time: thistime, day:thisday, date:DAYS[weekday]});
  }
  componentWillMount() {
    this.getCurrentTime();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  componentDidMount() {
   this.timer = setInterval(() => {
     this.getCurrentTime();
   }, 1000);
 }
 onSwipe=(gestureName, gestureState)=> {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.onPress();
        break;
    }
  }

  render(){
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
return(

  <ImageBackground source={require('./assets/bg.jpg')} style={{width: '100%', height: '100%', justifyContent: 'center',
  alignItems: 'center',}}>
  <GestureRecognizer
       onSwipe={this.onSwipe}
       onSwipeUp={this.onSwipeUp}
       config={config}
       style={{
         justifyContent: 'center',
         flex: 1,
         backgroundColor: this.state.backgroundColor
       }}
       >
  <Text style={[styles.title]} onPress={this.onPress}>{this.state.day}</Text>
    <Text style={[styles.title]}>{this.state.date}</Text>

  <Text style={[styles.title]}>{this.state.time}</Text>
</GestureRecognizer>
  </ImageBackground>

)
}
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {

    fontSize: 80,
    fontWeight: 'bold',
    margin:30
  },
  activeTitle: {
    color: 'red',
  },
});

class Different extends React.Component{
  render(){
    return(
      <Button
          title="Press me"
          onPress={() => console.log("yeah")}
        />
    )
  }
}
class Caregiver extends React.Component{
  constructor(props){
    super(props);
      this.state={gestureName: 'none'}
  }
  static navigationOptions = {
    header: null,
  }

  onPress = () => {
    this.props.navigation.push('Add_Event');
    /* this.props.navigation.navigate('HomeScreen'); */
  };

  onSwipe=(gestureName, gestureState)=> {
     const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
     this.setState({gestureName: gestureName});
     switch (gestureName) {
       case SWIPE_UP:
         this.onPress();
         break;
         case SWIPE_DOWN:
           this.props.navigation.pop();
           break;
     }
   }
   render(){
     const config = {
       velocityThreshold: 0.3,
       directionalOffsetThreshold: 80
     };

   return(
  <GestureRecognizer
       onSwipe={this.onSwipe}
       onSwipeUp={this.onSwipeUp}
       onSwipeUp={this.onSwipeDown}
       config={config}
       style={{
         flex: 1,

       }}
      >
      <TabNavigator/>
      </GestureRecognizer>
    )
  }
}

class Add_Event extends React.Component{
  constructor(props){
    super(props);
      this.state={gestureName: 'none'}
  }
  static navigationOptions = {
    header: null,
  }

  onPress = () => {
    this.props.navigation.push('Add_Event');
    /* this.props.navigation.navigate('HomeScreen'); */
  };
  onChange(field, value) {
   // parent class change handler is always called with field name and value
   console.log('parents');
  // this.setState({[field]: value});
}
  onSwipe=(gestureName, gestureState)=> {
     const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
     this.setState({gestureName: gestureName});
     switch (gestureName) {
      case SWIPE_DOWN:
           this.props.navigation.pop();
           break;
     }
   }
 static router = DateTimePickerTester.router;
   render(){
     const config = {
       velocityThreshold: 0.3,
       directionalOffsetThreshold: 80
     };

   return(
  <GestureRecognizer
       onSwipe={this.onSwipe}

       onSwipeUp={this.onSwipeDown}
       config={config}
       style={{
         flex: 1,

       }}
      >

      <DateTimePickerTester navigation={this.props.navigation}/>
      </GestureRecognizer>
    )
  }
}

const DigitalClock= createStackNavigator ({
  Home: DC,
  Caregiver: Caregiver,
  Add_Event: Add_Event,
},  {
    headerMode: 'none',
    mode: 'modal',
}
);


export default createAppContainer(DigitalClock);
