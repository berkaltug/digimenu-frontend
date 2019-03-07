import React, {Component} from 'react';
import {StyleSheet, View , Text ,TextInput, TouchableOpacity } from 'react-native';



export default class ChoiceScreen extends Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
        <View style={styles.container}>
          <TouchableOpacity style={styles.choicebutton} onPress={()=>{this.props.navigation.navigate('Qr')}}>
            <Text style={{fontSize: 35,fontWeight:'bold'}}>Restorandayım</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.choicebutton2} onPress={()=>{}}>
            <Text style={{fontSize: 32,fontWeight:'bold'}}>Restorana</Text>
            <Text style={{fontSize: 32,fontWeight:'bold'}}>Gidiyorum</Text>
            <Text>(Yapım Aşamasında)</Text>
          </TouchableOpacity>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFBAF',
  },
  choicebutton:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ffa66b',
    margin:30,
    borderRadius:10,
    width:300,
  },
  choicebutton2:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#68ff8e',
    margin:30,
    borderRadius:10,
    width:300,
  }
});
