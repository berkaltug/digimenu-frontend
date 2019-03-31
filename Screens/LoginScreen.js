import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ImageBackground, Modal,AsyncStorage} from 'react-native';
import userInstance from '../Globals/globalUser';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import base64 from 'base-64';
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

    render() {
      return (
        <View style={styles.container}>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {}}>
            <View style={styles.container}>
                <Text style={{fontSize:40,textAlign:'center'}}>
                  Giriş Yapılamadı!
                  Lütfen Girdiğiniz Bilgileri Kontrol Edip Tekrar Deneyin.
                  {this.state.status}
                </Text>
                <AwesomeButtonRick
                  onPress={() => {
                    this.setModal(false);
                  }}>
                <Text>Kapat</Text>
              </AwesomeButtonRick>
            </View>
          </Modal>

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
          <TextInput style={styles.input} placeholder={"Kullanıcı Adı"}
          onChangeText={(data) => { this.state.user.username = data; }}/>
          <Text style={{marginLeft:55,marginRight:'auto'}}>Parola</Text>
          <TextInput secureTextEntry={true} style={styles.input} placeholder={"Parola"}
          onChangeText={(data) => { this.state.user.password = data; }}/>

          <View style={{flexDirection:'row'}}>
              <AwesomeButtonRick
                style = {{margin: 5}}
      /*         style={{width:140,height:30,alignItems:'center',padding:10,
               margin:10,borderRadius:3,justifyContent:'center', borderWidth:2}}  */
               width = { 300 }
               height = { 35 }
               onPress={() => {
                this.state.user.login().then((response)=>{
                this.setState({status:response});
                   if(response==202){
                   let userToken=base64.encode(this.state.user.username + ":" + this.state.user.password);
                   AsyncStorage.setItem('userToken',userToken);
                   this.props.navigation.navigate('Qr');
                 }else{
                   this.setModal(true);
                 }
               });
               }}
              >
                <Text>Giriş Yap</Text>
              </AwesomeButtonRick>
            </View>
              <View style={{flexDirection:'row'}}>
              <AwesomeButtonRick
                style = {{margin: 5}}
          /*    style={{ justifyContent:'center',width:140,height:30,alignItems:'center',padding:10,
                     margin:10,borderRadius:3,borderWidth:2}} */
               width = { 300 }
               height = { 35 }
               onPress = {()=>{
                 this.props.navigation.navigate('SignUp');
               }}>
                <Text>Kayıt Ol</Text>
              </AwesomeButtonRick>
          </View>

        <TouchableOpacity
              style={{justfifyContent:'center',alignItems:'center',padding:5,backgroundColor:'#3b5999',width:300,height:30,
                      margin:5,borderRadius:3}}
              onPress={()=>{}}>
        <Text style={{color:'white'}}>Facebook ile giriş yap</Text>
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
