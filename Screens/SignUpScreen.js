import React, {Component} from 'react';
import {StyleSheet, View , Text ,TextInput, TouchableOpacity ,Modal,TouchableHighlight ,Image } from 'react-native';

export default class SignUpScreen extends Component{

   state={
      modalVisible:false,
      username: '',
      name: '',
      surname: '',
      email: '',
      password: ''
    };

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
              <Text style={{fontSize:40}}>Kayıt Başarılı</Text>
              <TouchableHighlight style={styles.buttons}
                onPress={() => {
                  this.setModal(false);
                }}>
              <Text>Kapat</Text>
              </TouchableHighlight>
          </View>
        </Modal>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require("../Assets/devekusu.png")} style={{height:80,width:80}} />
            <Text style={{fontSize:25,color:'black'}}>Kayıt Formu</Text>
        </View>
        <Text >Kullanıcı Adi</Text>
        <TextInput style={styles.input} onChangeText={(data) => this.setState({username:data})}/>
        <Text>Adi</Text>
        <TextInput style={styles.input} onChangeText={(data) => this.setState({name:data})}/>
        <Text>Soyadi</Text>
        <TextInput style={styles.input} onChangeText={(data) => this.setState({surname:data})}/>
        <Text>Parola</Text>
        <TextInput style={styles.input} secureTextEntry={true} onChangeText={(data) => this.setState({password:data})}/>
        <Text>E-posta Adresi</Text>
        <TextInput style={styles.input} onChangeText={(data) => this.setState({email:data})}/>
        <TouchableOpacity  style={styles.buttons}
                            onPress={sendPost(this.state)}>
            <Text>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

sendPost = function(data){
  fetch('http://192.168.1.3:8080/user/register', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: data.username,
    name: data.name,
    surname: data.surname,
    email: data.email,
    password: data.password
  }),
});
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
