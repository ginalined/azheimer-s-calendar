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
import {
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
    this.props.navigation.push('Dif');
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

    fontSize: 50,
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
const DigitalClock= createStackNavigator ({
  Home: DC,
  Dif: Different
},  {
    headerMode: 'none',
    mode: 'modal',
}
);


export default DigitalClock;
