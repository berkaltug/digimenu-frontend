import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageBackground, Modal,AsyncStorage,ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import userInstance from '../Globals/globalUser';
import base64 from 'base-64';
import LinearGradient from 'react-native-linear-gradient';
export default class LoginScreen extends Component{

    constructor(props){
      super(props);
      this.state = {
        modalVisible: false,
        user: userInstance,
        isLogging:false,
        status:''
      }
    }

    setModal(visible){
      this.setState({modalVisible:visible});
    }
    setIndicator(visible){
      this.setState({isLogging:visible});
    }

    render() {
      return (
        <LinearGradient colors={['rgb(226, 54, 45)','rgb(245, 193, 153)']} style={{flex:1}}>
        <View style={styles.container}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <Text style={{fontSize:30,textAlign:'center'}}>
                  Giriş Yapılamadı!
                  Lütfen Girdiğiniz Bilgileri Kontrol Edip Tekrar Deneyin.
                  {this.state.status}
                </Text>
                <Button
                title="Kapat"
                  onPress={() => {
                    this.setIndicator(false);
                    this.setModal(false);
                  }}
                  />


            </View>
          </Modal>

          <Image style={{width:262,height:120}} source={require('../Assets/whitelogo.png')} />
          <Text style={styles.welcome}>Digimenu'ye Hoş Geldiniz</Text>
          {/*}<Text style={{marginLeft:55,marginRight:'auto'}}>Kullanıcı Adı</Text>*/}
          <TextInput style={styles.input} placeholder={"Kullanıcı Adı"} placeholderTextColor='rgb(237, 237, 237)'
              onChangeText={(data) => { this.state.user.username = data; }}/>
          {/*}<Text style={{marginLeft:55,marginRight:'auto'}}>Parola</Text>*/}
          <TextInput secureTextEntry={true} style={styles.input} placeholder={"Parola"} placeholderTextColor='rgb(237, 237, 237)'
              onChangeText={(data) => { this.state.user.password = data; }}/>

          <View style={{flexDirection:'column'}}>
          <Button
          buttonStyle = {styles.customAwesomeButton}
          title="Giriş Yap"
          loading={this.state.isLogging}
          disabled={this.state.isLogging}
          disabledStyle={{backgroundColor:'rgb(94, 55, 55)'}}
          onPress={()=>{
            this.setIndicator(true);
            this.state.user.login().then((response)=>{
              this.setState({status:response});

              if(response==202){
                let userToken=base64.encode(this.state.user.username + ":" + this.state.user.password);
                AsyncStorage.setItem('userToken',JSON.stringify(userToken));
                this.props.navigation.navigate('Qr');
              }else{
                this.setModal(true);
              }
            });
          }}
          />
          <Button
          buttonStyle = {styles.customAwesomeButton}
          title="Kayıt Ol"
          onPress = {()=>{
            this.props.navigation.navigate('SignUp');
          }}
          />
          <Button
          buttonStyle = {styles.customAwesomeButton}
          title="Parolamı Unuttum"
          onPress = {()=>{
            this.props.navigation.navigate('ForgetPassword');
          }}
          />
          </View>
        </View>
        </LinearGradient>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  welcome: {
    fontSize: 35,
    fontWeight:'bold',
    textAlign: 'center',
    margin: 10,
    color:'rgb(237, 237, 237)'
  },
  input:{
    width:300,
    height:40,
    borderColor:'rgb(237, 237, 237)',
    borderTopWidth:0,
    borderLeftWidth:0,
    borderRightWidth:0,
    borderBottomWidth:2,
    borderRadius:5,
    backgroundColor:'transparent',
    color:'rgb(237, 237, 237)'
  },
  passinput:{
    width:300,
    height:35,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5
  },
  customAwesomeButton:{
    margin:9,
    backgroundColor:'rgb(237, 75, 66)',
    borderRadius:15,
    width:300,
    height:30

  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  }

});
