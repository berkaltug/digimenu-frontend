import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TextInput, View,Image,TouchableOpacity,ImageBackground} from 'react-native';

export default class LoginScreen extends Component{
    constructor(props){
      super(props);
    }
    render() {
      return (
        <View style={styles.container}>
      <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            style={{
              flex: 1,
              resizeMode:'repeat',
              backgroundColor:'rgb(164, 154, 83)'
            }}
            source={require('../Assets/foodpattern.png')}
          />
      </View>
          <Image style={{width:262,height:120}} source={require('../Assets/logo.png')} />
          <Text style={styles.welcome}>Digimenu'ye Hoş Geldiniz</Text>
          <Text style={{marginLeft:55,marginRight:'auto'}}>Kullanıcı Adı</Text>
          <TextInput style={styles.input}/>
          <Text style={{marginLeft:55,marginRight:'auto'}}>Parola</Text>
          <TextInput secureTextEntry={true} style={styles.input}/>

          <View style={{flexDirection:'row'}}>
              <TouchableOpacity
               style={{width:140,height:30,alignItems:'center',padding:10,backgroundColor:'yellow',
                      margin:10,borderRadius:3,justifyContent:'center',borderColor:'grey',borderWidth:2}}
               onPress={()=>{this.props.navigation.navigate('Qr')}}
              >
                <Text>Giriş Yap</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style={{ justifyContent:'center',width:140,height:30,alignItems:'center',padding:10,backgroundColor:'yellow',
                     margin:10,borderRadius:3,borderColor:'grey',borderWidth:2}}
               onPress={()=>{this.props.navigation.navigate('SignUp')}}>
                <Text>Kayıt Ol</Text>
              </TouchableOpacity>
          </View>

        <TouchableOpacity
              style={{justfifyContent:'center',alignItems:'center',padding:5,backgroundColor:'#3b5999',width:300,height:30,
                      margin:5,borderRadius:3}}
              onPress={()=>{}}>
        <Text style={{color:'white'}}>Login with Facebook</Text>
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
    backgroundColor: '#FFFBAF'
  },
  welcome: {
    fontSize: 35,
    fontWeight:'bold',
    textAlign: 'center',
    margin: 10,
    color:'black'
  },
  input:{
    width:300,
    height:40,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5,
    backgroundColor:'white'
  },
  passinput:{
    width:300,
    height:35,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5
  }

});
