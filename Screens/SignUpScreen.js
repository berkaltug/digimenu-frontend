import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, TouchableHighlight, Image } from 'react-native';
import userInstance from '../Globals/globalUser';
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';

export default class SignUpScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      user: userInstance,
      status: ' '
    }
  }


  setModal(visible){
    this.setState({modalVisible:visible});
  }

  render(){
    return(
      <View style={styles.container}>
      {/*Modal Section  -- ReactJS'de yorum satırı bu şekilde olmalıymış */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.container}>
              <Text style={{fontSize:40,textAlign:'center'}}>{this.state.status}</Text>
              <AwesomeButtonRick
                style = {{margin: 5}}
                width = { 100 }
                onPress={() => {
                  this.setModal(false);
                }}>
              <Text>Kapat</Text>
            </AwesomeButtonRick>
          </View>
        </Modal>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require("../Assets/devekusu.png")} style={{height:80,width:80}} />
            <Text style={{fontSize:25,color:'black'}}>Kayıt Formu</Text>
        </View>
        <TextInput
          placeholder = {"KULLANICI ADINIZ"}
          style={styles.input}
          onChangeText={(data) => { this.state.user.username = data; }}
        />
        <TextInput
          placeholder = {"ADINIZ"}
          style={styles.input}
          onChangeText={(data) => {this.state.user.name = data; }}
        />
        <TextInput
          placeholder = {"SOYADINIZ"}
          style={styles.input}
          onChangeText={(data) => {this.state.user.surname = data; }}
        />
        <TextInput
          placeholder = {"PAROLANIZ"}
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(data) => {this.state.user.password = data; }}
        />
        <TextInput
          placeholder = {"E-POSTA ADRESİNİZ"}
          style={styles.input}
          onChangeText={(data) => {this.state.user.email = data; }}
        />

      {/*  <TouchableOpacity  style={styles.buttons}
                            onPress={() => { }>
            <Text>Kayıt Ol</Text>
        </TouchableOpacity>
                                */}
        <AwesomeButtonRick
          style = {{margin: 10}}
          width = { 300 }
          progress
          onPress={async () => {
            await this.state.user.signUp().then( (res)=>{  this.setState({status:res})  });
            this.setModal(true);
            //next();
          }}
        >
          <Text>Gönder</Text>
        </AwesomeButtonRick>

        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Text style={{fontSize:12, fontStyle: 'italic'}}>Zaten üye misiniz?</Text>
            <AwesomeButtonRick
              style = {{margin: 10}}
              width = { 100 }
              primary
              onPress={() => { this.props.navigation.navigate('Login') }}>
              <Text>Giriş Yap</Text>
            </AwesomeButtonRick>
        </View>
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
  input:{
    width:300,
    height:35,
    borderColor:'gray',
    borderWidth:2,
    borderRadius:5,
    margin:5,
    backgroundColor:'white'
  },
  buttons:{
    width:300,
    height:30,
    backgroundColor:'yellow',
    padding:5,
    alignItems:'center',
    borderRadius:5,
    borderWidth:2,
    borderColor:'gray',
    margin:5,

  }
});
